import {
  BlockObjectResponse,
  ChildPageBlockObjectResponse,
  ListBlockChildrenResponse,
  PartialBlockObjectResponse
} from "@notionhq/client/build/src/api-endpoints"
import fs from "node:fs/promises"
import { printFileUpdatedLog } from "./log.js"
import { notion } from "./client.js"

export type BlockObject = PartialBlockObjectResponse | BlockObjectResponse

export type PageTree = {
  id: string
  last_edited_time: string
  title: string
  children: PageTree[]
}

const rootId = "fb9b855e968c4a2a9437e46b5ad573f0"

const getPage = async (pageId: string) => {
  const res = await notion.blocks.children.list({ block_id: pageId })
  return res
}

const isChildPageBlock = (block: BlockObject): block is ChildPageBlockObjectResponse => {
  if (!("type" in block)) return false
  if (block.type !== "child_page") return false
  return true
}

const buildTree = async (block: BlockObject): Promise<PageTree> => {
  if (!isChildPageBlock(block)) return null
  const { id, last_edited_time, child_page } = block
  const children = await getPage(id)
  const subTree = await Promise.all(children.results.map(async (child) => await buildTree(child)))
  return { id, last_edited_time, title: child_page.title, children: subTree.filter(Boolean) }
}

const collectChildPageList = async (res: ListBlockChildrenResponse) => {
  const root = res.results
  const tree = await Promise.all(root.map(async (block) => await buildTree(block)))
  return tree.filter(Boolean)
}

export const updatePagesMap = async () => {
  const root = await getPage(rootId)
  const childPages = await collectChildPageList(root)
  await fs.writeFile("meta/pages.json", JSON.stringify(childPages, null, 2))
  printFileUpdatedLog("meta/pages.json")
  return childPages
}
