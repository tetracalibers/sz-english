import { Client, LogLevel } from "@notionhq/client"
import { BlockObjectResponse, PartialBlockObjectResponse } from "@notionhq/client/build/src/api-endpoints"
import fs from "node:fs/promises"

const notion = new Client({
  auth: import.meta.env.NOTION_TOKEN,
  logLevel: LogLevel.INFO
})

type BlockType = BlockObjectResponse["type"]
type BlockContent = {
  rich_text: string[]
  color: string
}
type Block = {
  type: BlockType
  [k: string]: unknown
}

const parse = (result: BlockObjectResponse | PartialBlockObjectResponse) => {
  if (!("type" in result)) return null

  const { type } = result
  const content: BlockContent = result[type]

  if ("rich_text" in content) {
    if (content.rich_text.length < 1) return null
  }

  const items = { [type]: content }

  return { type, ...items }
}

const getContent = async (blocks: Block[] = [], start?: string) => {
  const res = await notion.blocks.children.list({
    block_id: "9dc57e1492004887a5220e95329b9632",
    ...(start ? { start_cursor: start } : {})
  })

  const formatted = await Promise.all(
    res.results.map(async (result) => {
      const parsed = parse(result)
      if (!parsed) return null

      if ("has_children" in result && result.has_children) {
        const child = await notion.blocks.children.list({ block_id: result.id })
        const parsedChild = child.results.map((child) => parse(child))

        const type = parsed.type
        const content = parsed[type]

        return { ...parsed, [type]: { ...content, children: parsedChild } }
      }

      return parsed
    })
  )

  const record = formatted.filter((result) => result !== null)

  if (res.has_more) {
    return await getContent(blocks.concat(record), res.next_cursor)
  }

  return blocks.concat(record)
}

export const fetchNotionData = async () => {
  const blocks = await getContent()
  await fs.writeFile("data/6-29.json", JSON.stringify(blocks, null, 2))
}
