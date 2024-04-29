import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { Colors, Fonts, Radius } from '../tokens'

interface IProps {
  text: string
}
const Chip: React.FC<IProps> = ({ text }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>{text}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderColor: Colors.border,
    borderRadius: Radius.r17,
    borderWidth: 1,
  },
  text: {
    fontFamily: Fonts.regular,
    fontSize: Fonts.f14,
    color: Colors.white,
  },
})
export default Chip
