import React from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, ArrowRight, Trophy, Home, BookOpen, ClipboardList } from "lucide-react";
import { LESSON_TITLES, LESSON_SLUGS, SLUG_TO_ID, TOTAL_LESSONS } from "@/constants/lessons";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetClose,
} from "@/components/ui/sheet";

const lessonList = Object.entries(LESSON_TITLES).map(([id, title]) => ({
  id: Number(id),
  title,
}));

const LessonNav: React.FC = () => {
  const location = useLocation();
  const isLesson = location.pathname.startsWith("/lesson/");
  const slug = location.pathname.replace("/lesson/", "");
  const currentLesson = SLUG_TO_ID[slug] || 0;

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
        <Sheet>
          <SheetTrigger asChild>
            <button className="p-2 rounded-lg hover:bg-muted transition-colors" aria-label="選單">
              <Menu className="w-5 h-5 text-foreground" />
            </button>
          </SheetTrigger>
          <SheetContent side="left" className="w-[300px] sm:w-[340px]">
            <SheetHeader>
              <SheetTitle className="text-left text-lg">選單</SheetTitle>
            </SheetHeader>
            <div className="mt-4 space-y-6">
              {/* 課程列表 */}
              <div>
                <p className="text-sm font-bold text-muted-foreground tracking-wider mb-2 px-1">課程</p>
                <div className="space-y-2">
                  {lessonList.map((lesson) => (
                    <SheetClose asChild key={lesson.id}>
                      <Link
                        to={`/lesson/${LESSON_SLUGS[lesson.id]}`}
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
                    </SheetClose>
                  ))}
                </div>
              </div>

              {/* 測驗區 */}
              <div className="pt-2 border-t border-border">
                <p className="text-sm font-bold text-muted-foreground tracking-wider mb-2 px-1">測驗</p>
                <div className="space-y-2">
                  <SheetClose asChild>
                    <Link
                      to="/quiz"
                      className="flex items-center gap-3 p-3 rounded-xl border border-border bg-card hover:border-primary/50 hover:bg-primary/5 transition-all"
                    >
                      <ClipboardList className="w-5 h-5 text-primary" />
                      <span className="text-base font-medium text-foreground">
                        {hasQuizResult ? "再測一次" : "開始測驗"}
                      </span>
                    </Link>
                  </SheetClose>
                  {hasQuizResult && (
                    <SheetClose asChild>
                      <Link
                        to="/quiz/result"
                        className="flex items-center gap-3 p-3 rounded-xl border border-border bg-card hover:border-primary/50 hover:bg-primary/5 transition-all"
                      >
                        <Trophy className="w-5 h-5 text-primary" />
                        <span className="text-base font-medium text-foreground">查看測驗成績</span>
                      </Link>
                    </SheetClose>
                  )}
                </div>
              </div>

              {/* 首頁連結 */}
              <div className="pt-2 border-t border-border">
                <SheetClose asChild>
                  <Link
                    to="/"
                    className="flex items-center gap-3 p-3 rounded-xl hover:bg-muted transition-all text-muted-foreground hover:text-foreground"
                  >
                    <Home className="w-4 h-4" />
                    <span className="text-sm font-medium">回到首頁</span>
                  </Link>
                </SheetClose>
              </div>
            </div>
          </SheetContent>
        </Sheet>

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
