import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

import { Colors, Fonts, Radius } from '../../../../shared/tokens'

interface IProps {
  totalLessons: number
  passedLessons: number
}
const CourseProgress: React.FC<IProps> = ({ totalLessons, passedLessons }) => {
  const percent = Math.round((passedLessons / totalLessons) * 100)

  return (
    <View style={styles.container}>
      <View style={styles.head}>
        <Text style={styles.textPercent}>{percent}%</Text>
        <Text style={styles.textCount}>
          {passedLessons} / {totalLessons}
        </Text>
      </View>
      <View style={styles.bar}>
        <View style={{ ...styles.progress, width: `${percent}%` }} />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 6,
  },
  head: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 6,
  },
  textPercent: {
    fontFamily: Fonts.regular,
    fontSize: Fonts.f16,
    color: Colors.secondary,
  },
  textCount: {
    fontFamily: Fonts.regular,
    fontSize: Fonts.f12,
    color: Colors.grayLight,
  },
  bar: {
    height: 5,
    borderRadius: Radius.r20,
    backgroundColor: Colors.border,
  },
  progress: {
    height: 5,
    borderRadius: Radius.r20,
    backgroundColor: Colors.secondary,
  },
})

export { CourseProgress }
