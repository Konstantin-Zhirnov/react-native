import { createAsyncThunk } from '@reduxjs/toolkit'
import { AxiosError } from 'axios'

import { ProfileAPI } from '../api'

export const fetchProfile = createAsyncThunk(
  'user/fetchProfile',
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
)

export const fetchUpdatePhoto = createAsyncThunk(
  'user/fetchUpdateProfile',
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
)
