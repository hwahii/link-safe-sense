import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Progress } from "@/components/ui/progress";
import { ChevronLeft } from "lucide-react";
import PageSEO from "@/components/PageSEO";

interface QuizQuestion {
  id: number;
  question: string;
  optionA: string;
  optionB: string;
  correctAnswer: "A" | "B";
}

const questions: QuizQuestion[] = [
  {
    id: 1,
    question: "哪個選項中的連結看起來比較安全？",
    optionA: "https://www.cathaybk.com.tw/login",
    optionB: "https://www.cathaybk.xyz/login",
    correctAnswer: "A",
  },
  {
    id: 2,
    question: "哪個選項中的連結看起來比較安全？",
    optionA: "https://shopee.tw/order/detail",
    optionB: "https://shopee.tw.order-check.net/detail",
    correctAnswer: "A",
  },
  {
    id: 3,
    question: "哪個選項中的連結看起來比較安全？",
    optionA: "https://www.gooogle.com/search",
    optionB: "https://www.google.com/search",
    correctAnswer: "B",
  },
  {
    id: 4,
    question: "哪個選項中的連結看起來比較安全？",
    optionA: "https://www.esunbank.com.tw/personal/loan",
    optionB: "https://secure-banking.net/esunbank/personal/loan",
    correctAnswer: "A",
  },
  {
    id: 5,
    question: "你在 LINE 收到朋友傳來的訊息：「這個超便宜！https://bit.ly/3OxxiZi」，你會怎麼做？",
    optionA: "直接點開看看",
    optionB: "不點連結，自己打開該購物平台的 app 或網站去找",
    correctAnswer: "B",
  },
];

const Quiz = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<string[]>([]);
  const navigate = useNavigate();

  const current = questions[currentIndex];
  const progress = ((currentIndex) / questions.length) * 100;

  const handleAnswer = (answer: "A" | "B") => {
    if (document.activeElement instanceof HTMLElement) {
      document.activeElement.blur();
    }
    const newAnswers = [...answers.slice(0, currentIndex), answer];
    setAnswers(newAnswers);

    if (currentIndex < questions.length - 1) {
      setTimeout(() => setCurrentIndex(currentIndex + 1), 300);
    } else {
      const score = newAnswers.reduce((acc, ans, idx) => {
        return acc + (ans === questions[idx].correctAnswer ? 1 : 0);
      }, 0);

      // Persist to localStorage: move current → previous
      try {
        const existing = JSON.parse(localStorage.getItem("quizResult") || "null");
        const updated = {
          current: { answers: newAnswers, score },
          previous: existing?.current ?? null,
        };
        localStorage.setItem("quizResult", JSON.stringify(updated));
      } catch {
        localStorage.setItem("quizResult", JSON.stringify({
          current: { answers: newAnswers, score },
          previous: null,
        }));
      }

      setTimeout(() => {
        navigate("/quiz/result", { state: { answers: newAnswers, score } });
      }, 300);
    }
  };

  const handleBack = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  const isUrl = (text: string) => text.startsWith("http");

  return (
    <>
    <PageSEO
      title="詐騙連結測驗"
      description="5 題快速測驗，測試你分辨詐騙連結的能力。"
      path="/quiz"
    />
    <main className="min-h-screen bg-background">
      <div className="max-w-lg mx-auto px-5 py-8">
        <div className="mb-8">
          <div className="flex justify-between items-center text-sm text-muted-foreground mb-2">
            <button
              onClick={handleBack}
              disabled={currentIndex === 0}
              className="flex items-center gap-1 disabled:opacity-0 transition-opacity text-primary"
            >
              <ChevronLeft className="w-4 h-4" />
              上一題
            </button>
            <span>{currentIndex + 1} / {questions.length}</span>
          </div>
          <Progress value={progress} className="h-2" />
        </div>

        <div className="mb-8">
          <p className="text-lg font-medium text-foreground leading-relaxed">{current.question}</p>
        </div>

        <div className="space-y-4">
          {(["A", "B"] as const).map((opt) => {
            const text = opt === "A" ? current.optionA : current.optionB;
            return (
              <button
                key={`${currentIndex}-${opt}`}
                onClick={() => handleAnswer(opt)}
                className="w-full min-h-[60px] px-5 py-4 rounded-xl text-left border-2 border-border bg-white [@media(hover:hover)]:hover:border-primary [@media(hover:hover)]:hover:bg-primary/5 active:border-primary active:bg-primary/5 transition-all"
              >
                <span className="flex items-center gap-3">
                  <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-primary/10 text-primary font-bold text-sm shrink-0">
                    {opt}
                  </span>
                  <span className={`leading-relaxed break-all ${isUrl(text) ? "font-mono text-sm" : "text-base"}`}>
                    {text}
                  </span>
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </main>
    </>
  );
};

export default Quiz;
