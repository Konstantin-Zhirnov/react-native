import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

import { Avatar } from '../../../../entities/user/ui/Avatar'
import { Colors, Fonts, Gaps } from '../../../../shared/tokens'

interface IProps {
  name: string | undefined
  surname: string | undefined
  photo: string | null
}
const UserMenu: React.FC<IProps> = ({ name, surname, photo }) => {
  return (
    <View style={styles.container}>
      <Avatar photo={photo} />
      <Text style={styles.name}>
        {name} {surname}
      </Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    gap: Gaps.g8,
    marginTop: 30,
    marginBottom: 40,
  },
  name: {
    fontSize: Fonts.f16,
    fontFamily: Fonts.regular,
    color: Colors.white,
  },
})

export { UserMenu }
