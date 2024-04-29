import React from 'react'
import { Pressable, PressableProps, StyleSheet, View } from 'react-native'

import MenuIcon from '../../../../assets/icons/menu'
import { Colors } from '../../../../shared/tokens'

const MenuButton = ({ navigation, ...props }: PressableProps & { navigation: any }) => {
  const [clicked, setClicked] = React.useState(false)

  const handleClick = (value: boolean) => () => {
    setClicked(value)
  }

  const handlePress = () => {
    navigation.toggleDrawer()
  }

  return (
    <Pressable
      {...props}
      onPressIn={handleClick(true)}
      onPressOut={handleClick(false)}
      onPress={handlePress}
    >
      <View
        style={{
          ...styles.button,
          backgroundColor: clicked ? Colors.violetDark : Colors.blackLight,
        }}
      >
        <MenuIcon />
      </View>
    </Pressable>
  )
}

const styles = StyleSheet.create({
  button: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
    flex: 1,
  },
})

export { MenuButton }
