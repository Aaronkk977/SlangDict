import { normalizePunctuation } from '../utils/normalizePunctuation'

interface Props {
  label: string
  labelEn: string
  zh: string
  en?: string
  variant?: 'default' | 'dialogue'
}

export function BilingualField({ label, labelEn, zh, en, variant = 'default' }: Props) {
  const zhText = normalizePunctuation(zh)
  const enText = en ? normalizePunctuation(en) : undefined

  return (
    <div className={`field${variant === 'dialogue' ? ' dialogue' : ''}`}>
      <div className="field-label">
        {label}
        <span className="label-sep"> · </span>
        <span className="label-en">{labelEn}</span>
      </div>
      <div className="field-body text-zh">{zhText}</div>
      {enText && <div className="field-body text-en">{enText}</div>}
    </div>
  )
}
