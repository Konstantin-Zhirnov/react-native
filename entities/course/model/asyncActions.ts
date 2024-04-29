import { createAsyncThunk } from '@reduxjs/toolkit'
import { AxiosError } from 'axios'

import { CoursesAPI } from '../api'

export const fetchCourses = createAsyncThunk(
  'courses/fetchCourses',
  async function (access_token: string, { rejectWithValue }) {
    try {
      return await CoursesAPI.getCourses(access_token)
    } catch (error: unknown) {
      if (error instanceof AxiosError) {
        return rejectWithValue(error.response?.data.message)
      } else {
        return rejectWithValue(error)
      }
    }
  },
)
