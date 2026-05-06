export type FeedCategory = '뉴스' | '스포츠' | '연예';

export const RSS_FEEDS: Record<FeedCategory, { title: string; url: string }[]> = {
  뉴스: [
    { title: '연합뉴스', url: 'https://www.yonhapnewstv.co.kr/browse/feed/' },
    { title: 'KBS 뉴스', url: 'https://news.kbs.co.kr/rss/rss.do?source=news' },
    { title: 'MBC 뉴스', url: 'https://imnews.imbc.com/rss/news/news_00.xml' },
  ],
  스포츠: [
    { title: '네이버 스포츠', url: 'https://sports.news.naver.com/rss/index.nhn' },
    { title: '스포츠조선', url: 'https://www.sportschosun.com/rss/feed.xml' },
    { title: 'JTBC 스포츠', url: 'https://sports.jtbc.com/rss' },
  ],
  연예: [
    { title: '네이버 연예', url: 'https://entertain.naver.com/rss' },
    { title: '스타뉴스', url: 'https://www.starnewskorea.com/rss/allArticle.xml' },
    { title: '마이데일리', url: 'https://www.mydaily.co.kr/rss/allArticle.xml' },
  ],
};

export const CATEGORIES: FeedCategory[] = ['뉴스', '스포츠', '연예'];
