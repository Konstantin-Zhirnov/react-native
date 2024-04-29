import React from 'react'
import { Image, StyleSheet, View } from 'react-native'
import { DrawerContentComponentProps, DrawerContentScrollView } from '@react-navigation/drawer'
import { useAtom, useSetAtom } from 'jotai'

import { CloseDrawer } from '../../../../features/layout/ui/CloseDrawer'

import { Colors } from '../../../../shared/tokens'
import { CustomLink } from '../../../../shared/CustomLink'

import { loadProfileAtom } from '../../../../entities/user/model/user.state'
import { logoutAtom } from '../../../../entities/auth/model/auth.state'
import { UserMenu } from '../../../user/ui/UserMenu'
import CoursesIcon from '../../../../assets/menu/courses'
import ProfileIcon from '../../../../assets/menu/profile'
import { MenuItem } from '../../../../entities/layout/ui/MenuItem'

const MENU = [
  { text: 'Courses', icon: <CoursesIcon />, path: 'index' },
  { text: 'Profile', icon: <ProfileIcon />, path: 'profile' },
]
const CustomDrawer = (props: DrawerContentComponentProps) => {
  const logout = useSetAtom(logoutAtom)
  const [{ profile }, loadProfile] = useAtom(loadProfileAtom)

  const handleClick = () => {
    logout()
  }

  React.useEffect(() => {
    loadProfile()
  }, [])

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
