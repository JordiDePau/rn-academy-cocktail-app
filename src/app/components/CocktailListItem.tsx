import React from 'react';
import { Text, View } from 'react-native';
import { Image } from 'expo-image';

type CocktailItemProps = {
  name: string;
  imageURI: string;
};

export function CocktailListItem({ name, imageURI }: CocktailItemProps) {
  return (
    <View style={{ flexDirection: 'row', alignItems: 'center', padding: 10 }}>
      <Image
        source={ imageURI }
        style={{ width: 50, height: 50, borderRadius: 25, marginRight: 10 }}
      />
      <Text style={{ fontSize: 18 }}>{name}</Text>
    </View>
  );
}