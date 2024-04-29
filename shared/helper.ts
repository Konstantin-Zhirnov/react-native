import FormData from 'form-data'
import { AxiosError } from 'axios'
import { launchCameraAsync, launchImageLibraryAsync, MediaTypeOptions } from 'expo-image-picker'

import { $api, FILE_API } from './api'

type UploadResponseType = {
  urls: {
    original: string
    webP: string
  }
}

export const uploadToServer = async (uri: string, name: string) => {
  const formData = new FormData()
  formData.append('files', {
    uri,
    name,
    type: 'image/jpeg',
  })

  try {
    const { data } = await $api.post<UploadResponseType>(FILE_API.uploadImage, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
    return data.urls.original
  } catch (error) {
    if (error instanceof AxiosError) {
      console.log(error)
    }
    return null
  }
}

export const selectImage = async () => {
  const result = await launchImageLibraryAsync({
    mediaTypes: MediaTypeOptions.Images,
    allowsEditing: true,
    aspect: [1, 1],
    quality: 0.5,
  })

  if (!result.assets) return null
  return result.assets[0]
}

export const takePhoto = async () => {
  const result = await launchCameraAsync({
    mediaTypes: MediaTypeOptions.Images,
    allowsEditing: true,
    aspect: [1, 1],
    quality: 0.5,
  })
  if (!result.assets) return null
  return result.assets[0]
}
