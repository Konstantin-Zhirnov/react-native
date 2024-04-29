import React from 'react'
import * as ScreenOrientation from 'expo-screen-orientation'

export const useScreenOrientation = () => {
  const [orientation, setOrientation] = React.useState<ScreenOrientation.Orientation>()

  React.useEffect(() => {
    ScreenOrientation.getOrientationAsync().then((o) => setOrientation(o))
    ScreenOrientation.addOrientationChangeListener((e) => {
      setOrientation(e.orientationInfo.orientation)
    })

    return () => {
      ScreenOrientation.removeOrientationChangeListeners()
    }
  }, [])
  return orientation
}
