import { configureStore } from '@reduxjs/toolkit'
import employeesReducer from './employeesSlice'

export const store = configureStore({
  reducer: {
    employees: employeesReducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['persist/PERSIST']
      }
    })
})

export default store
