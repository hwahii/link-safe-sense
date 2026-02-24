import { useState, useEffect } from "react";
import { LESSON_TITLES } from "@/constants/lessons";
import { useParams, Link } from "react-router-dom";
import LessonNav from "@/components/LessonNav";
import UrlBreakdown from "@/components/UrlBreakdown";
import LineChat from "@/components/LineChat";
import KeyTakeaway from "@/components/KeyTakeaway";
import PracticeSection from "@/components/PracticeSection";
import SmsMessage from "@/components/SmsMessage";
import EmailCard from "@/components/EmailCard";
import LessonQuiz from "@/components/LessonQuiz";
import { Collapsible, CollapsibleTrigger, CollapsibleContent } from "@/components/ui/collapsible";
import { Button } from "@/components/ui/button";
import { ArrowRight, ChevronRight, Lock } from "lucide-react";

const Lesson = () => {
  const { id } = useParams<{ id: string }>();
  const lessonId = parseInt(id || "1");
  const [quizDone, setQuizDone] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
    setQuizDone(false);
  }, [lessonId]);

  const nextLesson = lessonId < 7 ? `/lesson/${lessonId + 1}` : null;

  const renderContent = () => {
    switch (lessonId) {
      case 1:
        return <Lesson1 onQuizDone={() => setQuizDone(true)} />;
      case 2:
        return <Lesson2 onQuizDone={() => setQuizDone(true)} />;
      case 3:
        return <Lesson3 onQuizDone={() => setQuizDone(true)} />;
      case 4:
        return <Lesson4 onQuizDone={() => setQuizDone(true)} />;
      case 5:
        return <Lesson5 onQuizDone={() => setQuizDone(true)} />;
      case 6:
        return <Lesson6 onQuizDone={() => setQuizDone(true)} />;
      case 7:
        return <Lesson7 onQuizDone={() => setQuizDone(true)} />;
      default:
        return <p>找不到這篇課程</p>;
    }
  };

  const titles = LESSON_TITLES;

  return (
    <>
      <LessonNav />
      <main className="min-h-screen bg-background">
        <div className="max-w-lg mx-auto px-5 py-8">
          <h1 className="text-2xl sm:text-3xl font-bold text-foreground mb-2">
            第 {lessonId} 篇：{titles[lessonId]}
          </h1>
          <div className="h-1 w-16 bg-primary rounded-full mb-8" />

          {renderContent()}

          {nextLesson && (
            <div className="mt-12 text-center">
              {!quizDone && (
                <p className="text-sm text-muted-foreground mb-4">完成上方練習後即可前往下一篇</p>
              )}
              <Link to={nextLesson} onClick={(e) => !quizDone && e.preventDefault()}>
                <Button
                  size="lg"
                  className="text-lg py-6 px-8 rounded-xl font-bold"
                  disabled={!quizDone}
                >
                  {quizDone ? (
                    <>下一篇 <ArrowRight className="w-5 h-5 ml-2" /></>
                  ) : (
                    <><Lock className="w-4 h-4 mr-2" /> 下一篇</>
                  )}
                </Button>
              </Link>
            </div>
          )}
          {!nextLesson && quizDone && (
            <div className="mt-8 text-center space-y-4">
              <p className="text-lg font-bold text-primary">🎉 恭喜你完成所有課程！</p>
              <Link to="/quiz">
                <Button size="lg" className="text-lg py-6 px-8 rounded-xl font-bold">
                  再做一次測驗
                </Button>
              </Link>
            </div>
          )}
          {!nextLesson && !quizDone && (
            <div className="mt-8 text-center space-y-2">
              <p className="text-sm text-muted-foreground">完成上方練習後即可結束課程</p>
              <Button size="lg" className="text-lg py-6 px-8 rounded-xl font-bold" disabled>
                <Lock className="w-4 h-4 mr-2" /> 完成課程
              </Button>
            </div>
          )}
        </div>
      </main>
    </>
  );
};

