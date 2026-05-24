import './App.css'
import { useMemo, useState } from 'react'
import { slangs, searchSlangs } from './data'
import { YEARS } from './types/slang'
import { SlangCard } from './components/SlangCard'
import { YearFilter } from './components/YearFilter'
import { SearchBar } from './components/SearchBar'

function App() {
  const [selectedYear, setSelectedYear] = useState<number | 'all'>('all')
  const [query, setQuery] = useState('')

  const filtered = useMemo(() => {
    let list = searchSlangs(query)
    if (selectedYear !== 'all') {
      list = list.filter((s) => s.year === selectedYear)
    }
    return list.sort((a, b) => b.year - a.year || a.rank - b.rank)
  }, [selectedYear, query])

  return (
    <div className="app">
      <header className="header">
        <div className="header-inner">
          <h1>中文流行語收錄</h1>
          <p className="tagline">2021–2025 年度熱門梗 · 意思 · 用法 · 對話範例</p>
        </div>
      </header>

      <main className="main">
        <section className="controls">
          <SearchBar value={query} onChange={setQuery} />
          <YearFilter
            years={YEARS}
            selected={selectedYear}
            onSelect={setSelectedYear}
            counts={YEARS.reduce(
              (acc, y) => {
                acc[y] = slangs.filter((s) => s.year === y).length
                return acc
              },
              {} as Record<number, number>,
            )}
          />
        </section>

        <p className="result-count">
          共 <strong>{filtered.length}</strong> 則流行語
          {selectedYear !== 'all' && ` · ${selectedYear} 年`}
        </p>

        {filtered.length === 0 ? (
          <div className="empty">
            <p>找不到符合的流行語</p>
            <button
              type="button"
              onClick={() => {
                setQuery('')
                setSelectedYear('all')
              }}
            >
              清除篩選
            </button>
          </div>
        ) : (
          <div className="grid">
            {filtered.map((slang) => (
              <SlangCard key={slang.id} slang={slang} />
            ))}
          </div>
        )}
      </main>

      <footer className="footer">
        <p>
          資料來源：
          <a href="https://dailyview.tw/daily/3195" target="_blank" rel="noreferrer">
            DailyView 2021
          </a>
          ·
          <a href="https://supertaste.tvbs.com.tw/hot/341003" target="_blank" rel="noreferrer">
            食尚玩家 2022
          </a>
          ·
          <a href="https://dailyview.tw/daily/3931" target="_blank" rel="noreferrer">
            DailyView 2023
          </a>
          ·
          <a href="https://dailyview.tw/daily/4405" target="_blank" rel="noreferrer">
            DailyView 2024
          </a>
          ·
          <a href="https://dailyview.tw/daily/5202" target="_blank" rel="noreferrer">
            DailyView 2025
          </a>
        </p>
      </footer>
    </div>
  )
}

export default App
