import {
  CalloutBlockObjectResponse,
  Heading2BlockObjectResponse,
  Heading3BlockObjectResponse,
  ParagraphBlockObjectResponse,
  QuoteBlockObjectResponse,
  TableBlockObjectResponse,
  ToggleBlockObjectResponse
} from "@notionhq/client/build/src/api-endpoints"

type AnyBlock = {
  [key: string]: unknown
}

export const isCallout = (block: AnyBlock): block is CalloutBlockObjectResponse => {
  return "type" in block && block.type === "callout"
}

export const isToggle = (block: AnyBlock): block is ToggleBlockObjectResponse => {
  return "type" in block && block.type === "toggle"
}

export const isJaToggle = (block: AnyBlock): block is ToggleBlockObjectResponse => {
  if (!isToggle(block)) return false
  const summary = block.toggle.rich_text[0].plain_text.trim()
  return summary.toLowerCase() === "in Japanese".toLowerCase()
}

export const isQuote = (block: AnyBlock): block is QuoteBlockObjectResponse => {
  return "type" in block && block.type === "quote"
}

export const isParagraph = (block: AnyBlock): block is ParagraphBlockObjectResponse => {
  return "type" in block && block.type === "paragraph"
}

export const isHeading2 = (block: AnyBlock): block is Heading2BlockObjectResponse => {
  return "type" in block && block.type === "heading_2"
}

export const isHeading3 = (block: AnyBlock): block is Heading3BlockObjectResponse => {
  return "type" in block && block.type === "heading_3"
}

export const isTable = (block: AnyBlock): block is TableBlockObjectResponse => {
  return "type" in block && block.type === "table"
}
