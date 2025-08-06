import { Link } from 'react-router-dom'
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { Modal } from 'hrnet-plugin-modal-aw';
import 'hrnet-plugin-modal-aw/dist/style.css';
import { addEmployee } from '../../store/employeesSlice'
import AppSelect from '../../components/AppSelect'

const CreateEmployeesPage = () => {
  const dispatch = useDispatch()
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [messageModal, setMessageModal] = useState('');
  const [formData, setFormData] = useState({
    firstName: 'aze',
    lastName: 'aze',
    dateOfBirth: '2025-08-15',
    startDate: '2025-08-15',
    street: 'aze',
    city: 'aze',
    state: 'CA',
    zipCode: '12345',
    department: 'Sales'
  })

  const toggleModal = (message) => {
    setMessageModal(message);
    setIsModalOpen(!isModalOpen);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target
    console.log("🚀 ~ handleInputChange ~ value:", value)
    console.log("🚀 ~ handleInputChange ~ name:", name)
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
        <Link 
          to='/list' 
          className='btn-primary'
        >
          View Current Employees
        </Link>
      </div>
      
      <form className='form-container' onSubmit={handleSubmit}>
        <div className='flex-form'>
          <div>
            <label htmlFor="first-name" className='form-label'>
              First Name
            </label>
            <input 
              type='text' 
              id='first-name' 
              name='firstName'
              value={formData.firstName}
              onChange={handleInputChange}
              required
              className='form-input'
            />
          </div>

          <div>
            <label htmlFor='last-name' className='form-label'>
              Last Name
            </label>
            <input 
              type='text' 
              id='last-name' 
              name='lastName'
              value={formData.lastName}
              onChange={handleInputChange}
              required
              className='form-input'
            />
          </div>

          <div>
            <label htmlFor='date-of-birth' className='form-label'>
              Date of Birth
            </label>
            <input 
              id='date-of-birth' 
              type='date' 
              name='dateOfBirth'
              value={formData.dateOfBirth}
              onChange={handleInputChange}
              required
              className='form-input'
            />
          </div>

          <div>
            <label htmlFor='start-date' className='form-label'>
              Start Date
            </label>
            <input 
              id='start-date' 
              type='date' 
              name='startDate'
              value={formData.startDate}
              onChange={handleInputChange}
              required
              className='form-input'
            />
          </div>
        </div>

        <fieldset className='fieldset'>
          <legend className='legend'>Address</legend>
          
          <div className='flex-form-address'>
            <div className='span-2'>
              <label htmlFor='street' className='form-label'>
                Street
              </label>
              <input 
                id='street' 
                type='text' 
                name='street'
                value={formData.street}
                onChange={handleInputChange}
                required
                className='form-input'
              />
            </div>

            <div>
              <label htmlFor='city' className='form-label'>
                City
              </label>
              <input 
                id='city' 
                type='text' 
                name='city'
                value={formData.city}
                onChange={handleInputChange}
                required
                className='form-input'
              />
            </div>

            <div>
              <label htmlFor='state' className='form-label'>
                State
              </label>
              <AppSelect handleChangeEventSelect={handleInputChange} />
            </div>

            <div>
              <label htmlFor='zip-code' className='form-label'>
                Zip Code
              </label>
              <input 
                id='zip-code' 
                type='number' 
                name='zipCode'
                value={formData.zipCode}
                onChange={handleInputChange}
                required
                className='form-input'
              />
            </div>
          </div>
        </fieldset>

        <div className='mb-6'>
          <label htmlFor='department' className='form-label'>
            Department
          </label>
          <select 
            name='department' 
            id='department'
            value={formData.department}
            onChange={handleInputChange}
            required
            className='form-input'
          >
            <option value="Sales">Sales</option>
            <option value="Marketing">Marketing</option>
            <option value="Engineering">Engineering</option>
            <option value="Human Resources">Human Resources</option>
            <option value="Legal">Legal</option>
          </select>
        </div>

        <div className='btn-center'>
          <button 
            type='submit'
            className='btn-primary'
          >
            Save Employee
          </button>
        </div>
      </form>
      <Modal 
        isOpen={isModalOpen} 
        message={messageModal}
        onClose={toggleModal} 
      />
    </div>
  )
}

export default CreateEmployeesPage
