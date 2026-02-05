import { create } from 'zustand';

import { createFilterSlice } from './filter/slice';


export const useCocktailStore = create((...a) => ({
  // @ts-ignore
  ...createFilterSlice(...a),
}));
