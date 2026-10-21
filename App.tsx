import React, { useState } from 'react';
import {
  SafeAreaView,
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  ImageSourcePropType,
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import ImageModal from './ImageModal';

interface GalleryItem {
  id: string;
  title: string;
  description: string;
  source: ImageSourcePropType;
}

const SAMPLE_IMAGES: GalleryItem[] = [
  {
    id: '1',
    title: 'Neon Cyberpunk Cityscape',
    description: 'Vibrant neon reflections in an ultra-modern skyline',
    source: {
      uri: 'https://images.unsplash.com/photo-1519501025264-65ba15a82390?q=80&w=1200&auto=format&fit=crop',
    },
  },
  {
    id: '2',
    title: 'Alpine Mist & Mountains',
    description: 'Serene morning sunrise over snowcapped ridges',
    source: {
      uri: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?q=80&w=1200&auto=format&fit=crop',
    },
  },
  {
    id: '3',
    title: 'Minimalist Architecture',
    description: 'Clean geometric curves with shadow and contrast',
    source: {
      uri: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=1200&auto=format&fit=crop',
    },
  },
];

export default function App() {
  const [selectedImage, setSelectedImage] = useState<GalleryItem | null>(null);
  const [modalVisible, setModalVisible] = useState<boolean>(false);

  const handleOpenImage = (item: GalleryItem) => {
    setSelectedImage(item);
    setModalVisible(true);
  };

  const handleCloseModal = () => {
    setModalVisible(false);
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="light" />
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.header}>
          <Text style={styles.badge}>React Native</Text>
          <Text style={styles.headerTitle}>Image Viewer Modal</Text>
          <Text style={styles.headerSubtitle}>
            Tap any thumbnail below to preview it in a lightbox modal.
          </Text>
        </View>

        <View style={styles.grid}>
          {SAMPLE_IMAGES.map((item) => (
            <TouchableOpacity
              key={item.id}
              activeOpacity={0.85}
              style={styles.card}
              onPress={() => handleOpenImage(item)}
            >
              <Image source={item.source} style={styles.thumbnail} />
              <View style={styles.cardInfo}>
                <Text style={styles.cardTitle}>{item.title}</Text>
                <Text style={styles.cardDescription} numberOfLines={2}>
                  {item.description}
                </Text>
                <Text style={styles.viewPrompt}>Tap to view full image →</Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>

      {/* Reusable Image Modal Component */}
      <ImageModal
        visible={modalVisible}
        imageSource={selectedImage ? selectedImage.source : null}
        title={selectedImage?.title}
        description={selectedImage?.description}
        onClose={handleCloseModal}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0f1117',
  },
  scrollContent: {
    padding: 20,
    paddingBottom: 40,
  },
  header: {
    marginBottom: 24,
    paddingTop: 8,
  },
  badge: {
    alignSelf: 'flex-start',
    backgroundColor: 'rgba(56, 189, 248, 0.15)',
    color: '#38bdf8',
    fontSize: 12,
    fontWeight: '700',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 6,
    textTransform: 'uppercase',
    letterSpacing: 0.8,
    marginBottom: 10,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: '800',
    color: '#ffffff',
    letterSpacing: 0.3,
  },
  headerSubtitle: {
    fontSize: 15,
    color: '#94a3b8',
    marginTop: 6,
    lineHeight: 22,
  },
  grid: {
    gap: 18,
  },
  card: {
    backgroundColor: '#1a1d27',
    borderRadius: 16,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#2d3345',
  },
  thumbnail: {
    width: '100%',
    height: 180,
    backgroundColor: '#232736',
  },
  cardInfo: {
    padding: 16,
  },
  cardTitle: {
    color: '#f8fafc',
    fontSize: 17,
    fontWeight: '700',
  },
  cardDescription: {
    color: '#94a3b8',
    fontSize: 13,
    marginTop: 4,
    lineHeight: 18,
  },
  viewPrompt: {
    color: '#38bdf8',
    fontSize: 13,
    fontWeight: '600',
    marginTop: 10,
  },
});
