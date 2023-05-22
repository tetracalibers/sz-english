import { parse } from "node:path"

export const toSlug = (path: string) => {
  const { dir, name } = parse(path)
  const slug = dir
    .split("/")
    .filter((sep) => sep.length > 0 && sep !== "data")
    .concat(name)
    .join("/")
  return slug
}

export const pager = (entries: [string, () => Promise<unknown>][], currIdx: number) => {
  const prevEntry = entries[currIdx - 1]
  const nextEntry = entries[currIdx + 1]

  const prevPath = prevEntry ? prevEntry[0] : null
  const nextPath = nextEntry ? nextEntry[0] : null

  const prev = prevPath ? parse(prevPath).name : null
  const next = nextPath ? parse(nextPath).name : null

  return { prev, next }
}
