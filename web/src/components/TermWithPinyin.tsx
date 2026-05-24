import { charPinyin } from '../utils/pinyin'

const CJK = /[\u4e00-\u9fff]/

type Segment =
  | { kind: 'han'; char: string }
  | { kind: 'latin'; text: string }

function segmentTerm(term: string): Segment[] {
  const segments: Segment[] = []
  let latin = ''

  const flushLatin = () => {
    if (latin) {
      segments.push({ kind: 'latin', text: latin })
      latin = ''
    }
  }

  for (const char of term) {
    if (CJK.test(char)) {
      flushLatin()
      segments.push({ kind: 'han', char })
    } else {
      latin += char
    }
  }
  flushLatin()
  return segments
}

interface Props {
  term: string
}

export function TermWithPinyin({ term }: Props) {
  const segments = segmentTerm(term)

  return (
    <h2 className="term term-with-pinyin">
      {segments.map((seg, i) => {
        if (seg.kind === 'latin') {
          return (
            <span key={i} className="term-latin">
              {seg.text}
            </span>
          )
        }
        const py = charPinyin(seg.char)
        return (
          <span key={i} className="char-unit">
            <span className="char-pinyin">{py || '\u00A0'}</span>
            <span className="char-han">{seg.char}</span>
          </span>
        )
      })}
    </h2>
  )
}
