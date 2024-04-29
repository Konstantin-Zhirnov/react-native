export type AuthResponseType = {
  access_token: string
}

export type LoginRequestType = {
  email: string
  password: string
}

export type AuthorizationStateType = {
  isLoading: boolean
  access_token: string
  error: string
}
