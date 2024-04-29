import React from 'react'
import { Pressable, StyleSheet, TextInput, TextInputProps, View } from 'react-native'

import { Colors, Fonts, Radius } from '../tokens'
import EyeClosedIcon from '../../assets/icons/eye-closed'
import EyeOpenedIcon from '../../assets/icons/eye-opened'

const Input = ({ isPassword, style, ...props }: TextInputProps & { isPassword?: boolean }) => {
  const [isPasswordVisible, setIsPasswordVisible] = React.useState<boolean>(false)

  const handlePress = () => {
    setIsPasswordVisible((prevState) => !prevState)
  }
  return (
    <View style={style}>
      <TextInput
        {...props}
        placeholderTextColor={Colors.gray}
        secureTextEntry={isPassword && !isPasswordVisible}
        style={styles.input}
      />
      {isPassword && (
        <Pressable onPress={handlePress} style={styles.eyeIcon}>
          {isPasswordVisible ? <EyeOpenedIcon /> : <EyeClosedIcon />}
        </Pressable>
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  input: {
    height: 58,
    backgroundColor: Colors.violetDark,
    paddingHorizontal: 24,
    borderRadius: Radius.r10,
    fontSize: 16,
    color: Colors.gray,
    fontFamily: Fonts.regular,
  },
  eyeIcon: {
    position: 'absolute',
    right: 0,
    paddingHorizontal: 20,
    paddingVertical: 18,
  },
})

export { Input }
