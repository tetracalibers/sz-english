import { glob } from "glob"
import fs from "node:fs/promises"
import path from "node:path"
import { printFileUpdatedLog } from "./log.js"

type HeadingType = "heading_2"

type Block<T extends HeadingType> = {
  type: T
  id: string
} & {
  [block in T]: {
    rich_text: [
      {
        type: "text"
        plain_text: string
      }
    ]
  }
}

type Scene = {
  title: string
  id: string
  last_edited_time: string
  path: string[]
  blocks: Block<HeadingType>[]
}

type Heading = {
  title: string
  id: string
  level: number
  slugs: string[]
  _order: number
}

export const generateTocMap = async () => {
  const files = await glob("data/**/*.json", { absolute: true })
  const headings = new Set<Heading>()

  await Promise.all(
    files.sort().map(async (file, fileIdx) => {
      const module = await import(file, { assert: { type: "json" } })
      const scene: Scene = module.default

      const { dir, name } = path.parse(file)
      const dirArray = dir.split(path.sep)
      const slugs = dirArray.slice(dirArray.indexOf("data") + 1).concat(name)

      const hblocks = scene.blocks.filter((block) => block.type === "heading_2")

      hblocks.forEach((block, idx) => {
        const { type, id } = block
        const level = ~~block.type.at(-1)
        const title = block[type].rich_text[0].plain_text
        headings.add({ title, id, level, slugs, _order: ~~(`${fileIdx}` + `${idx}`.padStart(5, "0")) })
      })
    })
  )

  const toc = Array.from(headings).sort((a, b) => a._order - b._order)

  await fs.writeFile("meta/toc.json", JSON.stringify(toc, null, 2))
  printFileUpdatedLog("meta/toc.json")
}
