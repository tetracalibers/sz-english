import pagesJson from "~/meta/pages.json" assert { type: "json" }
import lastUpdatedMap from "~/meta/last-updated.json" assert { type: "json" }
import { Client, LogLevel } from "@notionhq/client"
import { BlockObjectResponse, ListBlockChildrenResponse } from "@notionhq/client/build/src/api-endpoints"
import fs from "node:fs/promises"
import { BlockObject, PageTree } from "./page"

type BlockType = BlockObjectResponse["type"]

type Block = {
  type: BlockType
  [k: string]: unknown
}

type PageMeta = Omit<PageTree, "children">

type PageNode = PageMeta & {
  path: string[]
}

const pages: PageTree[] = pagesJson

const notion = new Client({
  auth: import.meta.env.NOTION_TOKEN,
  logLevel: LogLevel.INFO
})

const hasChildren = (block: BlockObject) => {
  if (!("has_children" in block)) return false
  return block.has_children
}

const parseBlock = (block: BlockObject) => {
  if (!("type" in block)) return null

  const { type } = block
  const content = block[type]

  if ("rich_text" in content && content.rich_text.length < 1) return null

  const items = { [type]: content }
  return { type, ...items }
}

const getBlock = async (blockId: string, start?: string) => {
  const res = await notion.blocks.children.list({
    block_id: blockId,
    start_cursor: start
  })
  return res
}

const getBlockRecursive = async (
  pageId: string,
  root: ListBlockChildrenResponse,
  dist: Block[] = []
): Promise<Block[]> => {
  const _blocks = await Promise.all(
    root.results.map(async (result) => {
      const parsed = parseBlock(result)
      if (!parsed) return null
      if (!hasChildren(result)) return parsed

      const children = await getBlock(result.id)
      const type = parsed.type
      const content = parsed[type]
      return { ...parsed, [type]: { ...content, children: children.results.map((ch) => parseBlock(ch)) } }
    })
  )

  const blocks: Block[] = _blocks.filter((block) => block !== null)
  const record = dist.concat(blocks)

  if (root.has_more) {
    const next = await getBlock(pageId, root.next_cursor)
    return await getBlockRecursive(pageId, next, record)
  }

  return record
}

const getPageContent = async (page: PageNode) => {
  const root = await getBlock(page.id)
  const blocks = await getBlockRecursive(page.id, root)

  return blocks
}

const getNode = (page: PageTree, path: string[] = []): PageNode[] => {
  const { title, children, ...info } = page
  if (children.length > 0) {
    return children.flatMap((child) => getNode(child, path.concat(title)))
  }
  return [{ title, ...info, path }]
}

const isNeedUpdate = (node: PageNode) => {
  const syncedAt = lastUpdatedMap[node.id]
  if (!syncedAt) return true

  const notionUpdatedAt = node.last_edited_time

  const syncedDate = new Date(syncedAt)
  const notionUpdatedDate = new Date(notionUpdatedAt)

  return notionUpdatedDate > syncedDate
}

export const fetchNotionPageContent = async () => {
  for (const page of pages) {
    const nodeList = getNode(page)

    await Promise.all(
      nodeList.map(async (node, i) => {
        if (!isNeedUpdate(node)) return

        const path = node.path.join("/").replaceAll(" ", "")

        try {
          await fs.mkdir(`data/${path}`, { recursive: true })
        } catch (e) {}

        const blocks = await getPageContent(node)

        const data = { ...node, blocks }
        const sceneName = `scene-${(i + 1).toString().padStart(2, "0")}`

        await fs.writeFile(`data/${path}/${sceneName}.json`, JSON.stringify(data, null, 2))
      })
    )
  }
}
