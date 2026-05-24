import { pinyin } from 'pinyin-pro'

const CJK = /[\u4e00-\u9fff]/

export function charPinyin(char: string): string {
  if (!CJK.test(char)) return ''
  return pinyin(char, { toneType: 'symbol' })
}

export function splitTermUnits(term: string): string[] {
  return [...term]
}
