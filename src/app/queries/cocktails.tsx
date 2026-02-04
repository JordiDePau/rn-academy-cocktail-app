import { useQuery } from '@tanstack/react-query';

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

type CocktailQueryProps = {
  unit: 'ml' | 'oz';
  id: number;
};

const getCocktail = async ({ id = 1, unit = 'ml' }: CocktailQueryProps) => {
  console.log(`https://julep-api-hazltuqnpq-ew.a.run.app/cocktail/${id}?unit=${unit}`);
  const response = await fetch(`https://julep-api-hazltuqnpq-ew.a.run.app/cocktail/${id}?unit=${unit}`);
  if (!response.ok) {
    throw new Error('Failed to fetch cocktails list: ' + response.statusText);
  }
  const data: CocktailType = await response.json();
  return data;
};

export const useCocktailQuery = (id) => {
  const { cocktail, isLoading, error, refetch } = useQuery({
    queryKey: ['cocktail', id],
    queryFn: () => getCocktail({id, unit: 'ml' }),
    staleTime: TIME_ONE_MINUTE * 5, // Data is 5 min "vers"
  });

  return { cocktail, isLoading, error, refetch };
};

export type CocktailType = {
  id: number;
  name: string;
  summary: string;
  recipe: string;
  garnish: string;
  imageURI: string;
  history: string;
  source: string;
  ingredients: {
    name: string;
    quantity: number;
    unit: string;
  }[];
  glass: string;
};
