import * as SecureStore from 'expo-secure-store'

export const setTokens = async (accessToken: string) => {
  await SecureStore.setItemAsync('accessToken', accessToken)
}

export const clearTokens = async () => {
  await SecureStore.deleteItemAsync('accessToken')
}

export const getAccessToken = async () => await SecureStore.getItemAsync('accessToken')
