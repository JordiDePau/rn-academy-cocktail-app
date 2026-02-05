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
