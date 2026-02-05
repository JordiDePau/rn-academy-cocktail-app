import { createStaticNavigation } from '@react-navigation/native';

import { TabNavigator } from 'app/navigation/navigators/bottomTab/TabNavigator';

export const Navigation = createStaticNavigation(TabNavigator);
