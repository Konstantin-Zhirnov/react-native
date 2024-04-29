import { atom } from 'jotai'
import axios, { AxiosError } from 'axios'

import { authAtom } from '../../auth/model/auth.state'
import { Index } from '../api'
import { CourseStateType, StudentCourseDescription } from './course.types'

export const courseAtom = atom<CourseStateType>({
  courses: [],
  isLoading: false,
  error: null,
})

export const loadCourseAtom = atom(
  async (get) => {
    return get(courseAtom)
  },
  async (get, set) => {
    try {
      const { access_token } = await get(authAtom)
      set(courseAtom, {
        isLoading: false,
        courses: [],
        error: null,
      })
      const { data } = await axios.get<StudentCourseDescription[]>(Index.my, {
        params: { studentCourse: 'dontMy' },
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      })
      set(courseAtom, {
        isLoading: false,
        courses: data,
        error: null,
      })
    } catch (error) {
      if (error instanceof AxiosError) {
        set(courseAtom, {
          isLoading: false,
          courses: [],
          error: error.response?.data.message,
        })
      }
    }
  },
)
