import React from 'react'
import { Animated, Dimensions, StyleSheet, Text } from 'react-native'

import { Fonts, Colors } from '../tokens'
import { ErrorNotificationPropsType } from './ErrorNotification.props'

const ErrorNotification = ({ error }: ErrorNotificationPropsType) => {
  const [isShown, setIsShown] = React.useState(false)

  const animatedValue = new Animated.Value(-100)

  const onEnter = () => {
    Animated.timing(animatedValue, {
      toValue: 0,
      duration: 400,
      useNativeDriver: true,
    }).start()
  }

  React.useEffect(() => {
    if (!error) return

    setIsShown(true)

    const timer = setTimeout(() => {
      setIsShown(false)
    }, 3000)

    return () => {
      clearTimeout(timer)
    }
  }, [error])

  if (!isShown) return <></>

  return (
    <Animated.View
      style={{ ...styles.container, transform: [{ translateY: animatedValue }] }}
      onLayout={onEnter}
    >
      <Text style={styles.text}>{error}</Text>
    </Animated.View>
  )
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    width: Dimensions.get('screen').width,
    top: 0,
    backgroundColor: Colors.red,
    padding: 15,
  },

  text: {
    color: Colors.white,
    fontFamily: Fonts.regular,
    fontSize: Fonts.f16,
    textAlign: 'center',
  },
})

export { ErrorNotification }
