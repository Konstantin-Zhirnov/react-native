import React from 'react'
import { Image, StyleSheet } from 'react-native'

interface IProps {
  photo: string | null
}
const Avatar: React.FC<IProps> = ({ photo }) => {
  if (!photo) {
    return <Image source={require('../../../../assets/images/avatar.png')} />
  }
  return <Image style={styles.image} source={{ uri: photo }} />
}

const styles = StyleSheet.create({
  image: {
    width: 70,
    height: 70,
    borderRadius: 35,
  },
})

export { Avatar }
