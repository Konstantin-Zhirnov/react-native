import { AxiosError } from 'axios'
import { asyncThunkCreator, buildCreateSlice } from '@reduxjs/toolkit'

import { AuthorizationStateType, LoginRequestType } from './auth.types'
import { AuthAPI } from '../api'

const initialState: AuthorizationStateType = {
  isLoading: false,
  access_token: '',
  error: '',
}

const createSlice = buildCreateSlice({
  creators: { asyncThunk: asyncThunkCreator },
})

export const authorization = createSlice({
  name: 'authorization',
  initialState,
  selectors: {
    getToken: (state): string => state.access_token,
    getLoading: (state): boolean => state.isLoading,
    getError: (state): string => state.error,
  },
  reducers: (create) => ({
    fetchLogin: create.asyncThunk(
      async function (obj: LoginRequestType, { rejectWithValue }) {
        try {
          return await AuthAPI.login(obj.email, obj.password)
        } catch (error: unknown) {
          if (error instanceof AxiosError) {
            return rejectWithValue(error.response?.data.message)
          } else {
            return rejectWithValue(error)
          }
        }
      },
      {
        pending,
        fulfilled: (state, action) => {
          state.access_token = action.payload.access_token
        },
        rejected: (state, action) => {
          state.access_token = ''
          state.error = (action.payload as string) ?? ''
        },
        settled: (state) => {
          state.isLoading = false
        },
      },
    ),
    logout: create.reducer((state) => {
      state.isLoading = false
      state.access_token = ''
      state.error = ''
    }),
  }),
})

function pending(state: AuthorizationStateType) {
  state.isLoading = true
  state.access_token = ''
  state.error = ''
}

export const { fetchLogin, logout } = authorization.actions
export const { getToken, getLoading, getError } = authorization.selectors
export default authorization.reducer
