import { XMLParser } from 'fast-xml-parser';

export interface NewsItem {
  id: string;
  title: string;
  link: string;
  pubDate: string;
  source: string;
  thumbnail?: string;
}

const xmlParser = new XMLParser({
  ignoreAttributes: false,
  attributeNamePrefix: '@_',
  isArray: (name) => name === 'item' || name === 'entry',
});

function extractLink(item: any): string {
  if (typeof item.link === 'string') return item.link;
  if (item.link?.['@_href']) return item.link['@_href'];
  if (Array.isArray(item.link)) {
    const alt = item.link.find((l: any) => l['@_rel'] === 'alternate' || !l['@_rel']);
    return alt?.['@_href'] ?? '';
  }
  return '';
}

function extractThumbnail(item: any): string | undefined {
  return (
    item['media:thumbnail']?.['@_url'] ??
    item['media:content']?.['@_url'] ??
    item.enclosure?.['@_url'] ??
    undefined
  );
}

export async function fetchFeed(url: string, sourceName: string): Promise<NewsItem[]> {
  try {
    const res = await fetch(url, { headers: { 'User-Agent': 'Mozilla/5.0' } });
    if (!res.ok) return [];
    const xml = await res.text();
    const parsed = xmlParser.parse(xml);

    const channel = parsed?.rss?.channel ?? parsed?.feed;
    if (!channel) return [];

    const rawItems: any[] = channel.item ?? channel.entry ?? [];

    return rawItems.slice(0, 20).map((item, index) => ({
      id: `${sourceName}-${index}-${extractLink(item)}`,
      title: typeof item.title === 'string' ? item.title : item.title?.['#text'] ?? '',
      link: extractLink(item),
      pubDate: item.pubDate ?? item.updated ?? item.published ?? '',
      source: sourceName,
      thumbnail: extractThumbnail(item),
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
