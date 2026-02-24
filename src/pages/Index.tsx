import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Shield, BookOpen, Clock, Users, Sparkles } from "lucide-react";
import PageSEO from "@/components/PageSEO";
import Footer from "@/components/Footer";
import { LESSON_SLUGS } from "@/constants/lessons";

const Index = () => {
  const [hasHistory, setHasHistory] = useState(false);

  useEffect(() => {
    try {
      const stored = JSON.parse(localStorage.getItem("quizResult") || "null");
      setHasHistory(stored?.current != null);
    } catch {}
  }, []);

  const websiteJsonLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "學會分辨詐騙連結",
    "description": "不用懂電腦，七篇簡易教學帶你學會看懂網址門牌、分辨詐騙連結。",
    "url": "https://learnurl.hwahii.tw",
    "inLanguage": "zh-Hant",
  };

  return (
    <>
    <PageSEO
      title="學會分辨詐騙連結｜七篇簡易教學"
      description="不用懂電腦，七篇簡易教學帶你學會看懂網址門牌、分辨詐騙連結。適合所有年齡層，完全免費。"
      path="/"
      jsonLd={websiteJsonLd}
    />
    <main className="min-h-screen bg-background">
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-b from-primary/8 via-primary/4 to-background pt-12 pb-8 sm:pt-20 sm:pb-12">
        <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
          <div className="absolute -top-24 -right-24 w-64 h-64 rounded-full bg-primary/5 blur-3xl" />
          <div className="absolute -bottom-16 -left-16 w-48 h-48 rounded-full bg-primary/5 blur-3xl" />
        </div>

        <div className="relative max-w-lg mx-auto px-5">
          <div className="text-center mb-8 animate-fade-in">
            <div className="inline-flex items-center justify-center w-20 h-20 sm:w-24 sm:h-24 rounded-2xl bg-gradient-to-br from-primary/15 to-primary/30 mb-6 shadow-md ring-1 ring-primary/10">
              <Shield className="w-10 h-10 sm:w-12 sm:h-12 text-primary" />
            </div>
            <h1 className="text-3xl sm:text-4xl font-bold leading-tight mb-4">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-emerald-500">馬上看穿！</span>
              <br />
              <span className="text-foreground">簡單學會分辨詐騙連結</span>
            </h1>
            <div className="flex items-center justify-center gap-4 text-sm text-muted-foreground mt-4 animate-fade-in" style={{ animationDelay: "0.05s", animationFillMode: "both" }}>
              <span className="inline-flex items-center gap-1"><BookOpen className="w-3.5 h-3.5" />七篇教學</span>
              <span className="text-border">|</span>
              <span className="inline-flex items-center gap-1"><Sparkles className="w-3.5 h-3.5" />完全免費</span>
              <span className="text-border">|</span>
              <span className="inline-flex items-center gap-1"><Users className="w-3.5 h-3.5" />適合所有人</span>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-lg mx-auto px-5 py-8 sm:py-10">
        <div className="space-y-5 text-foreground text-lg leading-[1.9]">
          <p className="animate-fade-in" style={{ animationDelay: "0.1s", animationFillMode: "both" }}>
            網路上的連結，有些是真的，有些是詐騙。表面上很難分辨——但其實有簡單的方法。
          </p>
          <p className="animate-fade-in" style={{ animationDelay: "0.2s", animationFillMode: "both" }}>
            只要學會看懂網址裡的<strong>「門牌」</strong>，就能判斷一個連結安不安全。
          </p>
          <p className="animate-fade-in" style={{ animationDelay: "0.3s", animationFillMode: "both" }}>
            不用懂電腦，不用安裝任何東西。七篇小知識，再也不怕誤點詐騙連結。先測測看你目前的判斷力，或直接開始學習：
          </p>
        </div>

        <div className="mt-10 space-y-4 animate-fade-in" style={{ animationDelay: "0.45s", animationFillMode: "both" }}>
          <Link to="/quiz" className="block">
            <Button size="lg" className="w-full text-lg py-6 rounded-xl font-bold hover-scale shadow-md shadow-primary/20">
              {hasHistory ? "再測一次" : "開始測驗"}
            </Button>
          </Link>
          <Link to={`/lesson/${LESSON_SLUGS[1]}`} className="block">
            <Button size="lg" variant="outline" className="w-full text-lg py-6 rounded-xl font-bold border-2 hover-scale">
              <BookOpen className="w-5 h-5 mr-2" />
              直接開始學習
            </Button>
          </Link>
        </div>
      </div>
    </main>
    <Footer />
    </>
  );
};

export default Index;
