import { useState, type FormEvent } from 'react'
import type { SubmissionInput } from '../types/slang'

interface Props {
  onSubmit: (input: SubmissionInput) => void
}

export function SubmissionSection({ onSubmit }: Props) {
  const [term, setTerm] = useState('')
  const [meaning, setMeaning] = useState('')
  const [dialogueExample, setDialogueExample] = useState('')
  const [success, setSuccess] = useState(false)

  function handleSubmit(e: FormEvent) {
    e.preventDefault()
    if (!term.trim() || !meaning.trim() || !dialogueExample.trim()) return

    onSubmit({ term, meaning, dialogueExample })
    setTerm('')
    setMeaning('')
    setDialogueExample('')
    setSuccess(true)
    setTimeout(() => setSuccess(false), 3000)
  }

  return (
    <section className="submission-section" id="submit">
      <div className="submission-inner">
        <h2>投稿區</h2>
        <p className="submission-desc">
          想分享你知道的流行語？填寫以下欄位即可投稿（資料儲存於本機瀏覽器）。
        </p>

        <form className="submission-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="sub-term">流行語</label>
            <input
              id="sub-term"
              type="text"
              placeholder="例如：真冰涼"
              value={term}
              onChange={(e) => setTerm(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="sub-meaning">意思</label>
            <textarea
              id="sub-meaning"
              placeholder="這個詞是什麼意思？"
              rows={3}
              value={meaning}
              onChange={(e) => setMeaning(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="sub-dialogue">對話範例</label>
            <textarea
              id="sub-dialogue"
              placeholder={'A：…\nB：…'}
              rows={4}
              value={dialogueExample}
              onChange={(e) => setDialogueExample(e.target.value)}
              required
            />
          </div>

          <button type="submit" className="submit-btn">
            送出投稿
          </button>

          {success && <p className="submit-success">投稿成功！已顯示在上方列表。</p>}
        </form>
      </div>
    </section>
  )
}
