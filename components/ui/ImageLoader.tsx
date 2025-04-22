import { Colors } from '@/constants/Colors';
import React, { useState } from 'react';
import { ActivityIndicator, Image, ImageStyle, View, ViewStyle } from 'react-native';
import { IconSymbol } from './IconSymbol';

type ImageLoaderProps = {
  imageUrl: string;
  style?: ImageStyle | ViewStyle;
};

const ImageLoader = ({ imageUrl, style }: ImageLoaderProps) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  return (
    <View>
      {loading && (
        <View style={[style as ViewStyle, $centerStyle]}>
          <ActivityIndicator size="large" color={Colors.light.tint} />
        </View>
      )}

      {error ? (
        <View style={[style as ViewStyle, $centerStyle]}>
          <IconSymbol name="bag.fill" size={100} color={Colors.light.tint} />
        </View>
      ) : (
        <Image
          source={{ uri: imageUrl }}
          style={style as ImageStyle}
          resizeMode="contain"
          onLoadEnd={() => setLoading(false)}
          onError={() => {
            setLoading(false);
            setError(true);
          }}
          onLoadStart={() => {
            setLoading(true);
            setError(false);
          }}
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
