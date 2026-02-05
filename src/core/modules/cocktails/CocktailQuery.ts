import { useQuery } from '@tanstack/react-query';

import { CocktailType } from 'core/modules/cocktails/CocktailType';
import { TIME_ONE_MINUTE } from 'utils/constants/time';

type CocktailQueryProps = {
  unit: 'ml' | 'oz';
  id: number;
};

const getCocktail = async ({ id = 1, unit = 'ml' }: CocktailQueryProps) => {
  console.log(`https://julep-api-hazltuqnpq-ew.a.run.app/cocktail/${id}?unit=${unit}`);
  const response = await fetch(
    `https://julep-api-hazltuqnpq-ew.a.run.app/cocktail/${id}?unit=${unit}`,
  );
  if (!response.ok) {
    throw new Error('Failed to fetch cocktails list: ' + response.statusText);
  }
  const data: CocktailType = await response.json();
  return data;
};

export const useCocktailQuery = (id: number) => {
  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ['cocktail', id],
    queryFn: () => getCocktail({ id, unit: 'ml' }),
    staleTime: TIME_ONE_MINUTE * 5, // Data is 5 min "vers"
  });

  return { data, isLoading, error, refetch };
};
