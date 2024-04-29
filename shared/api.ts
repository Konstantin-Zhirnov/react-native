import axios from 'axios'

export const PREFIX = `${process.env.EXPO_PUBLIC_DOMAIN}/api-v2`
export const FILE_API = {
  uploadImage: `${PREFIX}/files/upload-image?folder=demo`,
}

export const $api = axios.create({
  withCredentials: true,
})
