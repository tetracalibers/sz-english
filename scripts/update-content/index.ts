import { updatePageContent } from "./block.js"
import { updateSyncDateMap } from "./last-updated.js"
import { updatePagesMap } from "./page.js"
import { generateTocMap } from "./toc.js"

const update = async () => {
  const pages = await updatePagesMap()
  await updatePageContent(pages)
  await updateSyncDateMap(pages)
  await generateTocMap()
}

await update()
