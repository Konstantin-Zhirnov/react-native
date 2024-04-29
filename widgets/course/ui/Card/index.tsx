import React from 'react'
import { Image, Linking, StyleSheet, Text, View } from 'react-native'
import MaskedView from '@react-native-masked-view/masked-view'
import { LinearGradient } from 'expo-linear-gradient'

import { StudentCourseDescription } from '../../../../entities/course/model/course.model'
import { CourseProgress } from '../../../../entities/course/ui/CourseProgress'
import { Colors, Fonts, Gaps, Radius } from '../../../../shared/tokens'
import { Button } from '../../../../shared/Button'
import Chip from '../../../../shared/Chip'

const Card: React.FC<StudentCourseDescription> = ({
  image,
  shortTitle,
  courseOnDirection,
  alias,
  tariffs,
}) => {
  const handlePress = () => {
    Linking.openURL(`https://purpleschool.ru/course/${alias}`)
  }

  return (
    <View style={styles.card}>
      <Image source={{ uri: image }} style={styles.image} height={200} />
      <View style={styles.header}>
        <CourseProgress totalLessons={120} passedLessons={40} />
        <Text style={styles.title}>{shortTitle}</Text>
        <View style={styles.chips}>
          {courseOnDirection.length > 0 &&
            courseOnDirection.map((c) => <Chip key={c.direction.name} text={c.direction.name} />)}
        </View>
        <MaskedView
          maskElement={<Text style={styles.tariff}>Price &laquo;{tariffs[0].name}&raquo;</Text>}
        >
          <LinearGradient
            colors={['#D77BE5', '#6C38CC']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
          >
            <Text style={{ ...styles.tariff, ...styles.tariffWithOpacity }}>
              Price &laquo;{tariffs[0].name}&raquo;
            </Text>
          </LinearGradient>
        </MaskedView>
      </View>
      <View style={styles.footer}>
        <Button text="Buy" onPress={handlePress} />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'column',
    borderRadius: Radius.r10,
    backgroundColor: Colors.blackLight,
  },
  image: {
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  header: {
    paddingHorizontal: 24,
    paddingVertical: 18,
  },
  title: {
    fontFamily: Fonts.bold,
    fontSize: Fonts.f20,
    color: Colors.white,
    marginBottom: 12,
  },
  chips: {
    flexDirection: 'row',
    gap: Gaps.g10,
  },
  tariff: {
    fontFamily: Fonts.regular,
    fontSize: Fonts.f16,
    marginTop: 10,
  },
  tariffWithOpacity: {
    opacity: 0,
  },
  footer: {
    backgroundColor: Colors.violetDark,
    paddingHorizontal: 24,
    paddingVertical: 20,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
  },
})
export default Card
