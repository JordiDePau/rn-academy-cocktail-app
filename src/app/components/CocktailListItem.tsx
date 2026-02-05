import React from 'react';
import { Text, View } from 'react-native';
import { StyleSheet } from 'react-native-unistyles';
import { Image } from 'expo-image';

import Arrow from '../../../assets/icon/arrow.svg';

type CocktailItemProps = {
  name: string;
  imageURI: string;
};

export function CocktailListItem({ name, imageURI }: CocktailItemProps) {
  return (
    <View style={styles.itemContainer}>
      <Image
        source={imageURI}
        style={styles.image}
      />
      <Text style={styles.nameText}>{name}</Text>
      <Arrow style={styles.arrow} />
    </View>
  );
}

export const styles = StyleSheet.create((theme) => ({
  itemContainer: {
    display:'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: theme.spacing.md,
    width: '100%',
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.line,
  },
  image: {
    width: 50,
    height: 50,
  },
  nameText: {
    display:'flex',
    flex: 1,
    marginLeft: theme.spacing.md,
    fontSize: theme.typography.size.lg,
    fontWeight: theme.typography.weight.medium,
    color: theme.colors.text,
  },
  arrow: {
    transform: [{ rotate: '180deg' }],
    marginLeft: 'auto',
  },
}));
