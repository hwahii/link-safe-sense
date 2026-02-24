import { Link } from "react-router-dom";
import LessonNav from "@/components/LessonNav";
import { ArrowRight } from "lucide-react";
import { LESSON_TITLES, LESSON_SLUGS } from "@/constants/lessons";
import PageSEO from "@/components/PageSEO";
import Footer from "@/components/Footer";

const lessonList = Object.entries(LESSON_TITLES).map(([id, title]) => ({
  id: Number(id),
  title,
}));

const Lessons = () => {
  return (
    <>
      <PageSEO
        title="課程列表"
        description="七篇教學，從網址基礎到電子郵件門牌，完整學會分辨詐騙連結。"
        path="/lessons"
      />
      <LessonNav />
      <main className="min-h-screen bg-background">
        <div className="max-w-lg mx-auto px-5 py-8">
          <h1 className="text-2xl font-bold text-foreground mb-6">課程列表</h1>
          <div className="space-y-3">
            {lessonList.map((lesson) => (
              <Link
                key={lesson.id}
                to={`/lesson/${LESSON_SLUGS[lesson.id]}`}
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
      <Footer />
    </>
  );
};

export default Lessons;
