import { createSlice } from '@reduxjs/toolkit'

import { fetchCourses } from './asyncActions'
import { CourseStateType, StudentCourseDescription } from './course.types'
import { RootState } from '../../../store'

const initialState: CourseStateType = {
  courses: [],
  isLoading: false,
  error: null,
}

export const courses = createSlice({
  name: 'courses',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCourses.pending, pending)
      .addCase(fetchCourses.fulfilled, (state, action) => {
        state.courses = action.payload
        state.isLoading = false
      })
      .addCase(fetchCourses.rejected, (state, action) => {
        state.isLoading = false
        state.error = (action.payload as string) ?? ''
      })
  },
})

function pending(state: CourseStateType) {
  state.isLoading = true
  state.courses = []
  state.error = null
}

export const getCourses = (state: RootState): StudentCourseDescription[] => state.courses.courses
export const getLoading = (state: RootState): boolean => state.courses.isLoading

export default courses.reducer
