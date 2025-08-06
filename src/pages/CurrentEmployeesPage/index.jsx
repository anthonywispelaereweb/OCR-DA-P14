import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectAllEmployees } from '../../store/employeesSlice';
import AppTable from '../../components/AppTable';

const CurrentEmployeesPage = () => {
  const employees = useSelector(selectAllEmployees);

  // Fonction pour formater les dates
  const formatDate = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString('fr-FR');
  };

  // Configuration des colonnes du tableau
  const columns = [
    { key: 'firstName', label: 'First Name' },
    { key: 'lastName', label: 'Last Name' },
    { 
      key: 'startDate', 
      label: 'Start Date',
      render: (value) => formatDate(value)
    },
    { key: 'department', label: 'Department' },
    { 
      key: 'dateOfBirth', 
      label: 'Date of Birth',
      render: (value) => formatDate(value)
    },
    { key: 'street', label: 'Street' },
    { key: 'city', label: 'City' },
    { key: 'state', label: 'State' },
    { key: 'zipCode', label: 'Zip Code' }
  ];

  return (
    <div className="container">
      <h1 className="page-title">Current Employees</h1>
      
      {employees.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-lg text-gray-600 mb-4">No employees found.</p>
          <Link 
            to="/" 
            className="btn-primary no-underline"
          >
            Create your first employee
          </Link>
        </div>
      ) : (
        <AppTable
          columns={columns}
          data={employees}
          footerLabel="Total employees"
        />
      )}
      
      <div className="text-center mt-8">
        <Link 
          to="/" 
          className="btn-primary no-underline"
        >
          ← Back to Home
        </Link>
      </div>
    </div>
  );
};

export default CurrentEmployeesPage;