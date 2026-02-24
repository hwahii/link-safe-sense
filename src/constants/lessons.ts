export const LESSON_TITLES: Record<number, string> = {
  1: "網址是什麼？",
  2: "認識門牌的結尾",
  3: "子網域——園區與大樓",
  4: "小心「盜版門牌」",
  5: "品牌名稱要在門牌裡",
  6: "看不到門牌怎麼辦？",
  7: "電子郵件也是一樣的道理",
};

export const LESSON_SLUGS: Record<number, string> = {
  1: "1-what-is-url",
  2: "2-domain-suffixes",
  3: "3-subdomains",
  4: "4-lookalike-domains",
  5: "5-brand-in-domain",
  6: "6-shortened-urls",
  7: "7-email-addresses",
};

/** slug → lesson id 反查表 */
export const SLUG_TO_ID: Record<string, number> = Object.fromEntries(
  Object.entries(LESSON_SLUGS).map(([id, slug]) => [slug, Number(id)])
);

/** 預估閱讀時間（分鐘） */
export const LESSON_READING_TIME: Record<number, number> = {
  1: 2,
  2: 3,
  3: 3,
  4: 2,
  5: 3,
  6: 3,
  7: 2,
};

export const TOTAL_LESSONS = Object.keys(LESSON_TITLES).length;
