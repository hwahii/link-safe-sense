import React, { useMemo } from "react";
import { Link, useLocation } from "react-router-dom";
import { Home, List, ClipboardCheck } from "lucide-react";

const LessonNav: React.FC = () => {
  const location = useLocation();
  const isLesson = location.pathname.startsWith("/lesson/");
  const lessonMatch = location.pathname.match(/\/lesson\/(\d+)/);
  const currentLesson = lessonMatch ? parseInt(lessonMatch[1]) : 0;

  const hasQuizResult = useMemo(() => {
    try {
      const stored = JSON.parse(localStorage.getItem("quizResult") || "null");
      return stored?.current != null;
    } catch {
      return false;
    }
  }, []);

  return (
    <nav className="sticky top-0 z-10 bg-background/95 backdrop-blur border-b border-border px-4 py-3">
      <div className="max-w-lg mx-auto flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Link to="/" className="p-2 rounded-lg hover:bg-muted transition-colors" aria-label="首頁">
            <Home className="w-5 h-5 text-foreground" />
          </Link>
          <Link to="/lessons" className="p-2 rounded-lg hover:bg-muted transition-colors" aria-label="課程列表">
            <List className="w-5 h-5 text-foreground" />
          </Link>
          {hasQuizResult && (
            <Link to="/quiz/result" className="p-2 rounded-lg hover:bg-muted transition-colors" aria-label="測驗結果">
              <ClipboardCheck className="w-5 h-5 text-foreground" />
            </Link>
          )}
        </div>
        {isLesson && (
          <span className="text-sm text-muted-foreground font-medium">
            第 {currentLesson} / 7 篇
          </span>
        )}
      </div>
    </nav>
  );
};

export default LessonNav;