// ====== Lesson 1 ======
const Lesson1 = ({ onQuizDone }: { onQuizDone: () => void }) => (
  <div>
    <p>你每天都在用網址，但你可能從來沒有仔細看過它。</p>
    <p className="mt-4">
      網址就是網站的地址，就像每一間房子都有門牌一樣。你去銀行辦事，會先確認自己走進的是不是真的銀行。在網路上也是一樣，只是你要確認的不是招牌，而是網址。
    </p>
    <p className="mt-4">一個網址長這樣：</p>

    <div className="my-4 rounded-xl border border-border bg-muted/50 px-4 py-3 font-mono text-base sm:text-lg overflow-x-auto">
      https://<span className="text-safe font-bold">www.shopee.tw</span>/order/detail
    </div>

    <p className="mt-4">可以簡單拆成下面幾個部分：</p>

    <div className="my-4 space-y-3">
      <div className="rounded-xl border border-border bg-muted/30 px-4 py-3">
        <p className="font-mono text-base text-muted-foreground">https://</p>
        <p className="text-sm text-muted-foreground mt-1">通訊方式，先不用管</p>
      </div>
      <div className="rounded-xl border-2 border-safe/40 bg-safe/5 px-4 py-3">
        <p className="font-mono text-base text-safe font-bold">www.shopee.tw</p>
        <p className="text-sm text-foreground mt-1">門牌：這個網站是誰的</p>
      </div>
      <div className="rounded-xl border border-border bg-muted/30 px-4 py-3">
        <p className="font-mono text-base text-muted-foreground">/order/detail</p>
        <p className="text-sm text-muted-foreground mt-1">房間號碼：網站裡的哪一頁</p>
      </div>
    </div>

    <KeyTakeaway>
      判斷一個網址安不安全，最重要的就是看那個「門牌」。
    </KeyTakeaway>

    <PracticeSection>
      <SmsMessage
        sender="+886-912-345-678"
        content="您的包裹因地址不完整無法配送，請點此確認：https://tw-post-service.com/tracking?id=889712"
      />
      <LessonQuiz
        question="這則簡訊裡的網址，「門牌」是哪一段？"
        options={[
          { label: "A", text: "tw-post-service.com" },
          { label: "B", text: "/tracking?id=889712" },
          { label: "C", text: "我不確定" },
        ]}
        correctAnswer="A"
        correctFeedback="tw-post-service.com 是門牌，/tracking?id=889712 是房間號碼。你已經學會分辨了！但這個門牌是不是真的郵局？我們下一篇會教你怎麼判斷。"
        wrongFeedback="沒關係！tw-post-service.com 是門牌，/tracking?id=889712 是房間號碼。你已經學會分辨了！但這個門牌是不是真的郵局？我們下一篇會教你怎麼判斷。"
        onComplete={onQuizDone}
      />
    </PracticeSection>
  </div>
);

