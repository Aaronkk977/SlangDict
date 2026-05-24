interface Props {
  years: readonly number[]
  selected: number | 'all'
  onSelect: (year: number | 'all') => void
  counts: Record<number, number>
}

export function YearFilter({ years, selected, onSelect, counts }: Props) {
  return (
    <div className="year-filter">
      <button
        type="button"
        className={selected === 'all' ? 'active' : ''}
        onClick={() => onSelect('all')}
      >
        全部
      </button>
      {years.map((year) => (
        <button
          key={year}
          type="button"
          className={selected === year ? 'active' : ''}
          onClick={() => onSelect(year)}
        >
          {year}
          <span className="count">{counts[year]}</span>
        </button>
      ))}
    </div>
  )
}
