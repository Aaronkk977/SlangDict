# 中文流行語收錄 SlangDict

2021–2025 年度中文流行語字典網站，資料來自 DailyView 網路溫度計與 TVBS 食尚玩家年度盤點。

## 功能

- 依年份（2021–2025）分類瀏覽
- 每則流行語包含：**意思**、**使用對象**、**使用時機**、**對話範例**
- 關鍵字搜尋
- 靜態部署，適合 Vercel

## 資料來源

| 年份 | 來源 |
|------|------|
| 2021 | [DailyView](https://dailyview.tw/daily/3195) |
| 2022 | [食尚玩家](https://supertaste.tvbs.com.tw/hot/341003) |
| 2023 | [DailyView](https://dailyview.tw/daily/3931) |
| 2024 | [DailyView](https://dailyview.tw/daily/4405) |
| 2025 | [DailyView](https://dailyview.tw/daily/5202) |

共收錄 **50** 則流行語（每年 10 則）。

## 本地開發

```bash
cd web
npm install
npm run dev
```

## 部署到 Vercel

1. 將專案推送到 GitHub
2. 在 [Vercel](https://vercel.com) 匯入 repository
3. 設定 **Root Directory** 為 `web`
4. Framework Preset 選 **Vite**，其餘使用預設即可
5. Deploy

或使用 Vercel CLI：

```bash
cd web
npx vercel
```

## 專案結構

```
SlangDict/
├── web/                    # React 前端（Vite）
│   ├── src/
│   │   ├── data/           # 流行語資料庫（TypeScript）
│   │   ├── components/
│   │   └── types/
│   └── vercel.json
├── data/
│   └── slangs.json         # JSON 格式資料庫（可匯入其他系統）
└── slang.md                # 原始資料來源連結
```

## 資料庫格式

`data/slangs.json` 與 `web/src/data/` 內容同步，每筆資料結構：

```json
{
  "id": "2024-02",
  "term": "破防",
  "year": 2024,
  "rank": 2,
  "meaning": "...",
  "targetAudience": "...",
  "usageContext": "...",
  "dialogueExample": "A：...\nB：...",
  "source": "https://..."
}
```
