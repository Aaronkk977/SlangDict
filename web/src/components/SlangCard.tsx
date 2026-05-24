import type { Slang } from '../types/slang'

interface Props {
  slang: Slang
}

export function SlangCard({ slang }: Props) {
  const lines = slang.dialogueExample.split('\n')

  return (
    <article className="slang-card">
      <div className="card-top">
        <span className="year-badge">{slang.year}</span>
        <span className="rank-badge">#{slang.rank}</span>
      </div>
      <h2 className="term">{slang.term}</h2>

      <dl className="fields">
        <div className="field">
          <dt>意思</dt>
          <dd>{slang.meaning}</dd>
        </div>
        <div className="field">
          <dt>使用對象</dt>
          <dd>{slang.targetAudience}</dd>
        </div>
        <div className="field">
          <dt>使用時機</dt>
          <dd>{slang.usageContext}</dd>
        </div>
        <div className="field dialogue">
          <dt>對話範例</dt>
          <dd>
            {lines.map((line, i) => (
              <p key={i}>{line}</p>
            ))}
          </dd>
        </div>
      </dl>

      <a className="source-link" href={slang.source} target="_blank" rel="noreferrer">
        查看原文
      </a>
    </article>
  )
}
