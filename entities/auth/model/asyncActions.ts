import { createAsyncThunk } from '@reduxjs/toolkit'
import { AxiosError } from 'axios'

import { AuthAPI } from '../api'
import { LoginRequestType } from './auth.types'

export const fetchLogin = createAsyncThunk(
  'authorization/fetchLogin',
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
)
