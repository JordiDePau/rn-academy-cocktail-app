import React from 'react';
import { FlatList, Pressable, StyleSheet,Text, View } from 'react-native';
import { useRoute } from '@react-navigation/native';
import { Image, ImageBackground } from 'expo-image';
import { useNavigation } from 'expo-router';

import { useCocktailQuery, useCocktailsListQuery } from 'app/queries/cocktails';

interface Props {
  // Define any props you might need here
}

export const DetailScreen: Props = () => {
  const route = useRoute();
  const { id } = route.params;
  console.log("Detail Screen ID:", id);
  const { data, isLoading, error, refetch } = useCocktailQuery(id);
  const cocktail = data;
  const { navigate } = useNavigation();

  return (
    <View style={styles.container}>
      <ImageBackground source={cocktail?.imageURI}>
        <Pressable onPress={() => navigate('search')}>
          <Text>Back</Text>
        </Pressable>
        {isLoading ? <Text>Loading IMG</Text> : <Text>{cocktail?.name}</Text>}
      </ImageBackground>
      <View style={styles.infoContainer}>
        <FlatList
          data={cocktail?.ingredients}
          renderItem={({ item }) => (
            <Text>
              {item.name} - {item.quantity} {item.unit}
            </Text>
          )}
        />
        <Text>{cocktail?.history}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
    flex: 1,
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  infoContainer: {
    padding: 16,
  },
});
