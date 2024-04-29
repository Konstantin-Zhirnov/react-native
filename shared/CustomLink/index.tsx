import React from 'react'
import { Link } from 'expo-router'
import { StyleSheet, Text } from 'react-native'
import { LinkProps } from 'expo-router/build/link/Link'

import { Colors, Fonts } from '../tokens'

const CustomLink = ({ text, ...props }: LinkProps & { text: string }) => {
  return (
    <Link style={styles.link} {...props}>
      <Text>{text}</Text>
    </Link>
  )
}

const styles = StyleSheet.create({
  link: {
    fontSize: Fonts.f18,
    color: Colors.link,
    fontFamily: Fonts.regular,
  },
})

export { CustomLink }
