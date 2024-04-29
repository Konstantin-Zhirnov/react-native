import { $api, PREFIX } from '../../../shared/api'

export const API = {
  profile: `${PREFIX}/user/profile`,
}

export const ProfileAPI = {
  async getProfile(access_token: string): Promise<any> {
    const { data } = await $api.get<any>(API.profile, {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    })
    return data.profile
  },

  async updatePhoto(obj: { access_token: string; photo: string }): Promise<any> {
    const { data } = await $api.patch<any>(
      API.profile,
      {
        photo: obj.photo,
      },
      {
        headers: {
          Authorization: `Bearer ${obj.access_token}`,
        },
      },
    )
    return data
  },
}
