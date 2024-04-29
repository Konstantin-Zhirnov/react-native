import React from 'react'
import {
  ActivityIndicator,
  Animated,
  GestureResponderEvent,
  Pressable,
  PressableProps,
  StyleSheet,
  Text,
} from 'react-native'

import { Fonts, Colors, Radius } from '../tokens'

const Button = ({
  text,
  isLoading,
  ...props
}: PressableProps & { text: string; isLoading?: boolean }) => {
  const animatedValue = new Animated.Value(100)
  const color = animatedValue.interpolate({
    inputRange: [0, 100],
    outputRange: [Colors.primaryHover, Colors.primary],
  })

  const fideIn = (e: GestureResponderEvent) => {
    Animated.timing(animatedValue, {
      toValue: 0,
      duration: 100,
      useNativeDriver: false,
    }).start()
    props.onPressIn && props.onPressIn(e)
  }

  const fideOut = (e: GestureResponderEvent) => {
    Animated.timing(animatedValue, {
      toValue: 100,
      duration: 100,
      useNativeDriver: false,
    }).start()
    props.onPressOut && props.onPressOut(e)
  }

  return (
    <Pressable {...props} onPressIn={fideIn} onPressOut={fideOut}>
      <Animated.View style={{ ...styles.button, backgroundColor: color }}>
        {!isLoading && <Text style={styles.text}>{text}</Text>}
        {isLoading && <ActivityIndicator size="small" color={Colors.white} />}
      </Animated.View>
    </Pressable>
  )
}

const styles = StyleSheet.create({
  button: {
    height: 58,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: Radius.r10,
  },

  text: {
    color: Colors.white,
    fontSize: Fonts.f16,
    fontFamily: Fonts.regular,
  },
})

export { Button }
