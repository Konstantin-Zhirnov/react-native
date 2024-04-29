import React from 'react'
import { Text, View } from 'react-native'
import { useLocalSearchParams } from 'expo-router'

const CoursePage = () => {
  const { alias } = useLocalSearchParams()

  return (
    <View>
      <Text style={{ color: 'white' }}>{alias}</Text>
    </View>
  )
}

export default CoursePage
