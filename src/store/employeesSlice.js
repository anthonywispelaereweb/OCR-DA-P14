import { createSlice } from '@reduxjs/toolkit'
import { getInitalData, addLocalEmployee } from '../utils/initalData'
const initialState = {
  employees: getInitalData() || [],
  loading: false,
  error: null
}

const employeesSlice = createSlice({
  name: 'employees',
  initialState,
  reducers: {
    addEmployee: (state, action) => {
      const newEmployee = {
        id: Date.now(), // Simple ID generation
        ...action.payload,
        createdAt: new Date().toISOString()
      }
      addLocalEmployee(newEmployee) // Save to local storage
      // Add the new employee to the state
      state.employees.push(newEmployee)
    },
    removeEmployee: (state, action) => {
      state.employees = state.employees.filter(employee => employee.id !== action.payload)
    },
    updateEmployee: (state, action) => {
      const { id, ...updates } = action.payload
      const existingEmployee = state.employees.find(employee => employee.id === id)
      if (existingEmployee) {
        Object.assign(existingEmployee, updates)
      }
    },
    clearEmployees: state => {
      state.employees = []
    }
  }
})

export const { addEmployee, removeEmployee, updateEmployee, clearEmployees } = employeesSlice.actions

// Selectors
export const selectAllEmployees = state => state.employees.employees
export const selectEmployeeById = (state, employeeId) => state.employees.employees.find(employee => employee.id === employeeId)
export const selectEmployeesCount = state => state.employees.employees.length

export default employeesSlice.reducer
