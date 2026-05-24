export interface Slang {
  id: string
  term: string
  year: number
  rank: number
  meaning: string
  targetAudience: string
  usageContext: string
  dialogueExample: string
  source: string
}

export const YEARS = [2025, 2024, 2023, 2022, 2021] as const
