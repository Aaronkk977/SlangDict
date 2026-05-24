import { writeFileSync, mkdirSync } from 'fs'
import { slangs } from '../web/src/data/index'

mkdirSync('data', { recursive: true })
writeFileSync('data/slangs.json', JSON.stringify(slangs, null, 2) + '\n')
console.log(`Exported ${slangs.length} entries to data/slangs.json`)
