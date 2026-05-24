import { charPinyin, splitTermUnits } from '../utils/pinyin'

interface Props {
  term: string
}

export function TermWithPinyin({ term }: Props) {
  const units = splitTermUnits(term)

  return (
    <h2 className="term term-with-pinyin">
      {units.map((char, i) => {
        const py = charPinyin(char)
        if (py) {
          return (
            <span key={i} className="char-unit">
              <span className="char-pinyin">{py}</span>
              <span className="char-han">{char}</span>
            </span>
          )
        }
        return (
          <span key={i} className="char-unit char-unit-plain">
            <span className="char-pinyin" aria-hidden="true">
              &nbsp;
            </span>
            <span className="char-han">{char}</span>
          </span>
        )
      })}
    </h2>
  )
}
