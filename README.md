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

這是 **Vite + React** 專案，不是 Next.js。

### 方式 A：從 repo 根目錄部署（推薦）

根目錄已有 `vercel.json` 與 `package.json`，Vercel 設定如下：

| 設定項 | 值 |
|--------|-----|
| Framework Preset | **Other**（不要選 Vite / Next.js） |
| Root Directory | **留空**（`.`） |
| Install Command | `cd web && npm install` |
| Build Command | `cd web && npm run build` |
| Output Directory | `web/dist` |

> 若 Build Command 被設成 `vite build` 會出現 **exit 127**，因為 `vite` 裝在 `web/node_modules`，不在根目錄。

### 方式 B：只部署 web 子目錄（最簡單）

| 設定項 | 值 |
|--------|-----|
| Framework Preset | **Vite** |
| Root Directory | `web` |
| Build Command | `npm run build`（預設） |
| Output Directory | `dist` |

### 若出現「No Next.js version detected」

代表 Vercel 誤判成 Next.js，請到 **Project Settings → General**：

1. **Framework Preset** 改為 **Other** 或 **Vite**（依上面方式 A / B）
2. **Root Directory** 確認是 `.` 或 `web`
3. 到 **Build & Development Settings**，確認 Build Command **不是** `vite build`（除非 Root Directory 是 `web`）
4. 儲存後 **Redeploy**

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
