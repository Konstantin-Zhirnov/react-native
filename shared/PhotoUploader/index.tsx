import React from 'react'
import { Alert, Pressable, StyleSheet, Text, View } from 'react-native'
import { PermissionStatus, useCameraPermissions } from 'expo-image-picker'

import UploadIcon from '../../assets/icons/upload'
import { Fonts, Colors, Radius, Gaps } from '../tokens'
import { takePhoto, uploadToServer } from '../helper'

interface IProps {
  onUpload: (uri: string) => void
  onError: (error: string) => void
}
const PhotoUploader: React.FC<IProps> = ({ onUpload, onError }) => {
  const [cameraPermissions, requestCameraPermissions] = useCameraPermissions()

  const verifyCameraPermissions = async () => {
    if (cameraPermissions?.status === PermissionStatus.UNDETERMINED) {
      const response = await requestCameraPermissions()
      return response.granted
    }
    if (cameraPermissions?.status === PermissionStatus.DENIED) {
      Alert.alert('Insufficient permissions to access the camera')
      return false
    }
    return true
  }

  const upload = async () => {
    const isPermissionGranted = await verifyCameraPermissions()
    if (!isPermissionGranted) {
      onError('Insufficient permissions')
      return
    }

    const asset = await takePhoto()

    if (!asset) {
      onError('No image selected')
      return
    }

    const fileName = `${new Date().getTime().toString(16)}.${asset.mimeType?.split('/')[1]}`

    const uploadedUrl = await uploadToServer(asset.uri, fileName ?? '')
    if (!uploadedUrl) {
      onError('Failed to upload image')
      return
    }
    onUpload(uploadedUrl)
  }

  return (
    <Pressable onPress={upload}>
      <View style={styles.container}>
        <UploadIcon />
        <Text style={styles.text}>Take a photo</Text>
      </View>
    </Pressable>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Gaps.g8,
    backgroundColor: Colors.violetDark,
    borderRadius: Radius.r10,
    paddingHorizontal: 20,
    paddingVertical: 17,
  },

  text: {
    color: Colors.white,
    fontSize: Fonts.f14,
    fontFamily: Fonts.regular,
  },
})

export { PhotoUploader }
