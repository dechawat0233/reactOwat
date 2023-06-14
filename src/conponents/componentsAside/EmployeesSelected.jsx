import React, { useEffect, useState } from 'react';

function EmployeesSelected() {
  const [storedEmp , setStoredEmp ] = useState([]);


  useEffect(() => {
    const storedItem = localStorage.getItem('selectedEmployees');
    if (storedItem) {
      // Item exists in localStorage
      // setStoredEmp(storedItem);
      const parsedData = JSON.parse(storedItem);
      setStoredEmp(parsedData);
//      console.log('Item exists:', storedItem);

    } else {
      // Item does not exist in localStorage
      console.log('Item does not exist');
    }


  }, []);


  useEffect(() => {
    // Listen for the custom event when selectedEmployees change in localStorage
    const handleSelectedEmployeesChange = (event) => {
      const { selectedEmployees } = event.detail;
      setStoredEmp(selectedEmployees);
    };

    window.addEventListener('selectedEmployeesChanged', handleSelectedEmployeesChange);

    return () => {
      window.removeEventListener('selectedEmployeesChanged', handleSelectedEmployeesChange);
    };
  }, []);

/*
  useEffect(() => {
    // Retrieve the employee object from local storage
    const storedEmployee = localStorage.getItem('employee');

    if (storedEmployee) {
      setEmployeesSelected(JSON.parse(storedEmployee));
    }
  }, []); // Empty dependency array to run the effect only once on mount
*/
/*  
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
*/

  return (
    <div>
      {/* Display selected employees */}
{/* <h2>selected employee {employeesSelected.length } item</h2> */}
      {/* {storedEmp.length > 0 && (
        <div>
          <h2>test employee selected</h2>
          <ul>
            {storedEmp.map((employeesSelected) => (
              <li key={employeesSelected.id}>{EmployeesSelected.name}</li>
            ))}
          </ul>
        </div>
      )} */}

{storedEmp.length > 0 && (
<>
<p>เลือกข้อมูลพนักงานไว้ {storedEmp.length } รายการ</p>
      {/* <h2>localStorage</h2>
      {storedEmp.map((employee) => (
        <p key={employee._id}>{employee.name}</p>
      ))} */}
</>
)}
    
    </div>
  );
  }

export default EmployeesSelected;
