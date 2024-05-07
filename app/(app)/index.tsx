import React from 'react'
import { StyleSheet, View, FlatList, ActivityIndicator, RefreshControl } from 'react-native'
import * as Notifications from 'expo-notifications'

import { useAppDispatch, useAppSelector } from '../../store'

import Card from '../../widgets/course/ui/Card'

import { getCourses, getLoading, fetchCourses } from '../../entities/course/model/slice'
import { getToken } from '../../entities/auth/model/slice'
import { StudentCourseDescription } from '../../entities/course/model/course.types'

import { Colors } from '../../shared/tokens'
import { Button } from '../../shared/Button'

const Courses = () => {
  const dispatch = useAppDispatch()
  const courses = useAppSelector(getCourses)
  const isLoading = useAppSelector(getLoading)
  const token = useAppSelector(getToken)

  const allowsNotification = async () => {
    const setting = await Notifications.getPermissionsAsync()
    return (
      setting.granted || setting.ios?.status === Notifications.IosAuthorizationStatus.PROVISIONAL
    )
  }

  const requestPermissions = async () => {
    return Notifications.requestPermissionsAsync({
      ios: {
        allowAlert: true,
        allowBadge: true,
        allowSound: true,
      },
    })
  }

  const scheduleNotification = async () => {
    const granted = await allowsNotification()

    if (!granted) {
      await requestPermissions()
    }
  }

  const renderCourse = ({ item }: { item: StudentCourseDescription }) => {
    return (
      <View style={styles.container}>
        <Card {...item} />
      </View>
    )
  }

  React.useEffect(() => {
    if (token) {
      dispatch(fetchCourses(token))
    }
  }, [token])

  if (isLoading)
    return <ActivityIndicator style={styles.activity} size="large" color={Colors.primary} />

  return (
    <>
      <Button text="Remind" onPress={scheduleNotification} />
      {courses.length > 0 && (
        <FlatList
          refreshControl={<RefreshControl refreshing={isLoading} />}
          data={courses}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderCourse}
        />
      )}
    </>
  )
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  activity: {
    marginTop: 30,
  },
})

export default Courses
