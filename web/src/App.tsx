import './App.css'
import { useMemo, useState } from 'react'
import { slangs, searchSlangs } from './data'
import { YEARS } from './types/slang'
import { enrichSlangs } from './utils/enrich'
import { useSubmissions } from './hooks/useSubmissions'
import { SlangCard } from './components/SlangCard'
import { YearFilter } from './components/YearFilter'
import { SearchBar } from './components/SearchBar'
import { SubmissionSection } from './components/SubmissionSection'

function App() {
  const [selectedYear, setSelectedYear] = useState<number | 'all'>('all')
  const [query, setQuery] = useState('')
  const { submissions, addSubmission, removeSubmission } = useSubmissions()

  const officialSlangs = useMemo(() => enrichSlangs(slangs), [])
  const enrichedSubmissions = useMemo(() => enrichSlangs(submissions), [submissions])

  const filteredOfficial = useMemo(() => {
    let list = searchSlangs(query, officialSlangs)
    if (selectedYear !== 'all') {
      list = list.filter((s) => s.year === selectedYear)
    }
    return list.sort((a, b) => b.year - a.year || a.rank - b.rank)
  }, [selectedYear, query, officialSlangs])

  const filteredSubmissions = useMemo(() => {
    const q = query.trim().toLowerCase()
    if (!q) return enrichedSubmissions
    return enrichedSubmissions.filter(
      (s) =>
        s.term.toLowerCase().includes(q) ||
        s.meaning.includes(q) ||
        s.dialogueExample.includes(q),
    )
  }, [query, enrichedSubmissions])

  const yearCounts = useMemo(
    () =>
      YEARS.reduce(
        (acc, y) => {
          acc[y] = officialSlangs.filter((s) => s.year === y).length
          return acc
        },
        {} as Record<number, number>,
      ),
    [officialSlangs],
  )

  return (
    <div className="app">
      <header className="header">
        <div className="header-inner">
          <h1>中文流行語收錄</h1>
          <p className="tagline">
            2021–2025 年度熱門梗 · 意思 · 用法 · 對話範例 · 中英對照
          </p>
        </div>
      </header>

      <main className="main">
        <section className="controls">
          <SearchBar value={query} onChange={setQuery} />
          <YearFilter
            years={YEARS}
            selected={selectedYear}
            onSelect={setSelectedYear}
            counts={yearCounts}
          />
        </section>

        <p className="result-count">
          共 <strong>{filteredOfficial.length}</strong> 則官方收錄
          {selectedYear !== 'all' && ` · ${selectedYear} 年`}
          {filteredSubmissions.length > 0 && (
            <> · <strong>{filteredSubmissions.length}</strong> 則網友投稿</>
          )}
        </p>

        {filteredOfficial.length === 0 && filteredSubmissions.length === 0 ? (
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
          <>
            {filteredOfficial.length > 0 && (
              <div className="grid">
                {filteredOfficial.map((slang) => (
                  <SlangCard key={slang.id} slang={slang} />
                ))}
              </div>
            )}

            {filteredSubmissions.length > 0 && (
              <section className="user-submissions">
                <h3 className="section-title">網友投稿</h3>
                <div className="grid">
                  {filteredSubmissions.map((slang) => (
                    <SlangCard
                      key={slang.id}
                      slang={slang}
                      onRemove={removeSubmission}
                    />
                  ))}
                </div>
              </section>
            )}
          </>
        )}

        <SubmissionSection onSubmit={addSubmission} />
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
