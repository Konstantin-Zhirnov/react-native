import React from 'react'
import { Alert, Pressable, StyleSheet, Text, View } from 'react-native'
import { PermissionStatus, useMediaLibraryPermissions } from 'expo-image-picker'

import UploadIcon from '../../assets/icons/upload'
import { Fonts, Colors, Radius, Gaps } from '../tokens'
import { selectImage, uploadToServer } from '../helper'

interface IProps {
  onUpload: (uri: string) => void
  onError: (error: string) => void
}
const ImageUploader: React.FC<IProps> = ({ onUpload, onError }) => {
  const [libraryPermissions, requestLibraryPermissions] = useMediaLibraryPermissions()

  const verifyLibraryPermissions = async () => {
    if (libraryPermissions?.status === PermissionStatus.UNDETERMINED) {
      const response = await requestLibraryPermissions()
      return response.granted
    }
    if (libraryPermissions?.status === PermissionStatus.DENIED) {
      Alert.alert('There are not enough permissions to access the gallery')
      return false
    }
    return true
  }

  const upload = async () => {
    const isPermissionGranted = await verifyLibraryPermissions()
    if (!isPermissionGranted) {
      onError('Insufficient permissions')
      return
    }

    const asset = await selectImage()

    if (!asset) {
      onError('No image selected')
      return
    }

    const uploadedUrl = await uploadToServer(asset.uri, asset.fileName ?? '')
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
        <Text style={styles.text}>Upload an image</Text>
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

export { ImageUploader }
