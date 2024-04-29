export type UserStateType = {
  profile: User | null
  isLoading: boolean
  error: string
}

export type User = {
  id: number
  name: string
  surname?: string
  photo?: string
}
