const INITIAL_STATE = {
  searchQueryName: '',
};

// @ts-ignore
export const createFilterSlice = (set) => ({
  ...INITIAL_STATE,
  // @ts-ignore
  setSearchQueryName: (nameQuery) => set({ searchQueryName: nameQuery }),
  resetAll: () => set(INITIAL_STATE),
});
