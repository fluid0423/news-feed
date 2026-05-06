import { useCallback, useEffect, useState } from 'react';
import { RSS_FEEDS, FeedCategory } from '../constants/feeds';
import { fetchFeed, NewsItem } from '../utils/rss';

export function useNewsFeed(category: FeedCategory) {
  const [items, setItems] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const load = useCallback(async () => {
    const feeds = RSS_FEEDS[category];
    const results = await Promise.all(
      feeds.map((f) => fetchFeed(f.url, f.title))
    );
    const merged = results
      .flat()
      .sort((a, b) => new Date(b.pubDate).getTime() - new Date(a.pubDate).getTime());
    setItems(merged);
  }, [category]);

  useEffect(() => {
    setLoading(true);
    load().finally(() => setLoading(false));
  }, [load]);

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    await load();
    setRefreshing(false);
  }, [load]);

  return { items, loading, refreshing, onRefresh };
}
