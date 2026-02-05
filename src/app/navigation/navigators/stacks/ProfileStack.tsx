import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { ProfileScreen } from 'app/screens/profile/ProfileScreen';

export const ProfileStack = createNativeStackNavigator({
  screenOptions: { headerShown: false },
  screens: {
    Profile: ProfileScreen,
  },
});
