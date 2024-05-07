import React from 'react'
import { Image, StyleSheet, View } from 'react-native'
import { DrawerContentComponentProps, DrawerContentScrollView } from '@react-navigation/drawer'

import { useAppDispatch, useAppSelector } from '../../../../store'

import { CloseDrawer } from '../../../../features/layout/ui/CloseDrawer'

import { fetchProfile, getProfile } from '../../../../entities/user/model/slice'
import { MenuItem } from '../../../../entities/layout/ui/MenuItem'
import { getToken, logout } from '../../../../entities/auth/model/slice'

import { Colors } from '../../../../shared/tokens'
import { CustomLink } from '../../../../shared/CustomLink'

import CoursesIcon from '../../../../assets/menu/courses'
import ProfileIcon from '../../../../assets/menu/profile'

import { UserMenu } from '../../../user/ui/UserMenu'

const MENU = [
  { text: 'Courses', icon: <CoursesIcon />, path: 'index' },
  { text: 'Profile', icon: <ProfileIcon />, path: 'profile' },
]
const CustomDrawer = (props: DrawerContentComponentProps) => {
  const dispatch = useAppDispatch()
  const access_token = useAppSelector(getToken)
  const profile = useAppSelector(getProfile)

  const handleClick = () => {
    dispatch(logout())
  }

  React.useEffect(() => {
    if (access_token) {
      dispatch(fetchProfile(access_token))
    }
  }, [access_token])

  return (
    <DrawerContentScrollView {...props} contentContainerStyle={styles.scrollView}>
      <View style={styles.content}>
        <CloseDrawer {...props.navigation} />
        <UserMenu name={profile?.name} surname={profile?.surname} photo={profile?.photo || null} />
        {MENU.map((menu) => (
          <MenuItem key={menu.text} drawer={props} {...menu} />
        ))}
      </View>
      <View style={styles.footer}>
        <CustomLink href="/login" text="Log Out" onPress={handleClick} />
        <Image
          source={require('../../../../assets/logo.png')}
          resizeMode="contain"
          style={styles.logo}
        />
      </View>
    </DrawerContentScrollView>
  )
}

const styles = StyleSheet.create({
  scrollView: {
    flex: 1,
    backgroundColor: Colors.black,
  },
  content: {
    flex: 1,
  },
  footer: {
    gap: 50,
    alignItems: 'center',
    marginBottom: 40,
  },
  logo: {
    width: 160,
  },
})

export { CustomDrawer }
