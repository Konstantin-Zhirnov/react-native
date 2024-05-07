import { AxiosError } from 'axios'
import { asyncThunkCreator, buildCreateSlice } from '@reduxjs/toolkit'

import { CourseStateType, StudentCourseDescription } from './course.types'
import { CoursesAPI } from '../api'

const initialState: CourseStateType = {
  courses: [],
  isLoading: false,
  error: null,
}

const createSlice = buildCreateSlice({
  creators: { asyncThunk: asyncThunkCreator },
})

export const courses = createSlice({
  name: 'courses',
  initialState,
  selectors: {
    getCourses: (state): StudentCourseDescription[] => state.courses,
    getLoading: (state): boolean => state.isLoading,
  },
  reducers: (create) => ({
    fetchCourses: create.asyncThunk(
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
      {
        pending,
        fulfilled: (state, action) => {
          state.courses = action.payload
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
})

function pending(state: CourseStateType) {
  state.isLoading = true
  state.courses = []
  state.error = null
}

export const { fetchCourses } = courses.actions
export const { getCourses, getLoading } = courses.selectors

export default courses.reducer
