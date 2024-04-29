import React from 'react'
import { Pressable, PressableProps, StyleSheet, Text, View } from 'react-native'
import { DrawerContentComponentProps } from '@react-navigation/drawer'

import { Colors, Fonts, Gaps } from '../../../../shared/tokens'

interface IProps {
  drawer: DrawerContentComponentProps
  icon: React.ReactNode
  text: string
  path: string
}
const MenuItem: React.FC<IProps & PressableProps> = ({ drawer, icon, text, path, ...props }) => {
  const [clicked, setClicked] = React.useState(false)

  const isActive = drawer.state.routes[drawer.state.index].name === path

  const handlePress = () => {
    drawer.navigation.navigate(path)
  }

  const handleClick = (value: boolean) => () => {
    setClicked(value)
  }

  return (
    <Pressable
      {...props}
      onPress={handlePress}
      onPressIn={handleClick(true)}
      onPressOut={handleClick(false)}
    >
      <View
        style={{
          ...styles.menu,
          borderColor: isActive ? Colors.primary : Colors.black,
          backgroundColor: clicked || isActive ? Colors.violetDark : Colors.black,
        }}
      >
        {icon}
        <Text style={styles.text}>{text}</Text>
      </View>
    </Pressable>
  )
}

const styles = StyleSheet.create({
  menu: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Gaps.g20,
    paddingHorizontal: 24,
    paddingVertical: 16,
    borderRightWidth: 5,
  },
  text: {
    color: Colors.white,
    fontSize: Fonts.f16,
    fontFamily: Fonts.regular,
  },
})

export { MenuItem }
