import './CurrentEmployeesPage.css';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectAllEmployees } from '../../store/employeesSlice';

const CurrentEmployeesPage = () => {
  const employees = useSelector(selectAllEmployees);

  return (
    <div className="container employee-div">
      <h1>Current Employees</h1>
      
      {employees.length === 0 ? (
        <p>No employees found. <Link to="/">Create your first employee</Link></p>
      ) : (
        <div className="employees-table-container">
          <table id="employee-table" className="display">
            <thead>
              <tr>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Start Date</th>
                <th>Department</th>
                <th>Date of Birth</th>
                <th>Street</th>
                <th>City</th>
                <th>State</th>
                <th>Zip Code</th>
              </tr>
            </thead>
            <tbody>
              {employees.map((employee) => (
                <tr key={employee.id}>
                  <td>{employee.firstName}</td>
                  <td>{employee.lastName}</td>
                  <td>{employee.startDate}</td>
                  <td>{employee.department}</td>
                  <td>{employee.dateOfBirth}</td>
                  <td>{employee.street}</td>
                  <td>{employee.city}</td>
                  <td>{employee.state}</td>
                  <td>{employee.zipCode}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <p className="employees-count">
            Total employees: {employees.length}
          </p>
        </div>
      )}
      
      <Link to="/">Home</Link>
    </div>
  );
};

export default CurrentEmployeesPage;