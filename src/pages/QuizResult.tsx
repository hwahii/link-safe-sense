import { useLocation, Link } from "react-router-dom";
import { CheckCircle, XCircle, ArrowRight, TrendingUp, TrendingDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface QuizResultState {
  answers: string[];
  score: number;
}

interface StoredQuizResult {
  current: QuizResultState;
  previous: QuizResultState | null;
}

const questions = [
  {
    id: 1,
    concept: "網域後綴",
    question: "在兩個選項中選擇你覺得安全的那個：",
    optionA: "https://www.cathaybk.com.tw/login",
    optionB: "https://www.cathaybk.xyz/login",
    correctAnswer: "A",
    explanation:
      "兩個網址前面都寫著 cathaybk（國泰世華），差別在結尾。.com.tw 是台灣正式註冊的網域，銀行、企業都會用。.xyz 是非常便宜、任何人都能隨手註冊的網域，正規機構幾乎不會使用。看到 .xyz、.top、.click 這類結尾，要特別小心。",
    lessonLink: "/lesson/2",
  },
  {
    id: 2,
    concept: "主網域辨識",
    question: "在兩個選項中選擇你覺得安全的那個：",
    optionA: "https://shopee.tw/order/detail",
    optionB: "https://shopee.tw.order-check.net/detail",
    correctAnswer: "A",
    explanation:
      "你可能看到 B 裡面也有「shopee.tw」就覺得是蝦皮。但網址就像門牌地址，真正代表「這是誰家」的是最後面那一段。B 的主人其實是 order-check.net，前面的 shopee.tw 只是裝飾，就像有人在自家門口掛了蝦皮的招牌，但那不是蝦皮的店。",
    lessonLink: "/lesson/3",
  },
  {
    id: 3,
    concept: "字元偽裝",
    question: "在兩個選項中選擇你覺得安全的那個：",
    optionA: "https://www.gooogle.com/search",
    optionB: "https://www.google.com/search",
    correctAnswer: "B",
    explanation:
      "A 的 google 多了一個 o。詐騙網址常常會在品牌名稱上做很小的手腳，多一個字母、少一個字母、或是用長得很像的字元替換，賭你不會逐字去看。收到連結的時候，品牌名稱的部分值得多看一眼。",
    lessonLink: "/lesson/4",
  },
  {
    id: 4,
    concept: "路徑偽裝",
    question: "在兩個選項中選擇你覺得安全的那個：",
    optionA: "https://www.esunbank.com.tw/personal/loan",
    optionB: "https://secure-banking.net/esunbank/personal/loan",
    correctAnswer: "A",
    explanation:
      "跟第 1 題類似，B 裡面雖然看得到「esunbank」，但它出現在斜線後面，那只是網頁路徑，不是網站的主人。B 的主人是 secure-banking.net，跟玉山銀行沒有任何關係。記得：品牌名稱要出現在斜線「前面」才算數。",
    lessonLink: "/lesson/5",
  },
  {
    id: 5,
    concept: "縮網址",
    question:
      "你在 LINE 收到朋友傳來的訊息：「這個超便宜！https://bit.ly/3OxxiZi」，你會怎麼做？",
    optionA: "直接點開看看",
    optionB: "不點連結，自己打開該購物平台的 app 或網站去找",
    correctAnswer: "B",
    explanation:
      "bit.ly 是一種「縮網址」服務，它把原本的網址縮短了，所以你完全看不出這個連結到底會帶你去哪裡。不管是誰傳給你的，只要你看不出網址的真面目，最安全的做法就是不要點，自己去打開你熟悉的 app 或網站找。",
    lessonLink: "/lesson/6",
  },
];

type CompareStatus = "improved" | "maintained" | "regressed" | "struggling";

function getCompareStatus(
  prevAnswer: string,
  currAnswer: string,
  correctAnswer: string
): CompareStatus {
  const prevCorrect = prevAnswer === correctAnswer;
  const currCorrect = currAnswer === correctAnswer;
  if (!prevCorrect && currCorrect) return "improved";
  if (prevCorrect && currCorrect) return "maintained";
  if (prevCorrect && !currCorrect) return "regressed";
  return "struggling";
}

const compareLabels: Record<CompareStatus, { text: string; className: string }> = {
  improved: { text: "🎉 學會了！", className: "bg-safe/15 text-safe border-safe/30" },
  maintained: { text: "✓ 維持正確", className: "bg-muted text-muted-foreground border-border" },
  regressed: { text: "這次答錯了，再複習一下", className: "bg-[hsl(30,80%,50%)]/15 text-[hsl(30,80%,40%)] border-[hsl(30,80%,50%)]/30" },
  struggling: { text: "還需要練習", className: "bg-danger/15 text-danger border-danger/30" },
};

const QuizResult = () => {
  const location = useLocation();
  const routerState = location.state as QuizResultState | null;

  // Read from localStorage
  let stored: StoredQuizResult | null = null;
  try {
    stored = JSON.parse(localStorage.getItem("quizResult") || "null");
  } catch {}

  const current = routerState ?? stored?.current ?? null;
  const previous = stored?.previous ?? null;

  if (!current) {
    return (
      <main className="min-h-screen bg-background flex items-center justify-center p-5">
        <div className="text-center">
          <p className="text-lg mb-4">還沒有作答紀錄</p>
          <Link to="/quiz">
            <Button>開始測驗</Button>
          </Link>
        </div>
      </main>
    );
  }

  const { answers, score } = current;

  // Compare stats
  let improvedCount = 0;
  let regressedCount = 0;
  if (previous) {
    questions.forEach((q, idx) => {
      const status = getCompareStatus(previous.answers[idx], answers[idx], q.correctAnswer);
      if (status === "improved") improvedCount++;
      if (status === "regressed") regressedCount++;
    });
  }

  const getScoreSummary = () => {
    if (!previous) {
      if (score === 5) return "🎉 太厲害了，全部答對！你已經具備分辨詐騙連結的基本能力。下面的課程可以幫你更深入理解背後的原理。";
      if (score >= 3) return "👍 表現得不錯！有幾題比較容易混淆，看看下面的詳解，下次就不會再猶豫了。";
      return "沒關係，這些本來就不容易分辨。好消息是，只要花幾分鐘看完下面的說明，你馬上就會知道怎麼判斷。";
    }
    const diff = score - previous.score;
    if (diff > 0) return `📈 進步了！比上次多對了 ${diff} 題，繼續保持！`;
    if (diff === 0 && score === 5) return "🎉 又是滿分！你對詐騙連結的判斷力很穩固。";
    if (diff === 0) return "跟上次一樣的分數，再看看下面哪些地方可以加強。";
    return `這次少對了 ${Math.abs(diff)} 題，沒關係，再複習一下就好。`;
  };

  return (
    <main className="min-h-screen bg-background">
      <div className="max-w-lg mx-auto px-5 py-8">
        {/* Score */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-primary/10 mb-4">
            <span className="text-3xl font-bold text-primary">{score}</span>
          </div>
          <p className="text-xl font-bold text-foreground">你答對了 {score} / 5 題</p>
          
          {previous && (
            <div className="mt-3 inline-flex items-center gap-2 px-4 py-2 rounded-full bg-muted text-sm">
              <span className="text-muted-foreground">上次 {previous.score}/5</span>
              <span className="text-muted-foreground">→</span>
              <span className="font-bold text-foreground">這次 {score}/5</span>
              {score > previous.score && <TrendingUp className="w-4 h-4 text-safe" />}
              {score < previous.score && <TrendingDown className="w-4 h-4 text-danger" />}
            </div>
          )}
          
          <p className="mt-3 text-base text-muted-foreground leading-relaxed">
            {getScoreSummary()}
          </p>
        </div>

        {/* Detail cards */}
        <div className="space-y-5">
          {questions.map((q, idx) => {
            const userAnswer = answers[idx];
            const isCorrect = userAnswer === q.correctAnswer;
            const compareStatus = previous
              ? getCompareStatus(previous.answers[idx], userAnswer, q.correctAnswer)
              : null;

            return (
              <div key={q.id} className="rounded-2xl border border-border bg-card p-5">
                <div className="flex items-center gap-2 mb-3 flex-wrap">
                  <p className="font-medium text-sm text-muted-foreground">第 {q.id} 題</p>
                  <span className="text-xs px-2 py-0.5 rounded-full bg-primary/10 text-primary font-medium">{q.concept}</span>
                  {compareStatus && (
                    <span className={`text-xs px-2 py-0.5 rounded-full border font-medium ${compareLabels[compareStatus].className}`}>
                      {compareLabels[compareStatus].text}
                    </span>
                  )}
                </div>
                
                <div className="space-y-2 mb-4">
                  {(["A", "B"] as const).map((opt) => {
                    const text = opt === "A" ? q.optionA : q.optionB;
                    const isUserChoice = userAnswer === opt;
                    const isCorrectOption = q.correctAnswer === opt;
                    
                    return (
                      <div
                        key={opt}
                        className={`flex items-center gap-3 px-4 py-3 rounded-xl border-2 ${
                          isCorrectOption
                            ? "border-safe/40 bg-safe/5"
                            : isUserChoice
                            ? "border-danger/40 bg-danger/5"
                            : "border-border bg-muted/30"
                        }`}
                      >
                        <span className={`inline-flex items-center justify-center w-7 h-7 rounded-full text-sm font-bold shrink-0 ${
                          isCorrectOption ? "bg-safe/15 text-safe" : isUserChoice ? "bg-danger/15 text-danger" : "bg-muted text-muted-foreground"
                        }`}>
                          {opt}
                        </span>
                        <span className={`break-all ${text.startsWith("http") ? "font-mono text-sm" : "text-base"}`}>
                          {text}
                        </span>
                        {isCorrectOption && <CheckCircle className="w-5 h-5 text-safe shrink-0 ml-auto" />}
                        {isUserChoice && !isCorrectOption && <XCircle className="w-5 h-5 text-danger shrink-0 ml-auto" />}
                      </div>
                    );
                  })}
                </div>

                <p className="text-base leading-relaxed text-foreground">{q.explanation}</p>
                <Link to={`${q.lessonLink}?from=quiz`} className="inline-flex items-center gap-1 mt-4 text-primary font-medium hover:underline">
                  學習這個概念 <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            );
          })}
        </div>

        <div className="mt-8 flex flex-col gap-3">
          <Link to="/quiz">
            <Button size="lg" variant="outline" className="w-full text-lg py-6 rounded-xl font-bold border-2">
              重新測驗
            </Button>
          </Link>
          <Link to="/lesson/1">
            <Button size="lg" className="w-full text-lg py-6 rounded-xl font-bold">
              從頭開始學習
            </Button>
          </Link>
        </div>
      </div>
    </main>
  );
};

export default QuizResult;