// ====== Lesson 2 (認識門牌的結尾) ======
const Lesson2 = ({ onQuizDone }: { onQuizDone: () => void }) => (
  <div>
    <p>上一篇你學會了找「門牌」。這一篇來看門牌的「結尾」——它能告訴你這個網站是什麼類型的機構。</p>

    <p className="mt-6 font-bold text-lg">🏛️ 機構結尾</p>
    <p className="mt-2">門牌的結尾代表網站的類型，有些不是想註冊就能註冊的：</p>

    <div className="my-4 space-y-2">
      {[
        [".gov", "政府機關", "必須是政府單位才能申請，門檻最高"],
        [".org", "組織", "原本是給非營利組織使用，但現在任何人都能註冊"],
        [".com", "商業", "最常見的後綴，任何人都能註冊"],
      ].map(([suffix, type, desc]) => (
        <div key={suffix} className="px-4 py-3 rounded-xl bg-muted/30 border border-border">
          <div className="flex items-center gap-3">
            <span className="font-mono font-bold text-foreground">{suffix}</span>
            <span className="text-sm px-2 py-0.5 rounded-full bg-primary/10 text-primary font-medium">{type}</span>
          </div>
          <p className="text-sm text-muted-foreground mt-1">{desc}</p>
        </div>
      ))}
    </div>

    <p className="mt-6 font-bold text-lg">🌏 國家結尾</p>
    <p className="mt-2">
      門牌結尾還可以加上國家代碼，代表這個網站在哪個國家註冊。台灣的國家代碼是 <code className="text-primary bg-primary/10 px-1.5 py-0.5 rounded">.tw</code>。
    </p>
    <p className="mt-2">跟機構結尾組合起來，就變成：</p>

    <div className="my-4 space-y-2">
      {[
        [".com.tw", "台灣的公司", "需要有台灣的公司登記才能申請"],
        [".gov.tw", "台灣的政府機關", "只有台灣政府單位能使用"],
        [".org.tw", "台灣的組織", "需要在台灣有立案登記的組織"],
      ].map(([suffix, type, desc]) => (
        <div key={suffix} className="px-4 py-3 rounded-xl bg-safe/5 border-2 border-safe/30">
          <div className="flex items-center gap-3">
            <span className="font-mono font-bold text-safe">{suffix}</span>
            <span className="text-sm px-2 py-0.5 rounded-full bg-safe/10 text-safe font-medium">{type}</span>
          </div>
          <p className="text-sm text-foreground mt-1">{desc}</p>
        </div>
      ))}
    </div>

    <p className="mt-4">
      像 <code className="text-safe bg-safe/10 px-1.5 py-0.5 rounded">.com.tw</code>、<code className="text-safe bg-safe/10 px-1.5 py-0.5 rounded">.gov.tw</code>、<code className="text-safe bg-safe/10 px-1.5 py-0.5 rounded">.org.tw</code> 這樣的組合結尾，需要提供公司登記或機關證明才能申請，所以可信度比較高。
    </p>
    <p className="mt-3 text-sm text-muted-foreground">
      注意：單獨的 <code className="text-primary bg-primary/10 px-1.5 py-0.5 rounded">.tw</code> 不需要這些審核，任何人都能向網域商購買，所以不能光看到 .tw 就覺得安全。
    </p>

    <p className="mt-4">但有些結尾非常便宜，任何人都能隨手註冊：</p>

    <div className="my-4 grid grid-cols-2 gap-2">
      {[".xyz", ".top", ".click", ".info"].map((suffix) => (
        <div key={suffix} className="flex items-center justify-center px-4 py-2 rounded-xl bg-danger/10 border border-danger/20">
          <span className="font-mono font-bold text-danger">{suffix}</span>
        </div>
      ))}
    </div>
    <p className="text-sm text-muted-foreground -mt-2 mb-4">這些結尾便宜又不需要審核，詐騙網站很愛用。</p>

    <KeyTakeaway
      action={<>看到 <span className="font-mono font-semibold text-foreground">.com.tw</span> 或 <span className="font-mono font-semibold text-foreground">.gov.tw</span> 結尾，可信度較高；看到 <span className="font-mono font-semibold text-foreground">.top</span>、<span className="font-mono font-semibold text-foreground">.xyz</span> 這類結尾，要提高警覺。</>}
    >
      台灣的正規機構會使用有審核機制的結尾，不會用這些便宜的門牌。
    </KeyTakeaway>

    <PracticeSection>
      <EmailCard
        sender="service@taiwanbank.top"
        subject="您的帳戶出現異常登入，請立即驗證"
        content="請點擊以下連結確認您的身份：https://www.taiwanbank.top/verify"
      />
      <LessonQuiz
        question="這封信可信嗎？"
        options={[
          { label: "A", text: "可信，因為上面寫了 taiwanbank" },
          { label: "B", text: "不可信，因為結尾是 .top" },
        ]}
        correctAnswer="B"
        correctFeedback=".top 是任何人都能便宜註冊的網域後綴。正規的台灣銀行會使用 .com.tw，不會用 .top。"
        wrongFeedback="沒關係！.top 是任何人都能便宜註冊的網域後綴。正規的台灣銀行會使用 .com.tw，不會用 .top。"
        onComplete={onQuizDone}
      />
    </PracticeSection>
  </div>
);

