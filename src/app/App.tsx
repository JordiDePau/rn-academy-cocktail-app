import 'ui/theme/unistyle';
import 'ui/theme/tokens';

import { useEffect } from 'react';
import { initReactI18next } from 'react-i18next';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import en from 'i18n/en.json';
import nl from 'i18n/nl.json';
import i18n from 'i18next';

import { Navigation } from 'app/navigation/navigators/Root';

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
