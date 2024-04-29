import React from 'react'
import { Redirect } from 'expo-router'
import { Drawer } from 'expo-router/drawer'
import { GestureHandlerRootView } from 'react-native-gesture-handler'

import { useAppSelector } from '../../store'

import { CustomDrawer } from '../../widgets/layout/ui/CustomDrawer'

import { MenuButton } from '../../features/layout/ui/MenuButtom'

import { getToken } from '../../entities/auth/model/slice'

import { Colors, Fonts } from '../../shared/tokens'

const AppLayout = () => {
  const access_token = useAppSelector(getToken)

  if (!access_token) return <Redirect href="/login" />

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Drawer
        drawerContent={(props) => <CustomDrawer {...props} />}
        screenOptions={({ navigation }) => ({
          headerStyle: {
            backgroundColor: Colors.blackLight,
            shadowOpacity: 0,
            shadowColor: Colors.blackLight,
          },
          headerLeft: () => <MenuButton navigation={navigation} />,
          headerTitleStyle: {
            color: Colors.white,
            fontFamily: Fonts.bold,
            fontSize: Fonts.f20,
          },
          headerTitleAlign: 'center',
          sceneContainerStyle: {
            backgroundColor: Colors.black,
          },
        })}
      >
        <Drawer.Screen
          name="index"
          options={{
            title: 'My courses',
          }}
        />
        <Drawer.Screen
          name="profile"
          options={{
            title: 'Profile',
          }}
        />
      </Drawer>
    </GestureHandlerRootView>
  )
}

export default AppLayout
