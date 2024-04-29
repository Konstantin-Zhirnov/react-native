import { $api, PREFIX } from '../../../shared/api'
import { StudentCourseDescription } from '../model/course.types'

export const API = {
  my: `${PREFIX}/course/my`,
}

export const CoursesAPI = {
  async getCourses(access_token: string): Promise<StudentCourseDescription[]> {
    const { data } = await $api.get<StudentCourseDescription[]>(API.my, {
      params: { studentCourse: 'dontMy' },
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    })
    return data
  },
}
