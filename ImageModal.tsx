import React, { useState } from 'react';
import {
  Modal,
  View,
  Image,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  StyleSheet,
  ActivityIndicator,
  Dimensions,
  ImageSourcePropType,
  SafeAreaView,
} from 'react-native';
import { StatusBar } from 'expo-status-bar';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

export interface ImageModalProps {
  /** Controls modal visibility */
  visible: boolean;
  /** Image source: remote URL or local require() */
  imageSource: ImageSourcePropType | null;
  /** Callback triggered when user requests to close the modal */
  onClose: () => void;
  /** Optional caption or title for the image */
  title?: string;
  /** Optional subtitle or description */
  description?: string;
}

export const ImageModal: React.FC<ImageModalProps> = ({
  visible,
  imageSource,
  onClose,
  title,
  description,
}) => {
  const [loading, setLoading] = useState<boolean>(true);
  const [hasError, setHasError] = useState<boolean>(false);

  // Reset loading & error states when modal opens
  const handleShow = () => {
    setLoading(true);
    setHasError(false);
  };

  return (
    <Modal
      visible={visible}
      transparent={true}
      animationType="fade"
      onShow={handleShow}
      onRequestClose={onClose} // Handles Android physical back button
      statusBarTranslucent={true}
    >
      <StatusBar style="light" />

      {/* Backdrop: tapping outside the image triggers onClose */}
      <TouchableWithoutFeedback onPress={onClose}>
        <View style={styles.backdrop}>
          <SafeAreaView style={styles.safeContainer}>
            {/* Header with Title and Close Button */}
            <View style={styles.header}>
              <View style={styles.titleContainer}>
                {title ? <Text style={styles.titleText} numberOfLines={1}>{title}</Text> : null}
                {description ? <Text style={styles.descText} numberOfLines={1}>{description}</Text> : null}
              </View>

              <TouchableOpacity
                accessibilityLabel="Close image modal"
                accessibilityRole="button"
                style={styles.closeButton}
                onPress={onClose}
                hitSlop={{ top: 12, bottom: 12, left: 12, right: 12 }}
              >
                <Text style={styles.closeButtonText}>✕</Text>
              </TouchableOpacity>
            </View>

            {/* Image Preview Container */}
            <TouchableWithoutFeedback>
              <View style={styles.imageWrapper}>
                {loading && !hasError && (
                  <View style={styles.loaderContainer}>
                    <ActivityIndicator size="large" color="#ffffff" />
                  </View>
                )}

                {hasError ? (
                  <View style={styles.errorContainer}>
                    <Text style={styles.errorText}>Failed to load image</Text>
                  </View>
                ) : (
                  imageSource && (
                    <Image
                      source={imageSource}
                      style={styles.image}
                      resizeMode="contain"
                      onLoadStart={() => setLoading(true)}
                      onLoadEnd={() => setLoading(false)}
                      onError={() => {
                        setLoading(false);
                        setHasError(true);
                      }}
                    />
                  )
                )}
              </View>
            </TouchableWithoutFeedback>

            {/* Bottom helper text */}
            <View style={styles.footer}>
              <Text style={styles.footerText}>Tap outside or press ✕ to dismiss</Text>
            </View>
          </SafeAreaView>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

const styles = StyleSheet.create({
  backdrop: {
    flex: 1,
    backgroundColor: 'rgba(10, 10, 15, 0.92)', // Dark modern translucent backdrop
    justifyContent: 'center',
    alignItems: 'center',
  },
  safeContainer: {
    flex: 1,
    width: '100%',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 16,
  },
  header: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 10,
    zIndex: 10,
  },
  titleContainer: {
    flex: 1,
    marginRight: 16,
  },
  titleText: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: '700',
    letterSpacing: 0.3,
  },
  descText: {
    color: '#a0a0b0',
    fontSize: 13,
    marginTop: 2,
  },
  closeButton: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: 'rgba(255, 255, 255, 0.18)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  closeButtonText: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: '600',
    lineHeight: 20,
  },
  imageWrapper: {
    flex: 1,
    width: SCREEN_WIDTH,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: SCREEN_WIDTH * 0.92,
    height: SCREEN_HEIGHT * 0.65,
    borderRadius: 8,
  },
  loaderContainer: {
    ...StyleSheet.absoluteFill,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  errorText: {
    color: '#ff6b6b',
    fontSize: 16,
  },
  footer: {
    paddingBottom: 8,
  },
  footerText: {
    color: '#71717a',
    fontSize: 12,
  },
});

export default ImageModal;
