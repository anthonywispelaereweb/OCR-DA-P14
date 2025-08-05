import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectAllEmployees } from '../../store/employeesSlice';

const CurrentEmployeesPage = () => {
  const employees = useSelector(selectAllEmployees);

  return (
    <div className="container page-container-xl">
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
        <div className="table-container">
          <div className="table-wrapper">
            <table className="table">
              <thead className="table-header">
                <tr>
                  <th className="table-th">First Name</th>
                  <th className="table-th">Last Name</th>
                  <th className="table-th">Start Date</th>
                  <th className="table-th">Department</th>
                  <th className="table-th">Date of Birth</th>
                  <th className="table-th">Street</th>
                  <th className="table-th">City</th>
                  <th className="table-th">State</th>
                  <th className="table-th">Zip Code</th>
                </tr>
              </thead>
              <tbody className="table-body">
                {employees.map((employee, index) => (
                  <tr 
                    key={employee.id} 
                    className={`table-row ${index % 2 === 0 ? 'table-row-even' : 'table-row-odd'}`}
                  >
                    <td className="table-td">{employee.firstName}</td>
                    <td className="table-td">{employee.lastName}</td>
                    <td className="table-td">{employee.startDate}</td>
                    <td className="table-td">{employee.department}</td>
                    <td className="table-td">{employee.dateOfBirth}</td>
                    <td className="table-td">{employee.street}</td>
                    <td className="table-td">{employee.city}</td>
                    <td className="table-td">{employee.state}</td>
                    <td className="table-td">{employee.zipCode}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="table-footer">
            <p className="table-footer-text">
              Total employees: <span className="table-count">{employees.length}</span>
            </p>
          </div>
        </div>
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