import { PageTree } from "./page"
import fs from "node:fs/promises"
import tree from "~/meta/pages.json" assert { type: "json" }

const buildLastUpdatedMap = (tree: PageTree[], dist = new Map<string, string>()) => {
  tree.forEach((page) => {
    dist.set(page.id, page.last_edited_time)
    if (page.children.length > 0) buildLastUpdatedMap(page.children, dist)
  })
  return Object.fromEntries(dist)
}

export const updateSyncDateMap = async () => {
  const lastUpdatedMap = buildLastUpdatedMap(tree)
  await fs.writeFile("meta/last-updated.json", JSON.stringify(lastUpdatedMap, null, 2))
}