// ====== Lesson 3 (子網域：園區與大樓) ======
const Lesson3 = ({ onQuizDone }: { onQuizDone: () => void }) => (
  <div>
    <p>上一篇我們學到網址的結尾，這篇要來認識網址的「開頭」。</p>

    <p className="mt-4">事實上，前面提到的門牌，其實可以想成「一整個園區的門牌」，而這個園區當中，可以不只包含一棟大樓。</p>

    <p className="mt-4">概念像是這樣：</p>

    <div className="my-5 space-y-3 text-sm">
      <div className="flex items-start gap-3 p-3 rounded-lg bg-muted/50">
        <span className="text-lg">🌍</span>
        <div><span className="font-bold">土地（網域）</span>＝園區的地址，例如 <code className="font-mono bg-muted px-1.5 py-0.5 rounded text-safe">google.com</code>。這塊地的主人就是 Google。</div>
      </div>
      <div className="flex items-start gap-3 p-3 rounded-lg bg-muted/50">
        <span className="text-lg">🏢</span>
        <div>
          <span className="font-bold">大樓（子網域）</span>＝園區裡的獨立建築，同一塊土地上可以有好幾棟：
          <ul className="mt-2 space-y-1 list-disc list-inside text-muted-foreground">
            <li><code className="font-mono bg-muted px-1.5 py-0.5 rounded">mail.google.com</code> → Gmail（郵件大樓）</li>
            <li><code className="font-mono bg-muted px-1.5 py-0.5 rounded">maps.google.com</code> → Google Maps（地圖大樓）</li>
            <li><code className="font-mono bg-muted px-1.5 py-0.5 rounded">drive.google.com</code> → Google Drive（雲端硬碟大樓）</li>
          </ul>
        </div>
      </div>
      <div className="flex items-start gap-3 p-3 rounded-lg bg-muted/50">
        <span className="text-lg">🚪</span>
        <div><span className="font-bold">房間（路徑）</span>＝大樓裡的房間，例如 <code className="font-mono bg-muted px-1.5 py-0.5 rounded">mail.google.com/mail/#inbox</code> 就是郵件大樓裡的「收件匣」。</div>
      </div>
    </div>

    <p>用這個概念來看一個正常的網址：</p>

    <UrlBreakdown
      parts={[
        { text: "https://", type: "neutral" },
        { text: "mail.", type: "neutral", label: "大樓", sublabel: "（子網域）" },
        { text: "google.com", type: "safe", label: "土地", sublabel: "（網域）" },
        { text: "/mail/#inbox", type: "neutral", label: "房間", sublabel: "（路徑）" },
      ]}
    />

    <p className="mt-4">不管大樓叫什麼名字，只要土地是 <code className="font-mono bg-muted px-1.5 py-0.5 rounded text-safe">google.com</code>，就代表這塊地屬於 Google ✅</p>

    <h3 className="text-lg font-bold mt-8 mb-2">⚠️ 詐騙怎麼利用這個結構？</h3>
    <p>詐騙會自己建立一個園區，然後把大樓取名成知名品牌的名字，讓你以為是正牌的：</p>

    <UrlBreakdown
      parts={[
        { text: "https://", type: "neutral" },
        { text: "shopee.tw.", type: "danger", label: "假大樓", sublabel: "（裝成蝦皮）" },
        { text: "order-check.net", type: "danger", label: "真正的土地主人" },
        { text: "/detail", type: "neutral" },
      ]}
    />

    <p className="mt-4">看起來有「shopee.tw」的字樣，但它只是大樓名稱。真正的土地主人是 <code className="font-mono bg-muted px-1.5 py-0.5 rounded text-danger">order-check.net</code> ——跟蝦皮一點關係都沒有。</p>

    <KeyTakeaway action={<>判斷方式：用上一篇學到的方法，先找到網址結尾的土地主人是誰，不要被前面的大樓名稱欺騙。</>}>
      大樓可以隨便取名，但土地的主人才是關鍵。看網址時，永遠先確認土地（網域）是誰的。
    </KeyTakeaway>

    <PracticeSection>
      <LineChat
        name="媽媽"
        messages={[
          { sender: "other", text: "你看這個是不是蝦皮的活動？ https://shopee.tw.special-sale.net/event" },
        ]}
      />
      <LessonQuiz
        question="這個網址的土地主人是誰？"
        options={[
          { label: "A", text: "shopee.tw（蝦皮）" },
          { label: "B", text: "special-sale.net" },
        ]}
        correctAnswer="B"
        correctFeedback="沒錯！shopee.tw 只是大樓名稱（子網域），真正的土地是 special-sale.net。這不是蝦皮的網站。"
        wrongFeedback="注意看土地（網域）！shopee.tw 只是大樓名稱（子網域），真正的土地是 special-sale.net。這不是蝦皮的網站。"
        onComplete={onQuizDone}
      />
    </PracticeSection>
  </div>
);

