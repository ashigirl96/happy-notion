export function toNotionURL(pageId: string) {
  return `https://www.notion.so/${pageId.replace(/-/g, '')}`
}
