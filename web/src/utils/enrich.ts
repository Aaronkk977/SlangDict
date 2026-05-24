import type { Slang, SlangEn } from '../types/slang'
import { slangEnMap } from '../data/en'

export function enrichSlang(slang: Slang): Slang {
  const en: Partial<SlangEn> | undefined = slangEnMap[slang.id]
  if (!en && !slang.meaningEn) return slang
  return {
    ...slang,
    meaningEn: slang.meaningEn ?? en?.meaningEn,
    targetAudienceEn: slang.targetAudienceEn ?? en?.targetAudienceEn,
    usageContextEn: slang.usageContextEn ?? en?.usageContextEn,
    dialogueExampleEn: slang.dialogueExampleEn ?? en?.dialogueExampleEn,
  }
}

export function enrichSlangs(list: Slang[]): Slang[] {
  return list.map(enrichSlang)
}
