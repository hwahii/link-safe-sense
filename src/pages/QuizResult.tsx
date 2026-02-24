import { useLocation, Link } from "react-router-dom";
import { CheckCircle, XCircle, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

interface QuizResultState {
  answers: string[];
  score: number;
}

const questions = [
  {
    id: 1,
    question: "在兩個選項中選擇你覺得安全的那個：",
    optionA: "https://shopee.tw/order/detail",
    optionB: "https://shopee.tw.order-check.net/detail",
    correctAnswer: "A",
    explanation:
      "你可能看到 B 裡面也有「shopee.tw」就覺得是蝦皮。但網址就像門牌地址，真正代表「這是誰家」的是最後面那一段。B 的主人其實是 order-check.net，前面的 shopee.tw 只是裝飾，就像有人在自家門口掛了蝦皮的招牌，但那不是蝦皮的店。",
    lessonLink: "/lesson/2",
  },
  {
    id: 2,
    question: "在兩個選項中選擇你覺得安全的那個：",
    optionA: "https://www.cathaybk.com.tw/login",
    optionB: "https://www.cathaybk.xyz/login",
    correctAnswer: "A",
    explanation:
      "兩個網址前面都寫著 cathaybk（國泰世華），差別在結尾。.com.tw 是台灣正式註冊的網域，銀行、企業都會用。.xyz 是非常便宜、任何人都能隨手註冊的網域，正規機構幾乎不會使用。看到 .xyz、.top、.click 這類結尾，要特別小心。",
    lessonLink: "/lesson/3",
  },
  {
    id: 3,
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

const QuizResult = () => {
  const location = useLocation();
  const state = location.state as QuizResultState | null;

  if (!state) {
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

  const { answers, score } = state;

  return (
    <main className="min-h-screen bg-background">
      <div className="max-w-lg mx-auto px-5 py-8">
        {/* Score */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-primary/10 mb-4">
            <span className="text-3xl font-bold text-primary">{score}</span>
          </div>
          <p className="text-xl font-bold text-foreground">你答對了 {score} / 5 題</p>
          <p className="mt-3 text-base text-muted-foreground leading-relaxed">
            {score === 5
              ? "全對而且每題都知道為什麼？你很厲害。"
              : "有任何一題猶豫或答錯？很正常，因為從來沒人教過這些。往下看，學會怎麼一眼看出連結能不能點。"}
          </p>
        </div>

        {/* Detail cards */}
        <div className="space-y-5">
          {questions.map((q, idx) => {
            const userAnswer = answers[idx];
            const isCorrect = userAnswer === q.correctAnswer;

            return (
              <div key={q.id} className="rounded-2xl border border-border bg-card p-5">
                <div className="flex items-start gap-3 mb-3">
                  {isCorrect ? (
                    <CheckCircle className="w-6 h-6 text-safe shrink-0 mt-0.5" />
                  ) : (
                    <XCircle className="w-6 h-6 text-danger shrink-0 mt-0.5" />
                  )}
                  <div>
                    <p className="font-medium text-sm text-muted-foreground">第 {q.id} 題</p>
                    <p className="text-base text-foreground mt-1">
                      你的答案：{userAnswer}（{userAnswer === "A" ? q.optionA : q.optionB}）
                    </p>
                  </div>
                </div>
                <p className="text-base leading-relaxed text-foreground mt-3">{q.explanation}</p>
                <Link to={q.lessonLink} className="inline-flex items-center gap-1 mt-4 text-primary font-medium hover:underline">
                  學習這個概念 <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            );
          })}
        </div>

        <div className="mt-8 text-center">
          <Link to="/lesson/1">
            <Button size="lg" className="text-lg py-6 px-8 rounded-xl font-bold">
              從頭開始學習
            </Button>
          </Link>
        </div>
      </div>
    </main>
  );
};

export default QuizResult;
