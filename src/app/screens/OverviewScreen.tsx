//boiler react native screen profile
import React from 'react';
import { Pressable, Text, View } from 'react-native';
import { StyleSheet } from 'react-native-unistyles';
import { Image, ImageBackground } from 'expo-image';
import { useNavigation } from 'expo-router';

import { useCocktailsListQuery } from 'app/queries/cocktails';

import Search from '../../../assets/icon/search.svg';

// Header component with title and search button
const Header: React.FC = () => {
  const { navigate } = useNavigation();

  return (
    <ImageBackground
      source={require('../../../assets/images/hero.png')}
      style={styles.backgroundImage}
    >
      <Text style={styles.title}>Bartenders Friends</Text>
      <Pressable
        onPress={() => navigate('search')}
        hitSlop={10}
        style={({ pressed }) => [
          styles.wrap,
          { width: 52, height: 52, opacity: pressed ? 0.85 : 1 },
        ]}
      >
        <View style={[styles.outer, { width: 52, height: 52 }]}>
          <View style={[styles.inner, { width: 52 * 0.78, height: 52 * 0.78 }]}>
            <Search style={styles.searchIcon}/>
          </View>
        </View>
      </Pressable>
    </ImageBackground>
  );
};

interface Props {
  // Define any props you might need here
}

export const OverviewScreen: Props = () => {
  const { data, isLoading, error, refetch } = useCocktailsListQuery();
  const { navigate } = useNavigation();
  const firstCocktail = data ? data[0] : null;

  return (
    <View style={styles.container}>
      <Header />
      <View>
        {isLoading ? (
          <ImageBackground style={styles.loadingImg}>
            <Text>Loading IMG</Text>
          </ImageBackground>
        ) : (
          <Image style={styles.loadingImg} source={firstCocktail?.imageURI} />
        )}
      </View>
      {isLoading ? <Text>Loading...</Text> : null}
      {error ? <Text style={styles.error}>{error.message}</Text> : null}
      {!isLoading ? (
        <View style={styles.cocktailInfo}>
          <Text style={styles.cocktailTitle}>{firstCocktail?.name}</Text>
        </View>
      ) : null}
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
    display: 'flex',
    padding: theme.spacing.md,
    gap: theme.spacing.sm,
    flexDirection: 'row',
  },
  title: {
    color: theme.colors.text,
    fontSize: theme.typography.size.xl,
    fontWeight: theme.typography.weight.medium,
    fontFamily: theme.typography.fontFamily.title,
  },
  actionButton: {
    marginTop: 10,
    color: theme.colors.accent,
    fontSize: theme.typography.size.lg,
    fontWeight: theme.typography.weight.bold,
    fontFamily: theme.typography.fontFamily.regular,
    backgroundColor: theme.colors.background,
    borderStyle: 'solid',
    borderWidth: 1,
    borderColor: theme.colors.accent,
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 8,
  },
  wrap: {
    alignItems: 'center',
    justifyContent: 'center',
  },

  outer: {
    transform: [{ rotate: '45deg' }],
    borderRadius: 10,
    borderWidth: 1,
    borderColor: theme.colors.accentSoft,
    // borderColor: 'rgba(120, 170, 255, 0.35)',

    // subtle glass
    backgroundColor: theme.colors.surface,

    alignItems: 'center',
    justifyContent: 'center',

    // glow / depth
    shadowColor: theme.colors.shadow,
    shadowOpacity: 0.25,
    shadowRadius: 18,
    shadowOffset: { width: 0, height: 10 },
    elevation: 10,
  },

  inner: {
    transform: [{ rotate: '0deg' }], // inherits outer rotation already
    borderRadius: 8,
    borderWidth: 1,
    borderColor: 'rgba(120, 170, 255, 0.18)',
    backgroundColor: 'rgba(10, 6, 20, 0.35)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  searchIcon: {
    transform: [{ rotate: '-45deg' }],
    width: 24,
    height: 24,
  },

  iconUpright: {
    transform: [{ rotate: '-45deg' }], // counter the outer rotation
    alignItems: 'center',
    justifyContent: 'center',
    display: 'flex',
    alignContent: 'center',
    color: theme.colors.accent,
  },
  error: {
    color: theme.colors.danger,
  },
  loadingImg: {
    width: 300,
    height: 400,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: theme.colors.danger,
  },
  cocktailInfo: {
    marginTop: theme.spacing.lg,
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: theme.typography.size.xxl,
    borderBottomColor : theme.colors.accent,
    borderStyle: 'solid',
    borderBottomWidth: 2,
    paddingBottom: theme.spacing.sm,
    width: '80%',
  },
  cocktailTitle: {
    width: '100%',
    textAlign: 'center',
    fontSize: theme.typography.size.xxl,
    fontWeight: theme.typography.weight.bold,
    fontFamily: theme.typography.fontFamily.title,
    color: theme.colors.text,
    borderBottomColor : theme.colors.accent,
    borderStyle: 'solid',
    borderBottomWidth: 1,
    paddingBottom: theme.spacing.sm,
  },
}));
