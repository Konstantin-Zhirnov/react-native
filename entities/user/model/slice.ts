import { createSlice } from '@reduxjs/toolkit'

import { fetchProfile, fetchUpdatePhoto } from './asyncActions'
import { RootState } from '../../../store'
import { User, UserStateType } from './user.types'

const initialState: UserStateType = {
  profile: null,
  isLoading: false,
  error: '',
}

export const user = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProfile.pending, pending)
      .addCase(fetchProfile.fulfilled, (state, action) => {
        state.profile = action.payload
        state.isLoading = false
      })
      .addCase(fetchProfile.rejected, (state, action) => {
        state.isLoading = false
        state.error = (action.payload as string) ?? ''
      })

      .addCase(fetchUpdatePhoto.pending, pending)
      .addCase(fetchUpdatePhoto.fulfilled, (state, action) => {
        state.profile = action.payload
        state.isLoading = false
      })
      .addCase(fetchUpdatePhoto.rejected, (state, action) => {
        state.isLoading = false
        state.error = (action.payload as string) ?? ''
      })
  },
})

function pending(state: UserStateType) {
  state.isLoading = true
  state.profile = null
  state.error = ''
}

export const getProfile = (state: RootState): User | null => state.user.profile
// export const getLoading = (state: RootState): boolean => state.courses.isLoading

export default user.reducer
