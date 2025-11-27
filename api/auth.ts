import {api} from './client'
import {setTokens, clearTokens} from '../services/storage'

export const login = async (email: string, password: string) => {
  try {
    const {data} = await api.post('/auth/login', {email, password})
    await setTokens(data.accessToken)
    return data.user
  } catch (error) {
    console.error('Login error:', {error})
    throw error
  }
}

export const logout = async () => {
  await clearTokens()
}
