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
            快速學會<br />分辨詐騙連結
          </h1>
        </div>

        <div className="space-y-5 text-foreground text-lg leading-[1.9]">
          <p>
            網路上的連結，有些是真的，有些是詐騙。表面上很難分辨——但其實有簡單的方法。
          </p>
          <p>
            只要學會看懂網址裡的<strong>「門牌」</strong>，就能判斷一個連結安不安全。
          </p>
          <p>
            不用懂電腦，不用安裝任何東西。七篇小知識，再也不怕誤點詐騙連結。
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
