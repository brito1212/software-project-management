import { ThunkDispatch, createSlice } from '@reduxjs/toolkit'
import { removeAuthorizationTokens, setAuthorizationTokens } from '../../api'
import { AppThunk, RootState } from '../../app/store'
import { useToastAction } from '../toast/toastSlice'
import { User, UserRegistration } from './user.type'
import { createUser, getUser, loginWithEmailAndPassword } from './userApi'
import { HttpStatusCode } from 'axios'

export interface UserState {
  user: User | null
}

const initialState: UserState = {
  user: null
}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload
    },
    clearUser: state => {
      state.user = initialState.user
    }
  }
})

export const { setUser, clearUser } = userSlice.actions

export const selectUser = (state: RootState) => state.user.user

export const loginAction =
  (
    email: string,
    password: string,
    captchaResponse: string,
    callback: () => void,
    errorCallback: () => void
  ): AppThunk =>
  async (dispatch, getState) => {
    loginWithEmailAndPassword(email, password, captchaResponse)
      .then(loginResponse => {
        const { access_token, refresh_token } = loginResponse
        setAuthorizationTokens(access_token, refresh_token)
        getUser()
          .then(user => {
            dispatch(setUser(user))
          })
          .then(() => {
            callback()
          })
      })
      .catch(error => {
        if (error.response.status === 400) {
          if (error.response.data.error) {
            if (error.response.data.error === 'invalid_grant') {
              dispatch(
                useToastAction(
                  'error',
                  'Credenciais inválidas. Por favor, verifique seu e-mail e senha e tente novamente.',
                  'Erro no Login'
                )
              )
            } else {
              dispatch(useToastAction('error', error.response.data.error, 'Erro no Login.'))
            }
          }
        } else {
          dispatch(
            useToastAction(
              'error',
              'Erro ao realizar o login. Por favor, tente novamente mais tarde.',
              'Erro no Login'
            )
          )
        }
        dispatch(clearUser())
        errorCallback()
      })
  }

export const emailSingUpAction =
  (registration: UserRegistration, callback: () => void, errorCallback: () => void): AppThunk =>
  async (dispatch, getState) => {
    createUser(registration)
      .then(() => {
        dispatch(useToastAction('success', 'Cadastro realizado com sucesso!', 'Usuário cadastrado'))
        callback()
      })
      .catch(error => {
        if (error.response?.status === HttpStatusCode.BadRequest) {
          dispatch(useToastAction('error', error.response.data, 'Erro no cadastro'))
        } else {
          dispatch(
            useToastAction(
              'error',
              'Erro ao realizar o cadastro, tente novamente.',
              'Erro no cadastro'
            )
          )
        }
        dispatch(clearUser())
        errorCallback()
      })
  }


export const logoutAction = (): AppThunk => (dispatch, getState) => {
  removeAuthorizationTokens()
  dispatch(clearUser())
}

export function setupAuthListener(dispatch: ThunkDispatch<RootState, unknown, any>) {
  function handler() {
    window.addEventListener('storage', () => {
      if (!localStorage.getItem('accessToken')) {
        dispatch(clearUser())
      }
    })
  }
  return handler()
}

export default userSlice.reducer
