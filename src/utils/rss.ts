import Parser from 'rss-parser';

export interface NewsItem {
  id: string;
  title: string;
  link: string;
  pubDate: string;
  source: string;
  thumbnail?: string;
}

const parser = new Parser({
  customFields: {
    item: [['media:thumbnail', 'mediaThumbnail'], ['media:content', 'mediaContent']],
  },
});

export async function fetchFeed(url: string, sourceName: string): Promise<NewsItem[]> {
  try {
    const feed = await parser.parseURL(url);
    return (feed.items ?? []).slice(0, 20).map((item, index) => ({
      id: `${sourceName}-${index}-${item.link ?? ''}`,
      title: item.title ?? '',
      link: item.link ?? '',
      pubDate: item.pubDate ?? item.isoDate ?? '',
      source: sourceName,
      thumbnail:
        (item as any).mediaThumbnail?.$.url ??
        (item as any).mediaContent?.$.url ??
        undefined,
    }));
  } catch {
    return [];
  }
}

export function formatDate(dateStr: string): string {
  if (!dateStr) return '';
  const date = new Date(dateStr);
  if (isNaN(date.getTime())) return '';
  const now = new Date();
  const diff = Math.floor((now.getTime() - date.getTime()) / 1000 / 60);
  if (diff < 1) return '방금 전';
  if (diff < 60) return `${diff}분 전`;
  if (diff < 1440) return `${Math.floor(diff / 60)}시간 전`;
  return `${Math.floor(diff / 1440)}일 전`;
}
