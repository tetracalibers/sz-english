import { Client, LogLevel } from "@notionhq/client"
import {
  BlockObjectResponse,
  ChildPageBlockObjectResponse,
  ListBlockChildrenResponse,
  PartialBlockObjectResponse
} from "@notionhq/client/build/src/api-endpoints"
import fs from "node:fs/promises"

const notion = new Client({
  auth: import.meta.env.NOTION_TOKEN,
  logLevel: LogLevel.INFO
})

const pageId = "fb9b855e968c4a2a9437e46b5ad573f0"

const getPage = async () => {
  const res = await notion.blocks.children.list({ block_id: pageId })
  return res
}

const isChildPageBlock = (
  block: PartialBlockObjectResponse | BlockObjectResponse
): block is ChildPageBlockObjectResponse => {
  if (!("type" in block)) return false
  if (block.type !== "child_page") return false
  return true
}

const collectChildPageList = (res: ListBlockChildrenResponse) => {
  const { results } = res
  return results
    .map((block) => {
      if (!isChildPageBlock(block)) return null
      const { id, last_edited_time, child_page } = block
      return { id, last_edited_time, title: child_page.title }
    })
    .filter(Boolean)
}

export const fetchNotionPage = async () => {
  const page = await getPage()
  const childPages = collectChildPageList(page)
  await fs.writeFile("data/root.json", JSON.stringify(childPages, null, 2))
}
