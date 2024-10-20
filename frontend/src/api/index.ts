import axios from 'axios';
import { refreshUser } from '../features/user/userApi';

export const baseURL = import.meta.env.VITE_API_URL

const getRefreshToken = () => localStorage.getItem('refreshToken')

const api = axios.create({
  baseURL,
  timeout: 180000,
  headers: {
    Authorization: localStorage.getItem('accessToken')
      ? `Bearer ${localStorage.getItem('accessToken')}`
      : null,
    'Content-Type': 'application/json',
    accept: 'application/json'
  }
})



const setAuthorizationTokens = (accessToken: string, refreshToken: string) => {
  localStorage.setItem('refreshToken', refreshToken)
  localStorage.setItem('accessToken', accessToken)
  window.dispatchEvent(new Event('storage'))
  api.defaults.headers.Authorization = `Bearer ${accessToken}`
}

const removeAuthorizationTokens = () => {
  localStorage.removeItem('refreshToken')
  localStorage.removeItem('accessToken')
  window.dispatchEvent(new Event('storage'))
  api.defaults.headers.Authorization = null
}

api.interceptors.response.use(
  response => response,
  async error => {
    const originalRequest = error.config
    const refreshToken = getRefreshToken()

    if (error?.response?.status === 401 && refreshToken) {
      originalRequest._retry = true
      api.defaults.headers.Authorization = null
      refreshUser(refreshToken)
        .then(newLogin => {
          setAuthorizationTokens(newLogin.access_token, newLogin.refresh_token)
          originalRequest.headers.Authorization = `Bearer ${newLogin.access_token}`
          return api(originalRequest)
        })
        .catch(error => {
          removeAuthorizationTokens()
          return Promise.reject(error)
        })
    }

    return Promise.reject(error)
  }
)


export {
  api,
  getRefreshToken,
  setAuthorizationTokens,
  removeAuthorizationTokens,
};