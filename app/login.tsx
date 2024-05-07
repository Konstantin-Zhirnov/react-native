import React from 'react'
import { router } from 'expo-router'
import { Orientation } from 'expo-screen-orientation'
import { Dimensions, Image, KeyboardAvoidingView, Platform, StyleSheet, View } from 'react-native'

import { useAppDispatch, useAppSelector } from '../store'

import { getError, getLoading, getToken, fetchLogin } from '../entities/auth/model/slice'

import { ErrorNotification } from '../shared/ErrorNotification'
import { useScreenOrientation } from '../shared/hooks'
import { CustomLink } from '../shared/CustomLink'
import { Colors, Gaps } from '../shared/tokens'
import { Button } from '../shared/Button'
import { Input } from '../shared/Input'

const Login: React.FC = () => {
  const dispatch = useAppDispatch()
  const access_token = useAppSelector(getToken)
  const isLoading = useAppSelector(getLoading)
  const error = useAppSelector(getError)

  const [localError, setLocalError] = React.useState<string>('')

  const [email, setEmail] = React.useState('')
  const [password, setPassword] = React.useState('')

  const orientation = useScreenOrientation()

  const submit = async () => {
    if (!email) {
      setLocalError('The email has not been entered')
      return
    }
    if (!password) {
      setLocalError('The password has not been entered')
      return
    }

    dispatch(
      fetchLogin({
        email,
        password,
      }),
    )
  }

  React.useEffect(() => {
    if (error) {
      setLocalError(error)
    }
  }, [error])

  React.useEffect(() => {
    if (access_token) {
      router.replace('/(app)')
    }
  }, [access_token])

  return (
    <View style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS == 'ios' ? 'padding' : 'height'}
        style={styles.content}
      >
        <Image source={require('../assets/logo.png')} resizeMode="contain" style={styles.logo} />

        <View style={styles.form}>
          <View
            style={{
              ...styles.inputs,
              flexDirection: orientation === Orientation.PORTRAIT_UP ? 'column' : 'row',
            }}
          >
            <Input
              style={{
                width:
                  orientation === Orientation.PORTRAIT_UP
                    ? 'auto'
                    : Dimensions.get('window').width / 2 - 16 - 48,
              }}
              placeholder="Email"
              onChangeText={setEmail}
            />
            <Input
              style={{
                width:
                  orientation === Orientation.PORTRAIT_UP
                    ? 'auto'
                    : Dimensions.get('window').width / 2 - 16 - 48,
              }}
              placeholder="Password"
              isPassword
              onChangeText={setPassword}
            />
          </View>
          <Button text="Submit" isLoading={isLoading} onPress={submit} />
        </View>

        <CustomLink href="/restore" text="Forgot password?" />
      </KeyboardAvoidingView>

      <ErrorNotification error={localError} />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 55,
    backgroundColor: Colors.black,
  },

  content: {
    alignItems: 'center',
    gap: Gaps.g50,
  },

  logo: {
    width: Platform.select({ ios: 220, android: 230 }),
  },

  form: {
    alignSelf: 'stretch',
    gap: Gaps.g16,
  },

  inputs: {
    gap: Gaps.g16,
  },
})

export default Login
