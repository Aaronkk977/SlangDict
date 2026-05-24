interface Props {
  label: string
  labelEn: string
  zh: string
  en?: string
  variant?: 'default' | 'dialogue'
}

export function BilingualField({ label, labelEn, zh, en, variant = 'default' }: Props) {
  return (
    <div className={`field${variant === 'dialogue' ? ' dialogue' : ''}`}>
      <div className="field-label">
        {label}
        <span className="label-en">{labelEn}</span>
      </div>
      <div className="field-body text-zh">{zh}</div>
      {en && <div className="field-body text-en">{en}</div>}
    </div>
  )
}
