import { openBrowserAsync } from 'expo-web-browser';
import { Image, Text, TouchableOpacity, View } from 'react-native';
import { NewsItem, formatDate } from '../utils/rss';

interface Props {
  item: NewsItem;
}

export function NewsCard({ item }: Props) {
  return (
    <TouchableOpacity
      className="bg-white mx-4 mb-3 rounded-xl overflow-hidden shadow-sm border border-gray-100"
      activeOpacity={0.7}
      onPress={() => openBrowserAsync(item.link)}
    >
      <View className="flex-row p-3 gap-3">
        <View className="flex-1">
          <Text className="text-sm font-semibold text-gray-900 leading-5 mb-2" numberOfLines={2}>
            {item.title}
          </Text>
          <View className="flex-row items-center gap-2">
            <Text className="text-xs text-blue-500 font-medium">{item.source}</Text>
            <Text className="text-xs text-gray-400">{formatDate(item.pubDate)}</Text>
          </View>
        </View>
        {item.thumbnail ? (
          <Image
            source={{ uri: item.thumbnail }}
            className="w-20 h-16 rounded-lg bg-gray-100"
            resizeMode="cover"
          />
        ) : (
          <View className="w-20 h-16 rounded-lg bg-gray-100 items-center justify-center">
            <Text className="text-2xl">📰</Text>
          </View>
        )}
      </View>
    </TouchableOpacity>
  );
}
