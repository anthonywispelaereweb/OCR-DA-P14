import { Link } from 'react-router-dom'
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { Modal } from 'hrnet-plugin-modal-aw'
import 'hrnet-plugin-modal-aw/dist/style.css'
import { addEmployee } from '../../store/employeesSlice'
import AppInput from '../../components/AppInput'
import AppSelectGeneric from '../../components/AppSelectGeneric'
import AppDatePicker from '../../components/AppDatePicker'
import { departmentOptions, stateOptions } from '../../utils/constants.js'
const CreateEmployeesPage = () => {
  const dispatch = useDispatch()
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [messageModal, setMessageModal] = useState('')

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    dateOfBirth: '',
    startDate: '',
    street: '',
    city: '',
    state: '',
    zipCode: '',
    department: ''
  })

  const toggleModal = message => {
    setMessageModal(message)
    setIsModalOpen(!isModalOpen)
  }

  const handleInputChange = e => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = e => {
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
      toggleModal(`Please fill in the following required fields:\n${emptyFields.join('\n')}`)
      return
    }

    // Si tous les champs sont remplis, traiter la soumission
    dispatch(addEmployee(formData))

    toggleModal('Employee created successfully!')

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
    <div className='container page-container'>
      <div className='header-section'>
        <h1 className='page-title'>Create Employee</h1>
        <Link to='/list' className='btn-primary'>
          View Current Employees
        </Link>
      </div>

      <form className='form-container' onSubmit={handleSubmit}>
        <div className='flex-form'>
          <AppInput id='first-name' label='First Name' name='firstName' value={formData.firstName} onChange={handleInputChange} required />

          <AppInput id='last-name' label='Last Name' name='lastName' value={formData.lastName} onChange={handleInputChange} required />

          <AppDatePicker
            id='date-of-birth'
            label='Date of Birth'
            name='dateOfBirth'
            value={formData.dateOfBirth}
            onChange={handleInputChange}
            dropdownPosition='right'
            required
          />

          <AppDatePicker
            id='start-date'
            label='Start Date'
            name='startDate'
            value={formData.startDate}
            onChange={handleInputChange}
            dropdownPosition='left'
            required
          />
        </div>

        <fieldset className='fieldset'>
          <legend className='legend'>Address</legend>

          <div className='flex-form-address'>
            <div className='span-2'>
              <AppInput id='street' label='Street' name='street' value={formData.street} onChange={handleInputChange} required />
            </div>

            <AppInput id='city' label='City' name='city' value={formData.city} onChange={handleInputChange} required />

            <div>
              <label htmlFor='state' className='form-label'>
                State
              </label>
              <AppSelectGeneric
                id='state'
                label='State'
                name='state'
                value={formData.state}
                onChange={handleInputChange}
                options={stateOptions}
                required
                placeholder='Select a state'
              />
            </div>

            <AppInput id='zip-code' label='Zip Code' type='number' name='zipCode' value={formData.zipCode} onChange={handleInputChange} required />
          </div>
        </fieldset>

        <div className='mb-6'>
          <AppSelectGeneric
            id='department'
            label='Department'
            name='department'
            value={formData.department}
            onChange={handleInputChange}
            options={departmentOptions}
            required
            placeholder='Select a department'
          />
        </div>

        <div className='btn-center'>
          <button type='submit' className='btn-primary'>
            Save Employee
          </button>
        </div>
      </form>
      <Modal isOpen={isModalOpen} message={messageModal} onClose={toggleModal} />
    </div>
  )
}

export default CreateEmployeesPage
