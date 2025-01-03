export function kebabToCamel(str: string): string {
  // 全角など、ASCII 範囲外の文字が含まれているかチェック
  if (/[^\x00-\x7F]/.test(str)) {
    return ''
  }

  // アルファベット、数字、スペース、ハイフンのみ残し、それ以外は削除
  const cleaned = str.replace(/[^a-zA-Z0-9\s-]+/g, '')
  if (!cleaned) {
    return ''
  }

  // スペースまたはハイフンで区切り、空要素は除去
  const tokens = cleaned.split(/[\s-]+/).filter(Boolean)
  if (tokens.length === 0) {
    return ''
  }

  // 先頭トークンは「そのまま」使用
  let result = tokens[0]

  // 2番目以降のトークンは、先頭文字を大文字化＋残りは「そのまま」
  for (let i = 1; i < tokens.length; i++) {
    const token = tokens[i]
    if (token.length > 0) {
      // 先頭文字を大文字化し、残りはそのまま連結
      result += token[0].toUpperCase() + token.slice(1)
    }
  }

  return result
}
