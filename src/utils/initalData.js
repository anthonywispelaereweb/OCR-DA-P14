const getInitalData = () => {
  const localEmployees = localStorage.getItem('employees')
  if (localEmployees) {
    return JSON.parse(localEmployees)
  }
}

const addLocalEmployee = employee => {
  const localEmployees = localStorage.getItem('employees')
  const employees = localEmployees ? JSON.parse(localEmployees) : []
  employees.push(employee)
  localStorage.setItem('employees', JSON.stringify(employees))
}

export { getInitalData, addLocalEmployee }
