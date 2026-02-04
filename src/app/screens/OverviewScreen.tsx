//boiler react native screen profile
import React from 'react';
import { Pressable, Text, View } from 'react-native';
import { StyleSheet } from 'react-native-unistyles';
import { Image, ImageBackground } from 'expo-image';
import { useNavigation } from 'expo-router';

import { useCocktailsListQuery } from 'app/queries/cocktails';
import { SvgUri } from 'react-native-svg';
import Search from "../../../assets/icon/search.svg";

// Header component with title and search button
const Header: React.FC = () => {
  const { navigate } = useNavigation();

  return (
    <ImageBackground
      source={require('../../../assets/images/hero.png')}
      style={styles.backgroundImage}
    >
      <Text style={styles.title}>Bartenders Friends</Text>
      <Pressable onPress={() => navigate('search')}>
        {/*<Search />*/}
        <Text>Search</Text>
      </Pressable>
    </ImageBackground>
  );
}

interface Props {
  // Define any props you might need here
}

export const OverviewScreen: Props = () => {
  const { data, isLoading, error, refetch } = useCocktailsListQuery();
  const { navigate } = useNavigation();
  const firstCocktail = data ? data[0] : null;

  return (
    <View style={styles.container}>
     <Header/>
      <View>
        {isLoading ? <Text>Loading IMg</Text> : <Image source={firstCocktail?.imageURI} />}
      </View>
      {isLoading ? <Text>Loading...</Text> : null}
      {error ? <Text>Error loading cocktails</Text> : null}
      {!isLoading ? <Text>{firstCocktail?.name}</Text> : null}
    </View>
  );
};
// <Text>Replace IMG</Text>
// <Text> Title Cocktail </Text>
// <Text> Divider </Text>
// <Text> Divider </Text>
export const styles = StyleSheet.create((theme) => ({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
    backgroundColor: theme.colors.background, // now guaranteed
  },
  backgroundImage: {
    width: '100%',
    height: '30%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    color: theme.colors.text,
    fontSize: theme.typography.size.xl,
    fontWeight: theme.typography.weight.bold,
  },
}));
