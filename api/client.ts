import axios from 'axios'
import * as SecureStore from 'expo-secure-store'
import Constants from 'expo-constants'

const API_BASE = 'http://192.168.15.8:3000'

export const api = axios.create({
  baseURL: API_BASE,
  timeout: 15000
})

// Attach token to requests
api.interceptors.request.use(async config => {
  const token = await SecureStore.getItemAsync('accessToken')
  if (token && config.headers) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})
