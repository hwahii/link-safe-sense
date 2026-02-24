

# 測驗結果比對與 localStorage 持久化

## 概要

將測驗結果存入 localStorage，讓使用者重新測驗後能與上一次結果比對。結果頁會針對每一題顯示進步（從錯變對）、退步（從對變錯）、持續答對、持續答錯的狀態，給予對應的稱讚或鼓勵。同時讓首頁根據是否有歷史紀錄動態切換內容，並在課程導航列加入回到結果頁的入口。

## 使用者體驗

**結果頁的比對呈現：**
- 每題卡片上方顯示與上次的比對標籤：
  - 從錯變對：顯示「進步了！」綠色標籤，鼓勵使用者
  - 持續答對：顯示「維持正確」灰色標籤
  - 從對變錯：顯示「這次答錯了」橘色標籤，溫和提醒
  - 持續答錯：顯示「還需要練習」標籤，附上課程連結鼓勵學習
- 頂部分數區域：如果有上次紀錄，額外顯示「上次 X/5 → 這次 Y/5」的比對摘要
- 首次測驗：不顯示任何比對資訊，跟現在一樣

**首頁動態切換：**
- 無歷史紀錄：維持現有的入口頁
- 有歷史紀錄：顯示上次分數摘要、「查看詳細結果」連結、「重新測驗」按鈕、課程列表入口

**課程導航列：**
- 有測驗紀錄時，顯示一個小圖示可回到 `/quiz/result`

## 技術細節

### localStorage 結構

key: `quizResult`

```text
{
  "current": { "answers": ["A","B","B","A","B"], "score": 4 },
  "previous": { "answers": ["A","A","B","A","A"], "score": 3 } | null
}
```

### 檔案修改

**1. `src/pages/Quiz.tsx`**
- 測驗完成時（最後一題回答後）：
  - 讀取 localStorage 中的 `quizResult`
  - 將現有的 `current` 移到 `previous`
  - 將新結果寫入 `current`
  - 存回 localStorage
  - 照常 navigate 到結果頁（帶 Router state）

**2. `src/pages/QuizResult.tsx`**
- 讀取邏輯：優先用 Router state，否則從 localStorage 的 `current` 讀取
- 收到 Router state 時，同步寫入 localStorage（將舊 current 移到 previous）
- 從 localStorage 讀取 `previous` 結果
- 頂部分數區：有 previous 時顯示「上次 X → 這次 Y」比對
- 每題卡片：有 previous 時，根據上次/這次答對狀態顯示比對標籤
  - 上次錯 → 這次對：綠色「學會了！」
  - 上次對 → 這次對：灰色「維持正確」  
  - 上次對 → 這次錯：橘色「這次答錯了，再複習一下」
  - 上次錯 → 這次錯：紅色「還需要練習」+ 強調課程連結
- 整體摘要文字根據進步/退步數量動態調整語氣

**3. `src/pages/Index.tsx`**
- 讀取 localStorage 的 `quizResult`
- 有紀錄時：切換為 dashboard 模式，顯示分數摘要、查看結果、重新測驗、開始學習等按鈕
- 無紀錄時：維持現有入口頁不變

**4. `src/components/LessonNav.tsx`**
- 檢查 localStorage 是否有 `quizResult`
- 有的話在導航列加一個圖示（例如 ClipboardCheck），連結到 `/quiz/result`

### 避免重複寫入問題

Quiz.tsx 在 navigate 前寫入 localStorage，QuizResult.tsx 不再重複寫入（只讀取）。這樣確保 previous 不會被覆蓋兩次。

