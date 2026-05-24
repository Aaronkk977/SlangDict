export interface SlangEn {
  meaningEn: string
  targetAudienceEn: string
  usageContextEn: string
  dialogueExampleEn: string
}

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
  meaningEn?: string
  targetAudienceEn?: string
  usageContextEn?: string
  dialogueExampleEn?: string
  isUserSubmitted?: boolean
}

export interface SubmissionInput {
  term: string
  meaning: string
  dialogueExample: string
}

export const YEARS = [2025, 2024, 2023, 2022, 2021] as const
