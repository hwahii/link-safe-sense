import React from "react";
import { Link, useLocation } from "react-router-dom";
import { Home, Menu, ArrowRight, Trophy } from "lucide-react";
import { LESSON_TITLES, TOTAL_LESSONS } from "@/constants/lessons";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

const lessonList = Object.entries(LESSON_TITLES).map(([id, title]) => ({
  id: Number(id),
  title,
}));

const LessonNav: React.FC = () => {
  const location = useLocation();
  const isLesson = location.pathname.startsWith("/lesson/");
  const lessonMatch = location.pathname.match(/\/lesson\/(\d+)/);
  const currentLesson = lessonMatch ? parseInt(lessonMatch[1]) : 0;

  const hasQuizResult = React.useMemo(() => {
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

          <Sheet>
            <SheetTrigger asChild>
              <button className="p-2 rounded-lg hover:bg-muted transition-colors" aria-label="課程選單">
                <Menu className="w-5 h-5 text-foreground" />
              </button>
            </SheetTrigger>
            <SheetContent side="left" className="w-[300px] sm:w-[340px]">
              <SheetHeader>
                <SheetTitle className="text-left text-lg">課程列表</SheetTitle>
              </SheetHeader>
              <div className="mt-4 space-y-2">
                {lessonList.map((lesson) => (
                  <Link
                    key={lesson.id}
                    to={`/lesson/${lesson.id}`}
                    className={`flex items-center justify-between p-3 rounded-xl border transition-all ${
                      currentLesson === lesson.id
                        ? "border-primary bg-primary/10"
                        : "border-border bg-card hover:border-primary/50 hover:bg-primary/5"
                    }`}
                  >
                    <span className="flex items-center gap-3">
                      <span className={`inline-flex items-center justify-center w-8 h-8 rounded-full text-sm font-bold ${
                        currentLesson === lesson.id
                          ? "bg-primary text-primary-foreground"
                          : "bg-primary/10 text-primary"
                      }`}>
                        {lesson.id}
                      </span>
                      <span className="text-base font-medium text-foreground">{lesson.title}</span>
                    </span>
                    <ArrowRight className="w-4 h-4 text-muted-foreground" />
                  </Link>
                ))}
              </div>

              {hasQuizResult && (
                <div className="mt-6 pt-4 border-t border-border">
                  <Link
                    to="/quiz/result"
                    className="flex items-center gap-3 p-3 rounded-xl border border-border bg-card hover:border-primary/50 hover:bg-primary/5 transition-all"
                  >
                    <Trophy className="w-5 h-5 text-primary" />
                    <span className="text-base font-medium text-foreground">查看測驗成績</span>
                  </Link>
                </div>
              )}
            </SheetContent>
          </Sheet>
        </div>
        {isLesson && (
          <span className="text-sm text-muted-foreground font-medium">
            第 {currentLesson} / {TOTAL_LESSONS} 篇
          </span>
        )}
      </div>
    </nav>
  );
};

export default LessonNav;
