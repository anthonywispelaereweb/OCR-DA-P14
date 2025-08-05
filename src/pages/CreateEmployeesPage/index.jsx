import './CreateEmployeesPage.css'
import { Link } from 'react-router-dom'
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { addEmployee } from '../../store/employeesSlice'


const CreateEmployeesPage = () => {
  const dispatch = useDispatch()
  
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    dateOfBirth: '',
    startDate: '',
    street: '',
    city: '',
    state: '',
    zipCode: '',
    department: 'Sales'
  })

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    
    // Validation des champs obligatoires
    const requiredFields = {
      firstName: 'First Name',
      lastName: 'Last Name',
      dateOfBirth: 'Date of Birth',
      startDate: 'Start Date',
      street: 'Street',
      city: 'City',
      state: 'State',
      zipCode: 'Zip Code',
      department: 'Department'
    }

    const emptyFields = []
    
    for (const [field, label] of Object.entries(requiredFields)) {
      if (!formData[field] || formData[field].trim() === '') {
        emptyFields.push(label)
      }
    }

    if (emptyFields.length > 0) {
      alert(`Please fill in the following required fields:\n${emptyFields.join('\n')}`)
      return
    }

    // Si tous les champs sont remplis, traiter la soumission
    dispatch(addEmployee(formData))
    alert('Employee created successfully!')
    
    // Réinitialiser le formulaire après soumission réussie
    setFormData({
      firstName: '',
      lastName: '',
      dateOfBirth: '',
      startDate: '',
      street: '',
      city: '',
      state: '',
      zipCode: '',
      department: 'Sales'
    })
  }

  return (
    <div className='container create-employee-div'>
      <h1>Create Employee</h1>
      <Link to='/list'>Current Employees</Link>
      <form className='container' onSubmit={handleSubmit}>
        <label htmlFor='first-name'>First Name</label>
        <input 
          type='text' 
          id='first-name' 
          name='firstName'
          value={formData.firstName}
          onChange={handleInputChange}
          required
        />

        <label htmlFor='last-name'>Last Name</label>
        <input 
          type='text' 
          id='last-name' 
          name='lastName'
          value={formData.lastName}
          onChange={handleInputChange}
          required
        />

        <label htmlFor='date-of-birth'>Date of Birth</label>
        <input 
          id='date-of-birth' 
          type='date' 
          name='dateOfBirth'
          value={formData.dateOfBirth}
          onChange={handleInputChange}
          required
        />

        <label htmlFor='start-date'>Start Date</label>
        <input 
          id='start-date' 
          type='date' 
          name='startDate'
          value={formData.startDate}
          onChange={handleInputChange}
          required
        />

        <fieldset className='address'>
          <legend>Address</legend>

          <label htmlFor='street'>Street</label>
          <input 
            id='street' 
            type='text' 
            name='street'
            value={formData.street}
            onChange={handleInputChange}
            required
          />

          <label htmlFor='city'>City</label>
          <input 
            id='city' 
            type='text' 
            name='city'
            value={formData.city}
            onChange={handleInputChange}
            required
          />

          <label htmlFor='state'>State</label>
          <select 
            name='state' 
            id='state'
            value={formData.state}
            onChange={handleInputChange}
            required
          >
            <option value="">Select a state</option>
            <option value="AL">Alabama</option>
            <option value="CA">California</option>
            <option value="FL">Florida</option>
            <option value="NY">New York</option>
            <option value="TX">Texas</option>
          </select>

          <label htmlFor='zip-code'>Zip Code</label>
          <input 
            id='zip-code' 
            type='number' 
            name='zipCode'
            value={formData.zipCode}
            onChange={handleInputChange}
            required
          />
        </fieldset>

        <label htmlFor='department'>Department</label>
        <select 
          name='department' 
          id='department'
          value={formData.department}
          onChange={handleInputChange}
          required
        >
          <option value="Sales">Sales</option>
          <option value="Marketing">Marketing</option>
          <option value="Engineering">Engineering</option>
          <option value="Human Resources">Human Resources</option>
          <option value="Legal">Legal</option>
        </select>

        <button type='submit'>Save</button>
      </form>
    </div>
  )
}

export default CreateEmployeesPage
