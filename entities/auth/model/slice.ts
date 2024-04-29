import { createSlice } from '@reduxjs/toolkit'

import { AuthorizationStateType } from './auth.types'
import { fetchLogin } from './asyncActions'
import { RootState } from '../../../store'

const initialState: AuthorizationStateType = {
  isLoading: false,
  access_token: '',
  error: '',
}

export const authorization = createSlice({
  name: 'authorization',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchLogin.pending, pending)
      .addCase(fetchLogin.fulfilled, (state, action) => {
        state.access_token = action.payload.access_token
        state.isLoading = false
      })
      .addCase(fetchLogin.rejected, (state, action) => {
        state.isLoading = false
        state.access_token = ''
        state.error = (action.payload as string) ?? ''
      })
  },
})

function pending(state: AuthorizationStateType) {
  state.isLoading = true
  state.access_token = ''
  state.error = ''
}

export const getToken = (state: RootState): string => state.authorization.access_token
export const getLoading = (state: RootState): boolean => state.authorization.isLoading
export const getError = (state: RootState): string => state.authorization.error

export default authorization.reducer
