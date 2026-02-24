import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import LessonNav from "@/components/LessonNav";
import UrlBreakdown from "@/components/UrlBreakdown";
import LineChat from "@/components/LineChat";
import SmsMessage from "@/components/SmsMessage";
import EmailCard from "@/components/EmailCard";
import LessonQuiz from "@/components/LessonQuiz";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

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

  const titles = [
    "",
    "網址是什麼？",
    "怎麼找到門牌？",
    "認識門牌的結尾",
    "假門牌長得跟真的很像",
    "品牌名稱出現在哪裡很重要",
    "看不到門牌怎麼辦？",
    "信箱也是一樣的道理",
  ];

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

          {quizDone && nextLesson && (
            <div className="mt-8 text-center">
              <Link to={nextLesson}>
                <Button size="lg" className="text-lg py-6 px-8 rounded-xl font-bold">
                  下一篇 <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </Link>
            </div>
          )}
          {quizDone && !nextLesson && (
            <div className="mt-8 text-center space-y-4">
              <p className="text-lg font-bold text-primary">🎉 恭喜你完成所有課程！</p>
              <Link to="/quiz">
                <Button size="lg" className="text-lg py-6 px-8 rounded-xl font-bold">
                  再做一次測驗
                </Button>
              </Link>
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

    <UrlBreakdown
      parts={[
        { text: "https://", type: "neutral", label: "通訊方式，先不用管" },
        { text: "www.shopee.tw", type: "safe", label: "門牌：這個網站是誰的" },
        { text: "/order/detail", type: "neutral", label: "房間號碼：網站裡的哪一頁" },
      ]}
    />

    <p className="mt-4 font-bold text-primary">
      判斷一個網址安不安全，最重要的就是看那個「門牌」。
    </p>

    <div className="mt-8 border-t border-border pt-6">
      <p className="font-bold text-lg mb-2">🧪 情境練習</p>
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
    </div>
  </div>
);

// ====== Lesson 2 ======
const Lesson2 = ({ onQuizDone }: { onQuizDone: () => void }) => (
  <div>
    <p>門牌就是網址裡面，https:// 後面、第一個 / 前面的那一段。</p>

    <UrlBreakdown
      parts={[
        { text: "https://", type: "neutral" },
        { text: "www.shopee.tw", type: "safe", label: "← 這就是門牌" },
        { text: "/order/detail", type: "neutral" },
      ]}
    />

    <p className="mt-4">但詐騙網址會故意讓你搞混。看這個：</p>

    <UrlBreakdown
      parts={[
        { text: "https://", type: "neutral" },
        { text: "shopee.tw.", type: "danger", label: "裝飾，不是真正的主人" },
        { text: "order-check.net", type: "danger", label: "← 這才是真正的主人" },
        { text: "/detail", type: "neutral" },
      ]}
    />

    <p className="mt-4">規則很簡單：門牌看「最後一個點」的前後。</p>
    <ul className="mt-3 space-y-2">
      <li className="text-safe font-medium">• shopee.tw → 主人是 shopee，在 .tw（台灣）✅</li>
      <li className="text-danger font-medium">• shopee.tw.order-check.net → 主人是 order-check，在 .net ❌</li>
    </ul>
    <p className="mt-4 font-bold text-primary">不管前面塞了什麼，最後那一段才是真正的主人。</p>

    <div className="mt-8 border-t border-border pt-6">
      <p className="font-bold text-lg mb-2">🧪 情境練習</p>
      <LineChat
        name="媽媽"
        messages={[
          { sender: "other", text: "你看這個是不是蝦皮的活動？ https://shopee.tw.special-sale.net/event" },
        ]}
      />
      <LessonQuiz
        question="這個網址的主人是誰？"
        options={[
          { label: "A", text: "shopee.tw（蝦皮）" },
          { label: "B", text: "special-sale.net" },
        ]}
        correctAnswer="B"
        correctFeedback="看最後一個點的前後。門牌是 special-sale.net，前面的 shopee.tw 只是裝飾。這不是蝦皮的網站。"
        wrongFeedback="沒關係！看最後一個點的前後。門牌是 special-sale.net，前面的 shopee.tw 只是裝飾。這不是蝦皮的網站。"
        onComplete={onQuizDone}
      />
    </div>
  </div>
);

// ====== Lesson 3 ======
const Lesson3 = ({ onQuizDone }: { onQuizDone: () => void }) => (
  <div>
    <p>門牌的結尾叫做「網域後綴」，就像地址裡的國家或區域。常見的有：</p>

    <div className="my-4 space-y-2">
      {[
        [".com.tw", "台灣的公司"],
        [".gov.tw", "台灣的政府機關"],
        [".org.tw", "台灣的組織"],
        [".com", "國際通用"],
      ].map(([suffix, desc]) => (
        <div key={suffix} className="flex items-center gap-3 px-4 py-2 rounded-xl bg-safe/10 border border-safe/20">
          <span className="font-mono font-bold text-safe">{suffix}</span>
          <span className="text-foreground">{desc}</span>
        </div>
      ))}
    </div>

    <p>這些都是有一定門檻才能註冊的。但有些結尾非常便宜，任何人都能隨手註冊：</p>

    <div className="my-4 space-y-2">
      {[".xyz", ".top", ".click", ".info"].map((suffix) => (
        <div key={suffix} className="flex items-center gap-3 px-4 py-2 rounded-xl bg-danger/10 border border-danger/20">
          <span className="font-mono font-bold text-danger">{suffix}</span>
          <span className="text-foreground">便宜，任何人都能註冊</span>
        </div>
      ))}
    </div>

    <p className="mt-4 font-bold text-primary">重點：正規機構不會用便宜的門牌。</p>

    <div className="mt-8 border-t border-border pt-6">
      <p className="font-bold text-lg mb-2">🧪 情境練習</p>
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
    </div>
  </div>
);

// ====== Lesson 4 ======
const Lesson4 = ({ onQuizDone }: { onQuizDone: () => void }) => (
  <div>
    <p>詐騙不只會用假的結尾，還會在品牌名稱上動手腳。常見的手法有：</p>

    <div className="my-6 space-y-4">
      <div>
        <p className="font-medium mb-2">多一個字母：</p>
        <div className="flex flex-col sm:flex-row gap-2">
          <div className="px-4 py-2 rounded-xl bg-danger/10 border border-danger/20 font-mono">
            <span className="text-danger">gooogle</span>.com（三個 o）❌
          </div>
          <div className="px-4 py-2 rounded-xl bg-safe/10 border border-safe/20 font-mono">
            <span className="text-safe">google</span>.com（兩個 o）✅
          </div>
        </div>
      </div>

      <div>
        <p className="font-medium mb-2">少一個字母：</p>
        <div className="flex flex-col sm:flex-row gap-2">
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
            go<strong>0</strong>gle.com（數字 0 代替字母 O）❌
          </div>
          <div className="px-4 py-2 rounded-xl bg-danger/10 border border-danger/20 font-mono text-danger">
            l<strong>1</strong>ne.me（數字 1 代替字母 l）❌
          </div>
          <div className="px-4 py-2 rounded-xl bg-danger/10 border border-danger/20 font-mono text-danger">
            <strong>rn</strong>omo.com（rn 看起來像 m）❌
          </div>
        </div>
      </div>

      <div>
        <p className="font-medium mb-2">相鄰字母對調：</p>
        <div className="flex flex-col sm:flex-row gap-2">
          <div className="px-4 py-2 rounded-xl bg-danger/10 border border-danger/20 font-mono text-danger">
            googel.com ❌
          </div>
          <div className="px-4 py-2 rounded-xl bg-safe/10 border border-safe/20 font-mono text-safe">
            google.com ✅
          </div>
        </div>
      </div>
    </div>

    <p className="font-bold text-primary">
      這些差異在手機螢幕上特別難發現。看到品牌名稱的時候，值得多花兩秒鐘確認。
    </p>

    <div className="mt-8 border-t border-border pt-6">
      <p className="font-bold text-lg mb-2">🧪 情境練習</p>
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
    </div>
  </div>
);

// ====== Lesson 5 ======
const Lesson5 = ({ onQuizDone }: { onQuizDone: () => void }) => (
  <div>
    <p>看這兩個網址：</p>

    <div className="my-4">
      <p className="font-medium mb-2">A.</p>
      <UrlBreakdown
        parts={[
          { text: "https://", type: "neutral" },
          { text: "www.esunbank.com.tw", type: "safe", label: "門牌：玉山銀行" },
          { text: "/personal/loan", type: "neutral" },
        ]}
      />
    </div>

    <div className="my-4">
      <p className="font-medium mb-2">B.</p>
      <UrlBreakdown
        parts={[
          { text: "https://", type: "neutral" },
          { text: "secure-banking.net", type: "danger", label: "門牌：不明網站" },
          { text: "/esunbank/personal/loan", type: "neutral", label: "這只是路徑，不是門牌" },
        ]}
      />
    </div>

    <p>兩個都有「esunbank」（玉山銀行），但意義完全不同。</p>
    <p className="mt-3">A 的門牌是 <span className="text-safe font-bold">esunbank.com.tw</span>，這是玉山銀行自己的網站。</p>
    <p className="mt-3">B 的門牌是 <span className="text-danger font-bold">secure-banking.net</span>，「esunbank」出現在斜線後面，那只是頁面路徑，任何人都可以在自己的網站裡建一個叫 esunbank 的頁面。</p>

    <p className="mt-4 font-bold text-primary">
      重點：品牌名稱要出現在斜線「前面」才算數。出現在斜線「後面」的不代表任何東西。
    </p>

    <div className="mt-8 border-t border-border pt-6">
      <p className="font-bold text-lg mb-2">🧪 情境練習</p>
      <SmsMessage
        sender="+886-2-8888-6666"
        content="玉山銀行提醒您，您的信用卡帳單已逾期，請立即處理：https://alert-service.com/esunbank/billing/overdue"
      />
      <LessonQuiz
        question="這是玉山銀行的網站嗎？"
        options={[
          { label: "A", text: "是，因為網址裡有 esunbank" },
          { label: "B", text: "不是，esunbank 出現在斜線後面" },
        ]}
        correctAnswer="B"
        correctFeedback="門牌是 alert-service.com，跟玉山銀行沒有關係。esunbank 出現在斜線後面的路徑裡，那只是頁面名稱，任何人都能建。"
        wrongFeedback="沒關係！門牌是 alert-service.com，跟玉山銀行沒有關係。esunbank 出現在斜線後面的路徑裡，那只是頁面名稱，任何人都能建。"
        onComplete={onQuizDone}
      />
    </div>
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

    <div className="my-4 px-5 py-4 rounded-2xl bg-primary/10 border-2 border-primary/20">
      <p className="text-lg font-bold text-primary">看不到門牌，就不要點。自己去打開你知道的 app 或網站找。</p>
    </div>

    <p>朋友說某個東西很便宜？打開那個購物 app 自己搜。銀行通知你有問題？打開銀行 app 自己查。不要從別人給你的連結進去。</p>

    <div className="mt-8 border-t border-border pt-6">
      <p className="font-bold text-lg mb-2">🧪 情境練習</p>
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
    </div>
  </div>
);

// ====== Lesson 7 ======
const Lesson7 = ({ onQuizDone }: { onQuizDone: () => void }) => (
  <div>
    <p>你學會了看網址的門牌，信箱其實用的是同一套邏輯。</p>
    <p className="mt-4">信箱地址長這樣：</p>

    <UrlBreakdown
      parts={[
        { text: "service", type: "neutral", label: "帳號名稱，任何人都能取" },
        { text: "@", type: "neutral", label: "分隔符號" },
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

    <p className="font-bold text-primary">重點：@ 後面才是門牌。@ 前面任何人都可以隨便取。</p>

    <div className="mt-8 border-t border-border pt-6">
      <p className="font-bold text-lg mb-2">🧪 情境練習</p>
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
    </div>
  </div>
);

export default Lesson;
