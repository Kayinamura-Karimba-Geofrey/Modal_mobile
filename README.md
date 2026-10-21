# Modal_mobile

React Native & Expo image viewer modal (lightbox) component.

## Features

- 🖼️ **Full-screen Lightbox**: Dark translucent backdrop with smooth fade animation.
- ⏳ **Loading State**: Displays an `ActivityIndicator` spinner while high-res images load.
- ⚠️ **Error Handling**: Displays an error message gracefully if an image fails to load.
- 📱 **Android Back Button**: Supports hardware back button dismissal via `onRequestClose`.
- 👆 **Tap Outside to Close**: Dismisses when tapping anywhere outside the image or on the ✕ close button.
- 🏷️ **Optional Titles & Descriptions**: Add captions to your images.
- 🔄 **Compatible with Remote URLs & Local Assets**: Works with `{ uri: 'https://...' }` and `require('./assets/image.png')`.

## File Structure

- [ImageModal.tsx](file:///run/media/kayi/8CEC6424EC640B32/model_ML/ImageModal.tsx): Reusable modal component.
- [App.tsx](file:///run/media/kayi/8CEC6424EC640B32/model_ML/App.tsx): Example screen showcasing a card gallery that triggers the modal.

## Quick Usage

```tsx
import React, { useState } from 'react';
import { Button, View } from 'react-native';
import ImageModal from './ImageModal';

export default function MyScreen() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Button title="Open Image" onPress={() => setIsOpen(true)} />

      <ImageModal
        visible={isOpen}
        imageSource={{ uri: 'https://images.unsplash.com/photo-1519501025264-65ba15a82390' }}
        title="Sample Image"
        description="A preview of the city"
        onClose={() => setIsOpen(false)}
      />
    </View>
  );
}
```

## Running with Expo

If you'd like to test this immediately in an Expo environment:

```bash
# Initialize Expo in the directory (if starting fresh)
npx create-expo-app@latest .

# Start the development server
npx expo start
```
