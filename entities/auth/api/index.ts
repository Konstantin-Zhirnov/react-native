import { $api, PREFIX } from '../../../shared/api'
import { AuthResponseType } from '../model/auth.types'

export const API = {
  login: `${PREFIX}/auth/login`,
}

export const AuthAPI = {
  async login(email: string, password: string): Promise<AuthResponseType> {
    const { data } = await $api.post(API.login, { email, password })
    return data
  },
}
