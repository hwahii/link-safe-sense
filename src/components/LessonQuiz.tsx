import React, { useState } from "react";
import { CheckCircle, XCircle } from "lucide-react";

interface QuizOption {
  label: string;
  text: string;
}

interface LessonQuizProps {
  question: string;
  options: QuizOption[];
  correctAnswer: string; // "A" or "B" or "C"
  correctFeedback: string;
  wrongFeedback: string;
  onComplete?: () => void;
}

const LessonQuiz: React.FC<LessonQuizProps> = ({
  question,
  options,
  correctAnswer,
  correctFeedback,
  wrongFeedback,
  onComplete,
}) => {
  const [selected, setSelected] = useState<string | null>(null);

  const isCorrect = selected === correctAnswer;
  const hasAnswered = selected !== null;

  const handleSelect = (label: string) => {
    if (hasAnswered) return;
    setSelected(label);
    onComplete?.();
  };

  return (
    <div className="my-8 rounded-2xl border-2 border-primary/20 bg-secondary/50 p-5">
      <p className="font-bold text-lg mb-4 text-foreground">{question}</p>
      <div className="space-y-3">
        {options.map((opt) => {
          const isThis = selected === opt.label;
          const isRight = opt.label === correctAnswer;
          let btnClass =
            "w-full min-h-[52px] px-4 py-3 rounded-xl text-left text-base font-medium transition-all border-2 ";

          if (!hasAnswered) {
            btnClass += "border-border bg-white hover:border-primary hover:bg-primary/5 cursor-pointer";
          } else if (isThis && isCorrect) {
            btnClass += "border-safe bg-safe/10 text-safe";
          } else if (isThis && !isCorrect) {
            btnClass += "border-danger bg-danger/10 text-danger";
          } else if (isRight && hasAnswered) {
            btnClass += "border-safe bg-safe/10 text-safe";
          } else {
            btnClass += "border-border bg-white opacity-50";
          }

          return (
            <button key={opt.label} className={btnClass} onClick={() => handleSelect(opt.label)} disabled={hasAnswered}>
              <span className="flex items-center gap-3">
                {hasAnswered && isThis && isCorrect && <CheckCircle className="w-5 h-5 text-safe shrink-0" />}
                {hasAnswered && isThis && !isCorrect && <XCircle className="w-5 h-5 text-danger shrink-0" />}
                {hasAnswered && !isThis && isRight && <CheckCircle className="w-5 h-5 text-safe shrink-0" />}
                <span>
                  {opt.label}. {opt.text}
                </span>
              </span>
            </button>
          );
        })}
      </div>
      {hasAnswered && (
        <div
          className={`mt-4 p-4 rounded-xl text-base leading-relaxed ${
            isCorrect ? "bg-safe/10 text-safe" : "bg-danger/10 text-danger"
          }`}
        >
          {isCorrect ? correctFeedback : wrongFeedback}
        </div>
      )}
    </div>
  );
};

export default LessonQuiz;
