import React, { useState, useEffect } from 'react';

function EmployeesSelected() {
  const [employeesSelected, setEmployeesSelected] = useState([]);

  useEffect(() => {
    const handleStorageChange = (event) => {
      if (event.key === 'selectedEmployees') {
        try {
          const updatedSelectedEmployees = JSON.parse(event.newValue);
          setEmployeesSelected(updatedSelectedEmployees);
        } catch (error) {
          console.error('Error parsing user data from localStorage:', error);
        }
      }
    };

    window.addEventListener('storage', handleStorageChange);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  return (
    <div>
      {employeesSelected.length > 0 && <h2>Test employee selected</h2>}
    </div>
  );
}

export default EmployeesSelected;
