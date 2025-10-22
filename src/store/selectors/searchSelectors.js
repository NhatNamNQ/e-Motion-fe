export const selectSearchResults = (state) => state.search.searchResults
export const selectSearchForm = (state) => state.search.searchForm
export const selectCity = (state) => state.search.searchForm.location
export const selectStartTime = (state) => state.search.startTime
export const selectEndTime = (state) => state.search.endTime
export const selectSearchLoading = (state) => state.search.isLoading
export const selectSearchError = (state) => state.search.error