// ====== Lesson 4 ======
const Lesson4 = ({ onQuizDone }: { onQuizDone: () => void }) => (
  <div>
    <p>詐騙不只會用假開頭、假結尾，還會在品牌名稱上動手腳。常見的手法有：</p>

    <div className="my-6 space-y-4">
      <div>
        <p className="font-medium mb-2">多一個字母：</p>
        <div className="grid grid-cols-2 gap-2">
          <div className="px-4 py-2 rounded-xl bg-danger/10 border border-danger/20 font-mono">
            <span className="text-danger">gooogle</span>.com ❌
            <br /><span className="text-sm text-muted-foreground">（三個 o）</span>
          </div>
          <div className="px-4 py-2 rounded-xl bg-safe/10 border border-safe/20 font-mono">
            <span className="text-safe">google</span>.com ✅
            <br /><span className="text-sm text-muted-foreground">（兩個 o）</span>
          </div>
        </div>
      </div>

      <div>
        <p className="font-medium mb-2">少一個字母：</p>
        <div className="grid grid-cols-2 gap-2">
          <div className="px-4 py-2 rounded-xl bg-danger/10 border border-danger/20 font-mono">
            <span className="text-danger">shope</span>.tw ❌
          </div>
          <div className="px-4 py-2 rounded-xl bg-safe/10 border border-safe/20 font-mono">
            <span className="text-safe">shopee</span>.tw ✅
          </div>
        </div>
      </div>

      <div>
        <p className="font-medium mb-2">用長得像的字元替換：</p>
        <div className="space-y-2">
          <div className="px-4 py-2 rounded-xl bg-danger/10 border border-danger/20 font-mono text-danger">
            go<strong>0</strong>gle.com ❌
            <br /><span className="text-sm text-muted-foreground">（數字 0 代替字母 O）</span>
          </div>
          <div className="px-4 py-2 rounded-xl bg-danger/10 border border-danger/20 font-mono text-danger">
            l<strong>1</strong>ne.me ❌
            <br /><span className="text-sm text-muted-foreground">（數字 1 代替字母 l）</span>
          </div>
          <div className="px-4 py-2 rounded-xl bg-danger/10 border border-danger/20 font-mono text-danger">
            <strong>rn</strong>omo.com ❌
            <br /><span className="text-sm text-muted-foreground">（rn 看起來像 m）</span>
          </div>
        </div>
      </div>

      <div>
        <p className="font-medium mb-2">相鄰字母對調：</p>
        <div className="grid grid-cols-2 gap-2">
          <div className="px-4 py-2 rounded-xl bg-danger/10 border border-danger/20 font-mono text-danger">
            googel.com ❌
          </div>
          <div className="px-4 py-2 rounded-xl bg-safe/10 border border-safe/20 font-mono text-safe">
            google.com ✅
          </div>
        </div>
      </div>
    </div>

    <KeyTakeaway>
      這些差異在手機螢幕上特別難發現。看到品牌名稱的時候，值得多花兩秒鐘確認。
    </KeyTakeaway>

    <PracticeSection>
      <LineChat
        name="同事 小陳"
        messages={[
          { sender: "other", text: "公司要填這個表單 https://docs.goog1e.com/forms/d/e/xxxx" },
        ]}
      />
      <LessonQuiz
        question="這個網址有什麼問題？"
        options={[
          { label: "A", text: "沒有問題，是 Google 的表單" },
          { label: "B", text: "google 的 l 被換成了數字 1" },
        ]}
        correctAnswer="B"
        correctFeedback="goog1e.com 不是 google.com。字母 l 和數字 1 在手機上看起來幾乎一樣。這不是 Google 的網站。"
        wrongFeedback="沒關係！goog1e.com 不是 google.com。字母 l 和數字 1 在手機上看起來幾乎一樣。這不是 Google 的網站。"
        onComplete={onQuizDone}
      />
    </PracticeSection>
  </div>
);

