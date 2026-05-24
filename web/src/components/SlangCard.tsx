import type { Slang } from '../types/slang'
import { TermWithPinyin } from './TermWithPinyin'
import { BilingualField } from './BilingualField'

interface Props {
  slang: Slang
  onRemove?: (id: string) => void
}

export function SlangCard({ slang, onRemove }: Props) {
  const lines = slang.dialogueExample.split('\n')
  const enLines = slang.dialogueExampleEn?.split('\n') ?? []

  return (
    <article className={`slang-card${slang.isUserSubmitted ? ' user-submitted' : ''}`}>
      <div className="card-top">
        {slang.isUserSubmitted ? (
          <span className="submit-badge">網友投稿</span>
        ) : (
          <>
            <span className="year-badge">{slang.year}</span>
            <span className="rank-badge">#{slang.rank}</span>
          </>
        )}
      </div>

      <TermWithPinyin term={slang.term} />

      <div className="fields">
        <BilingualField
          label="意思"
          labelEn="Meaning"
          zh={slang.meaning}
          en={slang.meaningEn}
        />
        <BilingualField
          label="使用對象"
          labelEn="Target audience"
          zh={slang.targetAudience}
          en={slang.targetAudienceEn}
        />
        <BilingualField
          label="使用時機"
          labelEn="When to use"
          zh={slang.usageContext}
          en={slang.usageContextEn}
        />
        <div className="field dialogue">
          <div className="field-label">
            對話範例
            <span className="label-en">Dialogue example</span>
          </div>
          <div className="dialogue-block">
            <div className="text-zh">
              {lines.map((line, i) => (
                <p key={i}>{line}</p>
              ))}
            </div>
            {slang.dialogueExampleEn && (
              <div className="text-en">
                {enLines.map((line, i) => (
                  <p key={i}>{line}</p>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {slang.isUserSubmitted && onRemove ? (
        <button type="button" className="remove-btn" onClick={() => onRemove(slang.id)}>
          刪除此投稿
        </button>
      ) : (
        slang.source !== '#submission' && (
          <a className="source-link" href={slang.source} target="_blank" rel="noreferrer">
            查看原文
          </a>
        )
      )}
    </article>
  )
}
