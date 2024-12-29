export function kebabToCamel(str: string): string {
  return str.replace(/-+([a-zA-Z0-9])/g, (_, group1) => group1.toUpperCase())
}
