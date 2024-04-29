import { atomWithStorage, createJSONStorage } from 'jotai/utils'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { atom } from 'jotai'
import { AuthResponseType, LoginRequestType } from './auth.types'
import axios, { AxiosError } from 'axios'
import { Index } from '../api'

const storage = createJSONStorage<AuthState>(() => AsyncStorage)

const INITIAL_STATE = {
  isLoading: false,
  access_token: null,
  error: null,
}
export const authAtom = atomWithStorage<AuthState>('auth', INITIAL_STATE, storage)

export const loginAtom = atom(
  (get) => get(authAtom),
  async (_, set, { email, password }: LoginRequestType) => {
    set(authAtom, {
      isLoading: true,
      access_token: null,
      error: null,
    })

    try {
      const { data } = await axios.post<AuthResponseType>(Index.login, {
        email,
        password,
      })
      set(authAtom, {
        isLoading: false,
        access_token: data.access_token,
        error: null,
      })
    } catch (error) {
      if (error instanceof AxiosError) {
        set(authAtom, {
          isLoading: false,
          access_token: null,
          error: error.response?.data.message,
        })
      }
    }
  },
)

export const logoutAtom = atom(null, (_, set) => {
  set(authAtom, INITIAL_STATE)
})

export interface AuthState {
  access_token: string | null
  isLoading: boolean
  error: string | null
}
