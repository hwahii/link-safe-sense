import { Link } from "react-router-dom";
import LessonNav from "@/components/LessonNav";
import { ArrowRight } from "lucide-react";

const lessonList = [
  { id: 1, title: "網址是什麼？" },
  { id: 2, title: "怎麼找到門牌？" },
  { id: 3, title: "認識門牌的結尾" },
  { id: 4, title: "假門牌長得跟真的很像" },
  { id: 5, title: "品牌名稱出現在哪裡很重要" },
  { id: 6, title: "看不到門牌怎麼辦？" },
  { id: 7, title: "信箱也是一樣的道理" },
];

const Lessons = () => {
  return (
    <>
      <LessonNav />
      <main className="min-h-screen bg-background">
        <div className="max-w-lg mx-auto px-5 py-8">
          <h1 className="text-2xl font-bold text-foreground mb-6">課程列表</h1>
          <div className="space-y-3">
            {lessonList.map((lesson) => (
              <Link
                key={lesson.id}
                to={`/lesson/${lesson.id}`}
                className="flex items-center justify-between p-4 rounded-xl border border-border bg-card hover:border-primary hover:bg-primary/5 transition-all"
              >
                <span className="flex items-center gap-3">
                  <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-primary/10 text-primary font-bold text-sm">
                    {lesson.id}
                  </span>
                  <span className="text-base font-medium text-foreground">{lesson.title}</span>
                </span>
                <ArrowRight className="w-5 h-5 text-muted-foreground" />
              </Link>
            ))}
          </div>
        </div>
      </main>
    </>
  );
};

export default Lessons;
