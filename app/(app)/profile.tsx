import React from 'react'
import { StyleSheet, View } from 'react-native'

import { useAppDispatch, useAppSelector } from '../../store'

import { getProfile, fetchUpdatePhoto } from '../../entities/user/model/slice'
import { getToken } from '../../entities/auth/model/slice'
import { Avatar } from '../../entities/user/ui/Avatar'

import { ImageUploader } from '../../shared/ImageUploader'
import { Button } from '../../shared/Button'
import { Gaps } from '../../shared/tokens'

const Profile: React.FC = () => {
  const dispatch = useAppDispatch()
  const profile = useAppSelector(getProfile)
  const access_token = useAppSelector(getToken)

  const [image, setImage] = React.useState<string | null>(null)

  const getError = (error: string) => {
    console.log('error:', error)
  }

  const handlePress = () => {
    if (image) {
      dispatch(fetchUpdatePhoto({ access_token, photo: image }))
    }
  }

  React.useEffect(() => {
    if (profile && profile.photo) {
      setImage(profile.photo)
    }
  }, [profile])

  return (
    <View>
      <View style={styles.container}>
        <Avatar photo={image} />
        <ImageUploader onUpload={setImage} onError={getError} />
      </View>

      <Button text="Save" onPress={handlePress} />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Gaps.g20,
    paddingHorizontal: 30,
    paddingVertical: 20,
  },
  image: {
    width: 70,
    height: 70,
    borderRadius: 35,
  },
})

export default Profile
