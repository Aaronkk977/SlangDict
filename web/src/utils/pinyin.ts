import { pinyin } from 'pinyin-pro'

const CJK = /[\u4e00-\u9fff]/

const TERM_PINYIN_OVERRIDES: Record<string, Record<number, string>> = {
  上車舞: { 1: 'che' },
  芭比Q了: { 3: 'le' },
  要確欸: { 2: 'ei' },
  我沒了: { 2: 'le' },
}

export function charPinyin(char: string): string {
  if (!CJK.test(char)) return ''
  return pinyin(char, { toneType: 'symbol' })
}

export function resolveCharPinyin(term: string, hanIndex: number, char: string): string {
  if (char === '了') return 'le'
  const override = TERM_PINYIN_OVERRIDES[term]?.[hanIndex]
  if (override) return override
  return charPinyin(char)
}
