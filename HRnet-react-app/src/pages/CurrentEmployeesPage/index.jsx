import './CurrentEmployeesPage.css';
import { Link } from 'react-router-dom';

const CurrentEmployeesPage = () => {
  return (
    <div className="container employee-div">
      <h1>Current Employees</h1>
      <table id="employee-table" className="display"></table>
      <Link to="/">Home</Link>
    </div>
  );
};

export default CurrentEmployeesPage;