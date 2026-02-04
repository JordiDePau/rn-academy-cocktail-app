import "app/ui/theme/unistyle";
import { useEffect } from 'react';
import { initReactI18next, useTranslation } from 'react-i18next';
import { Text, View } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import {
  BottomTabNavigationOptions,
  createBottomTabNavigator,
} from '@react-navigation/bottom-tabs';
import { createStaticNavigation } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useFonts } from 'expo-font';
import en from 'i18n/en.json';
import nl from 'i18n/nl.json';
import i18n from 'i18next';

import { DetailScreen } from 'app/screens/DetailScreen';
import { OverviewScreen } from 'app/screens/OverviewScreen';
import { ProfileScreen } from 'app/screens/ProfileScreen';
import { SearchScreen } from 'app/screens/SearchScreen';

import 'app/ui/theme/tokens';

const ProfileStack = createNativeStackNavigator({
  screenOptions: { headerShown: false },
  screens: {
    Profile: ProfileScreen,
  },
});

const CocktailsStack = createNativeStackNavigator({
  screenOptions: { headerShown: false },
  screens: {
    overview: {
      screen: OverviewScreen,
    },
    search: {
      screen: SearchScreen,
    },
    detail: {
      screen: DetailScreen,
    },
  },
});

const TabBarLabel = ({ translationKey, ...props }) => {
  const { t } = useTranslation();

  return (
    <Text {...props} style={{ fontSize: 11, color: props.color }}>
      {t(translationKey)}
    </Text>
  );
};

const TabNavigator = createBottomTabNavigator({
  screenOptions: { headerShown: false },
  screens: {
    cocktails: {
      screen: CocktailsStack,
      options: {
        tabBarLabel: (props: BottomTabNavigationOptions['tabBarLabel']) => (
          <TabBarLabel translationKey='tabs.cocktails' {...props} />
        ),
      },
    },
    profile: {
      screen: ProfileStack,
      options: {
        tabBarLabel: (props: BottomTabNavigationOptions['tabBarLabel']) => (
          <TabBarLabel translationKey='tabs.profile' {...props} />
        ),
      },
    },
  },
});

const Navigation = createStaticNavigation(TabNavigator);
// const Navigation = createStaticNavigation(ProfileStack);
//
//Query client
const queryClient = new QueryClient();

export const App = () => {
  useEffect(() => {
    i18n
      .use(initReactI18next)
      .init({
        resources: {
          en: { translation: en },
          nl: { translation: nl },
        },
        lng: 'nl',
        fallbackLng: 'en',
        interpolation: {
          escapeValue: false,
        },
      })
      .then((r) => console.log('i18n initialized', r));
  }, []);

  return (
    <SafeAreaProvider>
      <QueryClientProvider client={queryClient}>
        <Navigation />
      </QueryClientProvider>
    </SafeAreaProvider>
  );
};
// //


// export const App = () => (
//   <View
//     style={{
//       flex: 1,
//       justifyContent: 'center',
//       alignItems: 'center',
//     }}
//   >
//     <Text>Edit app/index.tsx to edit this screen.</Text>
//     <ProfileScreen/>
//   </View>
// );
