export function normalizePunctuation(text: string): string {
  return text
    .replaceAll('’', "'")
    .replaceAll('‘', "'")
    .replaceAll('“', '"')
    .replaceAll('”', '"')
    .replaceAll('—', '-')
}

