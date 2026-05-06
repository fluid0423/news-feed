import { ActivityIndicator, FlatList, RefreshControl, Text, View } from 'react-native';
import { NewsCard } from '../components/NewsCard';
import { FeedCategory } from '../constants/feeds';
import { useNewsFeed } from '../hooks/useNewsFeed';

interface Props {
  category: FeedCategory;
}

export function FeedScreen({ category }: Props) {
  const { items, loading, refreshing, onRefresh } = useNewsFeed(category);

  if (loading) {
    return (
      <View className="flex-1 items-center justify-center bg-gray-50">
        <ActivityIndicator size="large" color="#3b82f6" />
        <Text className="mt-3 text-gray-400 text-sm">뉴스 불러오는 중...</Text>
      </View>
    );
  }

  if (items.length === 0) {
    return (
      <View className="flex-1 items-center justify-center bg-gray-50">
        <Text className="text-4xl mb-3">😅</Text>
        <Text className="text-gray-400">불러올 수 없어요</Text>
      </View>
    );
  }

  return (
    <FlatList
      className="flex-1 bg-gray-50"
      data={items}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => <NewsCard item={item} />}
      contentContainerStyle={{ paddingTop: 12, paddingBottom: 20 }}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} tintColor="#3b82f6" />
      }
    />
  );
}
