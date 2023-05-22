import { updatePageContent } from "./block.js"
import { updateSyncDateMap } from "./last-updated.js"
import { updatePagesMap } from "./page.js"

const update = async () => {
  await updatePagesMap()
  await updatePageContent()
  await updateSyncDateMap()
}

await update()
