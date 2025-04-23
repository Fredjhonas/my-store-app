import { Colors } from '@/constants/Colors';
import React, { useState } from 'react';
import { ActivityIndicator, Image, ImageStyle, View, ViewStyle } from 'react-native';
import { IconSymbol } from './IconSymbol';

type ImageLoaderProps = {
  imageUrl: string;
  style?: ImageStyle | ViewStyle;
};

const ImageLoader = ({ imageUrl, style = {} }: ImageLoaderProps) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const handleLoad = () => {
    setLoading(false);
    setError(false);
  };

  const handleError = () => {
    setLoading(false);
    setError(true);
  };

  if (!imageUrl) {
    return (
      <View style={[$centerStyle, style as ViewStyle]}>
        <IconSymbol name="bag.fill" size={100} color={Colors.light.tint} />
      </View>
    );
  }

  return (
    <View>
      {loading && !error && (
        <View style={[$centerStyle, style as ViewStyle]}>
          <ActivityIndicator size="large" color={Colors.light.tint} />
        </View>
      )}

      {error ? (
        <View style={[$centerStyle, style as ViewStyle]}>
          <IconSymbol name="bag.fill" size={100} color={Colors.light.tint} />
        </View>
      ) : (
        <Image
          source={{ uri: imageUrl }}
          style={style as ImageStyle}
          resizeMode="contain"
          onLoad={handleLoad}
          onError={handleError}
          accessibilityLabel="Loaded image"
          accessibilityRole="image"
        />
      )}
    </View>
  );
};

export default ImageLoader;

const $centerStyle: ViewStyle = {
  justifyContent: 'center',
  alignItems: 'center',
};
