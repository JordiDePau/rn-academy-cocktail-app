import { useTranslation } from 'react-i18next';
import { Text } from 'react-native';

type TabBarLabelsProps = {
  translationKey: string;
};

export const TabBarLabel = ({ translationKey }: TabBarLabelsProps) => {
  const { t } = useTranslation();
  return <Text>{t(translationKey)}</Text>;
};
