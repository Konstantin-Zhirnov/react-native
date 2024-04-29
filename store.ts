import { configureStore } from '@reduxjs/toolkit'
import { TypedUseSelectorHook, useSelector, useDispatch } from 'react-redux'
import authorizationReducer from './entities/auth/model/slice'
import coursesReducer from './entities/course/model/slice'
import userReducer from './entities/user/model/slice'

export const store = configureStore({
  reducer: {
    authorization: authorizationReducer,
    courses: coursesReducer,
    user: userReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export const useAppDispatch = (): AppDispatch => useDispatch<AppDispatch>()
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector
