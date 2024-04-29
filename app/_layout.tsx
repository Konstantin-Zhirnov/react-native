import React from 'react'
import { Provider } from 'react-redux'
import { useFonts } from 'expo-font'
import { StatusBar } from 'expo-status-bar'
import { SplashScreen, Stack } from 'expo-router'
import { SafeAreaProvider } from 'react-native-safe-area-context'

import { store } from '../store'

import { Notification } from '../shared/Notification'
import { Colors } from '../shared/tokens'

SplashScreen.preventAutoHideAsync()

const RootLayout = () => {
  const [isLoaded] = useFonts({
    'FiraSans-Regular': require('../assets/fonts/FiraSans-Regular.ttf'),
    'FiraSans-SemiBold': require('../assets/fonts/FiraSans-SemiBold.ttf'),
  })

  const handleOnLayout = React.useCallback(async () => {
    if (isLoaded) {
      await SplashScreen.hideAsync()
    }
  }, [isLoaded])

  if (!isLoaded) {
    return null
  }

  return (
    <Provider store={store}>
      <SafeAreaProvider onLayout={handleOnLayout}>
        <Notification />
        <StatusBar style="light" />
        <Stack
          screenOptions={{
            statusBarColor: Colors.black,
            headerShown: false,
            contentStyle: {
              backgroundColor: Colors.black,
            },
          }}
        >
          <Stack.Screen name="login" />
          <Stack.Screen
            name="restore"
            options={{
              presentation: 'fullScreenModal',
            }}
          />
        </Stack>
      </SafeAreaProvider>
    </Provider>
  )
}

export default RootLayout
