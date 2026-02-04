//boiler react native screen search
import React from 'react';
import { FlatList, Pressable, RefreshControl, StyleSheet, Text, View } from 'react-native';
import { useNavigation } from 'expo-router';

import { CocktailListItem } from 'app/components/CocktailListItem';
import { CocktailType, useCocktailsListQuery } from 'app/queries/cocktails';

interface Props {
  // Define any props you might need here
}

export const SearchScreen: Props = () => {
  const { data, isLoading, error, refetch } = useCocktailsListQuery();
  const { navigate } = useNavigation();

  return (
    <View style={styles.screen}>
      <Text style={styles.title}>Search Screen</Text>
      {isLoading ? <Text>Loading...</Text> : null}
      {error ? <Text>Error loading cocktails</Text> : null}
      {!isLoading ? (
        <FlatList
          data={data}
          renderItem={({ item }) => (
            <Pressable onPress={() => navigate('detail', { id: item.id })}>
              <CocktailListItem name={item?.name} imageURI={item?.imageURI} />
            </Pressable>
          )}
          refreshControl={<RefreshControl refreshing={isLoading} onRefresh={() => refetch()} />}
        />
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  screen  : {
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
    flex: 1,
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
});
