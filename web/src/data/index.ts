import { slangs2021 } from './2021'
import { slangs2022 } from './2022'
import { slangs2023 } from './2023'
import { slangs2024 } from './2024'
import { slangs2025 } from './2025'
import type { Slang } from '../types/slang'

export const slangs: Slang[] = [
  ...slangs2025,
  ...slangs2024,
  ...slangs2023,
  ...slangs2022,
  ...slangs2021,
]

export function getSlangsByYear(year: number): Slang[] {
  return slangs.filter((s) => s.year === year).sort((a, b) => a.rank - b.rank)
}

export function searchSlangs(query: string): Slang[] {
  const q = query.trim().toLowerCase()
  if (!q) return slangs
  return slangs.filter(
    (s) =>
      s.term.toLowerCase().includes(q) ||
      s.meaning.includes(q) ||
      s.targetAudience.includes(q) ||
      s.usageContext.includes(q),
  )
}
