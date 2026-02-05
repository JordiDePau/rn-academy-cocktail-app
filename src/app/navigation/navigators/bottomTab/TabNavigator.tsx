import {
  BottomTabNavigationOptions,
  createBottomTabNavigator,
} from '@react-navigation/bottom-tabs';

import { TabBarLabel } from 'app/navigation/components/TabBarLabel';
import { CocktailsStack } from 'app/navigation/navigators/stacks/Cocktails';
import { ProfileStack } from 'app/navigation/navigators/stacks/ProfileStack';

export const TabNavigator = createBottomTabNavigator({
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
