import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Shield, BookOpen } from "lucide-react";

const Index = () => {
  return (
    <main className="min-h-screen bg-background">
      <div className="max-w-lg mx-auto px-5 py-12 sm:py-20">
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-6">
            <Shield className="w-8 h-8 text-primary" />
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold text-foreground leading-tight mb-6">
            你知道怎麼分辨<br />詐騙連結嗎？
          </h1>
        </div>

        <div className="space-y-5 text-foreground text-lg leading-[1.9]">
          <p>
            在網路上，每天都有人因為點了一個看起來正常的連結而被騙。不是因為他們笨，而是因為從來沒有人教過他們怎麼看。
          </p>
          <p>
            這個網站會教你一件事：<strong>怎麼用眼睛判斷一個連結能不能點。</strong>
          </p>
          <p>
            不需要任何技術背景，不需要安裝任何東西。七篇短文，每篇一分鐘，看完你就會了。
          </p>
        </div>

        <div className="mt-10 space-y-4">
          <Link to="/quiz" className="block">
            <Button size="lg" className="w-full text-lg py-6 rounded-xl font-bold">
              開始測驗
            </Button>
          </Link>
          <Link to="/lesson/1" className="block">
            <Button size="lg" variant="outline" className="w-full text-lg py-6 rounded-xl font-bold border-2">
              <BookOpen className="w-5 h-5 mr-2" />
              直接開始學習
            </Button>
          </Link>
        </div>
      </div>
    </main>
  );
};

export default Index;
