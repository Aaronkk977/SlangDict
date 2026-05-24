import { useCallback, useEffect, useState } from 'react'
import type { Slang, SubmissionInput } from '../types/slang'

const STORAGE_KEY = 'slangdict-submissions'

function load(): Slang[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return []
    return JSON.parse(raw) as Slang[]
  } catch {
    return []
  }
}

function save(items: Slang[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(items))
}

export function useSubmissions() {
  const [submissions, setSubmissions] = useState<Slang[]>(() => load())

  useEffect(() => {
    save(submissions)
  }, [submissions])

  const addSubmission = useCallback((input: SubmissionInput) => {
    const item: Slang = {
      id: `sub-${Date.now()}`,
      term: input.term.trim(),
      year: new Date().getFullYear(),
      rank: 0,
      meaning: input.meaning.trim(),
      targetAudience: '網友投稿',
      usageContext: '由投稿者自行補充的使用情境',
      targetAudienceEn: 'User submission',
      usageContextEn: 'Usage context noted by the contributor',
      dialogueExample: input.dialogueExample.trim(),
      source: '#submission',
      isUserSubmitted: true,
    }
    setSubmissions((prev) => [item, ...prev])
    return item
  }, [])

  const removeSubmission = useCallback((id: string) => {
    setSubmissions((prev) => prev.filter((s) => s.id !== id))
  }, [])

  return { submissions, addSubmission, removeSubmission }
}
