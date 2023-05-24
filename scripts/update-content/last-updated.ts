import { printFileUpdatedLog } from "./log.js"
import { PageTree } from "./page.js"
import fs from "node:fs/promises"

const buildLastUpdatedMap = (tree: PageTree[], dist = new Map<string, string>()) => {
  tree.forEach((page) => {
    dist.set(page.id, page.last_edited_time)
    if (page.children.length > 0) buildLastUpdatedMap(page.children, dist)
  })
  return Object.fromEntries(dist)
}

export const updateSyncDateMap = async (pages: PageTree[]) => {
  const lastUpdatedMap = buildLastUpdatedMap(pages)
  await fs.writeFile("meta/last-updated.json", JSON.stringify(lastUpdatedMap, null, 2))
  printFileUpdatedLog("meta/last-updated.json")
}
