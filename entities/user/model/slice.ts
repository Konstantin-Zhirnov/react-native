import { asyncThunkCreator, buildCreateSlice } from '@reduxjs/toolkit'

import { User, UserStateType } from './user.types'
import { ProfileAPI } from '../api'
import { AxiosError } from 'axios'

const initialState: UserStateType = {
  profile: null,
  isLoading: false,
  error: '',
}

const createSlice = buildCreateSlice({
  creators: { asyncThunk: asyncThunkCreator },
})

export const user = createSlice({
  name: 'user',
  initialState,
  reducers: (create) => ({
    fetchProfile: create.asyncThunk(
      async function (access_token: string, { rejectWithValue }) {
        try {
          return await ProfileAPI.getProfile(access_token)
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
          state.profile = action.payload
        },
        rejected: (state, action) => {
          state.error = (action.payload as string) ?? ''
        },
        settled: (state) => {
          state.isLoading = false
        },
      },
    ),
    fetchUpdatePhoto: create.asyncThunk(
      async function (obj: { access_token: string; photo: string }, { rejectWithValue }) {
        try {
          return await ProfileAPI.updatePhoto(obj)
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
          state.profile = action.payload
        },
        rejected: (state, action) => {
          state.error = (action.payload as string) ?? ''
        },
        settled: (state) => {
          state.isLoading = false
        },
      },
    ),
  }),
  selectors: {
    getProfile: (state): User | null => state.profile,
  },
})

function pending(state: UserStateType) {
  state.isLoading = true
  state.profile = null
  state.error = ''
}

export const { fetchProfile, fetchUpdatePhoto } = user.actions
export const { getProfile } = user.selectors

export default user.reducer
