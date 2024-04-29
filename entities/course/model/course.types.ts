export interface CourseStateType {
  courses: StudentCourseDescription[]
  isLoading: boolean
  error: string | null
}

export type Tariff = {
  id: number
  name: string
  price: number
  type: TariffType
  oldPrice?: number
  creditPrice?: number
  lengthInMonth: number
  courseId: number
  videoUuid: string
}

export type Progress = {
  progressPercent: number
  tariffLessonsCount: number
  userViewedLessonsCount: number
}

export type StudentCourseDescription = {
  id: number
  shortTitle: string
  image: string
  title: string
  alias: string
  length: number
  avgRating: number
  price: number
  courseOnDirection: { direction: Record<'name', string> }[]
  tariffs: Tariff[]
  progress: Progress
}

export enum TariffType {
  free = 'free',
  basic = 'basic',
  mentor = 'mentor',
  project = 'project',
}

export type StudentCourseDescriptionResponse = Record<number, StudentCourseDescription>
