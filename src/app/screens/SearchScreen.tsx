import React from 'react';
import { FlatList, Pressable, RefreshControl, Text, TextInput, View } from 'react-native';
import { StyleSheet } from 'react-native-unistyles';
import { ImageBackground } from 'expo-image';
import { useNavigation } from 'expo-router';

import { CocktailListItem } from 'app/components/CocktailListItem';
import { useCocktailsListQuery } from 'app/queries/cocktails';

import Close from '../../../assets/icon/close.svg';

const Header: React.FC = () => {
//hook for search input and navigation

  const { navigate } = useNavigation();


  return (
    <ImageBackground
      source={require('../../../assets/images/hero.png')}
      style={styles.backgroundImage}
    >
      <TextInput
        placeholder="Search cocktails..."
        // todo
        placeholderTextColor="rgba(255, 255, 255, 0.7)"
        style={styles.title}
      />
      <Pressable
        onPress={() => navigate('overview')}
        hitSlop={10}
        style={({ pressed }) => [
          styles.wrap,
          { width: 52, height: 52, opacity: pressed ? 0.85 : 1 },
        ]}
      >
        <View style={[styles.outer, { width: 52, height: 52 }]}>
          <View style={[styles.inner, { width: 52 * 0.78, height: 52 * 0.78 }]}>
            <Close style={styles.closeIcon} />
          </View>
        </View>
      </Pressable>
    </ImageBackground>
  );
};



interface Props {
  // Define any props you might need here
}

export const SearchScreen: Props = () => {
  const { data, isLoading, error, refetch } = useCocktailsListQuery();
  const { navigate } = useNavigation();

  return (
    <View style={styles.container}>
      <Header/>
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
  closeIcon: {
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
}));
