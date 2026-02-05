import { useQuery } from '@tanstack/react-query';

import { CocktailType } from 'core/modules/cocktails/CocktailType';
import { TIME_ONE_MINUTE } from 'utils/constants/time';

type CocktailsQueryProps = {
  unit: 'ml' | 'oz';
};
/**
 * @link https://julep-openapi-specs.netlify.app/#/Catalog/get-all-cocktails
 */
const getCocktailList = async ({ unit = 'ml' }: CocktailsQueryProps) => {
  const response = await fetch(`https://julep-api-hazltuqnpq-ew.a.run.app/cocktails?unit=${unit}`);
  if (!response.ok) {
    throw new Error('Failed to fetch cocktails list: ' + response.statusText);
  }
  const data: CocktailType[] = await response.json();
  return data;
};

export const useCocktailsListQuery = () => {
  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ['cocktailsList'],
    queryFn: () => getCocktailList({ unit: 'ml' }),
    staleTime: TIME_ONE_MINUTE * 5, // Data is 5 min "vers"
  });

  return { data, isLoading, error, refetch };
};
