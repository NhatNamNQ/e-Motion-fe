export const selectAuth = (state) => state.auth
export const selectToken = (state) => state.auth.token
export const selectIsAuthenticated = (state) => state.auth.isAuthenticated
export const selectAuthLoading = (state) => state.auth.isLoading
export const selectAuthError = (state) => state.auth.error
export const selectIsInitialized = (state) => state.auth.isInitialized
export const selectUser = (state) => state.auth.user
export const selectRegistrationEmail = (state) => state.auth.registrationEmail
