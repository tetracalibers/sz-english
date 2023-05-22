import { Client, LogLevel } from "@notionhq/client"
import { config } from "dotenv"

config()

export const notion = new Client({
  auth: process.env.NOTION_TOKEN,
  logLevel: LogLevel.INFO
})
