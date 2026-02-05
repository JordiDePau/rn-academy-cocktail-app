import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { DetailScreen } from 'app/screens/cocktail/DetailScreen';
import { OverviewScreen } from 'app/screens/cocktail/OverviewScreen';
import { SearchScreen } from 'app/screens/cocktail/SearchScreen';

export const CocktailsStack = createNativeStackNavigator({
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
