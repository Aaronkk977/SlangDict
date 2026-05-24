interface Props {
  value: string
  onChange: (value: string) => void
}

export function SearchBar({ value, onChange }: Props) {
  return (
    <div className="search-bar">
      <label htmlFor="search">搜尋流行語</label>
      <input
        id="search"
        type="search"
        placeholder="輸入關鍵字，例如：破防、超派、芭比Q..."
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  )
}
