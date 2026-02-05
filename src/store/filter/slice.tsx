const INITIAL_STATE = {
  searchQueryName: '',
};

export const createFilterSlice = (p0: unknown, set: (arg0: { searchQueryName: any }) => any) => ({
  ...INITIAL_STATE,
  setSearchQueryName: (nameQuery: any) => set({ searchQueryName: nameQuery }),
  resetAll: () => set(INITIAL_STATE),
});
