import { Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { selectAllEmployees, loadMockData } from '@store/employeesSlice'
import AppTable from '@components/AppTable'
import { useSeo } from '@hooks/useSeo'

const CurrentEmployeesPage = () => {
  useSeo({
    title: "Liste des employés | HRnet",
    description: "Consultez la liste des employés enregistrés dans HRnet. Tri, recherche et pagination disponibles."
  })

  const dispatch = useDispatch()
  const employees = useSelector(selectAllEmployees)

  // Fonction pour formater les dates
  const formatDate = dateString => {
    if (!dateString) return ''
    const date = new Date(dateString)
    return date.toLocaleDateString('fr-FR')
  }

  // Configuration des colonnes du tableau
  const columns = [
    { key: 'firstName', label: 'First Name' },
    { key: 'lastName', label: 'Last Name' },
    {
      key: 'startDate',
      label: 'Start Date',
      render: value => formatDate(value)
    },
    { key: 'department', label: 'Department' },
    {
      key: 'dateOfBirth',
      label: 'Date of Birth',
      render: value => formatDate(value)
    },
    { key: 'street', label: 'Street' },
    { key: 'city', label: 'City' },
    { key: 'state', label: 'State' },
    { key: 'zipCode', label: 'Zip Code' }
  ]

  return (
    <main className='container' role='main' aria-label='Liste des employés'>
      <h1 className='page-title'>Current Employees</h1>
      {employees.length === 0 ? (
        <div className='text-center py-12'>
          <p className='text-lg text-gray-600 mb-4' role='status'>No employees found.</p>
          <Link to='/' className='btn-primary no-underline' aria-label='Créer un nouvel employé'>
            Create your first employee
          </Link>
        </div>
      ) : (
        <AppTable columns={columns} data={employees} footerLabel='Total employees' tableAriaLabel='Liste des employés' />
      )}

      <div className='btn-actions'>
        { employees.length === 0 && (<button
          className='btn-primary no-underline'
          type='button'
          onClick={() => dispatch(loadMockData())}
          aria-label='Recharger les données de démonstration'
        >
          Load Mock Data
        </button>)
        }
        <Link to='/' className='btn-primary no-underline' aria-label='Retour à l’accueil'>
          ← Back to Home
        </Link>
      </div>

    </main>
  )
}

export default CurrentEmployeesPage
