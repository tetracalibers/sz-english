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

export const toSectionSlugs = (paths: string[]) => {
  const _sections = new Set<string>()
  const result = new Set<{ name: string; first: string }>()
  paths.forEach((path) => {
    const { dir, name } = parse(path)
    const section = dir
      .split("/")
      .filter((sep) => sep.length > 0 && sep !== "data")
      .join("/")
    if (_sections.has(section)) return
    const slug = section + "/" + name
    _sections.add(section)
    result.add({ name: section, first: slug })
  })
  return Array.from(result)
}

export const home = () => {
  const origin = import.meta.env.DEV ? "http://localhost:3000" : import.meta.env.SITE
  const base = origin + import.meta.env.BASE_URL
  return base
}

export const pager = (entries: [string, () => Promise<unknown>][], currIdx: number) => {
  const prevEntry = entries[currIdx - 1]
  const nextEntry = entries[currIdx + 1]

  const prevPath = prevEntry ? prevEntry[0] : null
  const nextPath = nextEntry ? nextEntry[0] : null

  const base = home()

  const prev = prevPath ? base + toSlug(prevPath) : null
  const next = nextPath ? base + toSlug(nextPath) : null

  return { prev, next }
}
