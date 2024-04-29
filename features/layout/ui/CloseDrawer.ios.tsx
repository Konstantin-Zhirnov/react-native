import React from 'react'
import { Pressable, StyleSheet, View } from 'react-native'
import { DrawerNavigationHelpers } from '@react-navigation/drawer/lib/typescript/src/types'

import CloseIcon from '../../../assets/icons/close'

const CloseDrawer = (navigation: DrawerNavigationHelpers) => {
  const handlePress = () => {
    navigation.closeDrawer()
  }

  return (
    <Pressable onPress={handlePress}>
      <View style={styles.button}>
        <CloseIcon />
      </View>
    </Pressable>
  )
}

const styles = StyleSheet.create({
  button: {
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    top: 20,
    right: 20,
  },
})

export { CloseDrawer }