// ====== Lesson 5 ======
const Lesson5 = ({ onQuizDone }: { onQuizDone: () => void }) => (
  <div>
    <p>兩個網址都有「shopee」，但只有一個是蝦皮的網站。我們來看看下面這個題目：</p>

    <LessonQuiz
      question="哪一個是蝦皮的網站？"
      options={[
        { label: "A", text: "https://shopee.tw/sale/shoes" },
        { label: "B", text: "https://cheap-deal.net/shopee/sale" },
      ]}
      correctAnswer="A"
      correctFeedback="沒錯！我們來看看為什麼。"
      wrongFeedback="不對喔！我們來看看為什麼。"
    />

    <p className="mt-4">把門牌標示出來，你就看得出差別了：</p>

    <div className="my-4">
      <p className="font-medium mb-2">A.</p>
      <UrlBreakdown
        parts={[
          { text: "https://", type: "neutral" },
          { text: "shopee.tw", type: "safe", label: "門牌", sublabel: "（蝦皮）" },
          { text: "/sale/shoes", type: "neutral" },
        ]}
      />
    </div>

    <div className="my-4">
      <p className="font-medium mb-2">B.</p>
      <UrlBreakdown
        parts={[
          { text: "https://", type: "neutral" },
          { text: "cheap-deal.net", type: "danger", label: "門牌", sublabel: "（不明網站）" },
          { text: "/shopee/sale", type: "neutral", label: "只是路徑" },
        ]}
      />
    </div>

    <p>雖然兩個都有「shopee」，但意義完全不同。</p>
    <p className="mt-3">A 的門牌是 <span className="text-safe font-bold">shopee.tw</span>，這是蝦皮的網站。</p>
    <p className="mt-3">B 的門牌是 <span className="text-danger font-bold">cheap-deal.net</span>，這是不明網站。</p>
    <p className="mt-4">在門牌後面的第一個 <code className="font-mono bg-muted px-1.5 py-0.5 rounded">/</code> 之後的文字，都是「頁面路徑」，你可以想成大樓裡的樓層、房間。而這些樓層房間的名稱完全都是網站主人可以自己命名的。</p>
    <p className="mt-3">所以 B 選項的「shopee」出現在斜線後面，並不能代表「這是蝦皮正牌網站」，要注意囉！</p>

    <KeyTakeaway>
      品牌名稱出現在門牌裡才算數。出現在路徑（房間）裡的不代表任何東西，任何人都能取。
    </KeyTakeaway>

    <PracticeSection>
      <SmsMessage
        sender="0900-123-456"
        content="蝦皮購物通知：您的包裹出現異常，請確認：https://parcel-check.net/shopee/order/status"
      />
      <LessonQuiz
        question="這是蝦皮的網站嗎？"
        options={[
          { label: "A", text: "是，因為網址裡有 shopee" },
          { label: "B", text: "不是，shopee 只出現在路徑裡" },
        ]}
        correctAnswer="B"
        correctFeedback="門牌是 parcel-check.net，跟蝦皮沒有關係。shopee 只是路徑裡的房間名稱，任何人都能取。"
        wrongFeedback="沒關係！門牌是 parcel-check.net，跟蝦皮沒有關係。shopee 只是路徑裡的房間名稱，任何人都能取。"
        onComplete={onQuizDone}
      />
    </PracticeSection>
  </div>
);

// ====== Lesson 6 ======
const Lesson6 = ({ onQuizDone }: { onQuizDone: () => void }) => (
  <div>
    <p>有時候你收到的連結長這樣：</p>

    <div className="my-4 space-y-2">
      <div className="px-4 py-2 rounded-xl bg-muted font-mono text-base">https://bit.ly/3OxxiZi</div>
      <div className="px-4 py-2 rounded-xl bg-muted font-mono text-base">https://reurl.cc/5xKqWz</div>
    </div>

    <p>這種叫做「縮網址」，它把原本的網址藏起來了，你完全看不出它會帶你去哪裡。</p>
    <p className="mt-4">
      縮網址本身不是壞東西，很多人會用它來縮短太長的連結。但問題是你沒辦法判斷它背後是什麼。
    </p>
    <p className="mt-4">所以不管是誰傳給你的，規則就一個：</p>
    <p className="mt-3 font-bold text-lg">看不到門牌，就不要點。自己去打開你知道的 app 或網站找。</p>
    <p className="mt-4">朋友說某個東西很便宜？打開那個購物 app 自己搜。銀行通知你有問題？打開銀行 app 自己查。不要從別人給你的連結進去。</p>

    <KeyTakeaway>
      縮網址會把門牌藏起來，讓你無法判斷安全性。遇到縮網址，不要點，自己去官方 app 或網站查。
    </KeyTakeaway>

    <Collapsible>
      <CollapsibleTrigger className="flex items-center gap-2 mt-4 text-sm text-muted-foreground hover:text-foreground transition-colors cursor-pointer">
        <ChevronRight className="h-4 w-4 transition-transform duration-200 [[data-state=open]>&]:rotate-90" />
        進階技巧：用 AI 工具幫你看門牌
      </CollapsibleTrigger>
      <CollapsibleContent>
        <div className="mt-2 ml-6 p-4 rounded-lg bg-muted/50 border border-border text-sm space-y-3">
          <p>如果你真的很想知道縮網址背後是什麼，可以把網址貼給 <strong>ChatGPT</strong> 或 <strong>Claude</strong> 這類 AI 工具，請它幫你展開。</p>
          <p>你可以直接複製這段話去問：</p>
          <div className="relative group">
            <div className="px-3 py-2 pr-10 rounded-md bg-background border border-border font-mono text-sm leading-relaxed">
              請幫我展開這個縮網址，告訴我它真正的網址是什麼：<br />
              <span className="text-muted-foreground">（把縮網址貼在這裡）</span>
            </div>
            <button
              type="button"
              className="absolute top-2 right-2 p-1.5 rounded-md text-muted-foreground hover:text-foreground hover:bg-muted transition-colors cursor-pointer"
              onClick={() => {
                navigator.clipboard.writeText("請幫我展開這個縮網址，告訴我它真正的網址是什麼：");
                const btn = document.getElementById("copy-prompt-btn");
                if (btn) { btn.textContent = "✓"; setTimeout(() => { btn.textContent = ""; btn.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="14" height="14" x="8" y="8" rx="2" ry="2"/><path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"/></svg>'; }, 1500); }
              }}
              id="copy-prompt-btn"
              aria-label="複製提示詞"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="14" height="14" x="8" y="8" rx="2" ry="2"/><path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"/></svg>
            </button>
          </div>
          <p>AI 沒辦法保證那個網站是安全的，但至少能讓你<strong>看到門牌</strong>，然後你就能用前面學的技巧來判斷。</p>
        </div>
      </CollapsibleContent>
    </Collapsible>

    <PracticeSection>
      <LineChat
        name="學長"
        isGroup
        groupName="大學同學群組"
        messages={[
          { sender: "other", text: "我中獎了！這個抽獎活動還在，你們也來試試 https://reurl.cc/9rXkMz" },
        ]}
      />
      <LessonQuiz
        question="你會怎麼做？"
        options={[
          { label: "A", text: "同學傳的應該沒問題，點開看看" },
          { label: "B", text: "不點，如果真的有這個活動，自己去搜尋" },
        ]}
        correctAnswer="B"
        correctFeedback="就算是認識的人傳的，你也不確定他是不是被盜帳號、或他自己也不知道這是詐騙。縮網址看不到門牌，不點，自己查。"
        wrongFeedback="沒關係！就算是認識的人傳的，你也不確定他是不是被盜帳號、或他自己也不知道這是詐騙。縮網址看不到門牌，不點，自己查。"
        onComplete={onQuizDone}
      />
    </PracticeSection>
  </div>
);

// ====== Lesson 7 ======
const Lesson7 = ({ onQuizDone }: { onQuizDone: () => void }) => (
  <div>
    <p>你學會了看網址的門牌，信箱其實用的是同一套邏輯。</p>
    <p className="mt-4">信箱地址長這樣：</p>

    <UrlBreakdown
      parts={[
        { text: "service", type: "neutral", label: "帳號名稱", sublabel: "任何人都能取" },
        { text: "   @   ", type: "neutral", label: "分隔符號" },
        { text: "cathaybk.com.tw", type: "safe", label: "門牌：跟網址一模一樣" },
      ]}
    />

    <p className="mt-4">所以你會判斷的東西全部適用：</p>

    <div className="my-4 space-y-3">
      <div className="px-4 py-3 rounded-xl bg-safe/10 border border-safe/20">
        <p className="font-mono text-sm break-all">service@<span className="text-safe font-bold">cathaybk.com.tw</span></p>
        <p className="text-sm mt-1">✅ 門牌是 cathaybk.com.tw（國泰世華）</p>
      </div>
      <div className="px-4 py-3 rounded-xl bg-danger/10 border border-danger/20">
        <p className="font-mono text-sm break-all">service@<span className="text-danger font-bold">cathaybk-alert.xyz</span></p>
        <p className="text-sm mt-1">❌ 門牌是 cathaybk-alert.xyz（不明來源）</p>
      </div>
      <div className="px-4 py-3 rounded-xl bg-danger/10 border border-danger/20">
        <p className="font-mono text-sm break-all"><span className="text-danger">cathaybk.service</span>@<span className="font-bold">gmail.com</span></p>
        <p className="text-sm mt-1">❌ 門牌是 gmail.com，前面的 cathaybk 只是帳號名稱</p>
      </div>
    </div>

    <KeyTakeaway>@ 後面才是門牌。@ 前面任何人都可以隨便取。</KeyTakeaway>

    <PracticeSection>
      <EmailCard
        sender="shopee.notification@gmail.com"
        subject="您的訂單已出貨，點此查看物流進度"
        content="親愛的顧客您好，您的訂單 #SP2026022401 已出貨，請點擊下方連結查看物流進度。"
      />
      <LessonQuiz
        question="這封信是蝦皮寄的嗎？"
        options={[
          { label: "A", text: "是，因為前面寫了 shopee.notification" },
          { label: "B", text: "不是，門牌是 gmail.com，任何人都能取這個帳號名稱" },
        ]}
        correctAnswer="B"
        correctFeedback="@ 後面才是門牌。這封信的門牌是 gmail.com，不是蝦皮的 shopee.tw。@ 前面的名稱任何人都能取，不代表任何東西。"
        wrongFeedback="沒關係！@ 後面才是門牌。這封信的門牌是 gmail.com，不是蝦皮的 shopee.tw。@ 前面的名稱任何人都能取，不代表任何東西。"
        onComplete={onQuizDone}
      />
    </PracticeSection>
  </div>
);

export default Lesson;
