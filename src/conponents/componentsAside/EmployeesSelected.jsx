import React, { useEffect, useState } from 'react';

function EmployeesSelected() {
  const [storedEmp , setStoredEmp ] = useState([]);
  const [selectedEmployees, setSelectedEmployees] = useState([]);



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
    localStorage.setItem('selectedEmployees', JSON.stringify(selectedEmployees));

    };


    window.addEventListener('selectedEmployeesChanged', handleSelectedEmployeesChange);

    return () => {
      window.removeEventListener('selectedEmployeesChanged', handleSelectedEmployeesChange);
    };
  }, [storedEmp]);


  function handleSelectEmp(employeeId) {
alert(employeeId);
  }

  async function handleRemoveEmployee(employeeId) {
    const updatedSelectedEmployees = await storedEmp.filter(
      employee => employee.employeeId !== employeeId
          );

    // const selectedEmployeeCount = updatedSelectedEmployees.length;
    
    await localStorage.setItem('selectedEmployees', JSON.stringify(updatedSelectedEmployees));
    await setStoredEmp(updatedSelectedEmployees);

    setSelectedCount(selectedEmployeeCount);
    localStorage.setItem('selectedEmployeeCount', selectedEmployeeCount);

    // Dispatch a custom event to notify other components about the change
    const event = new CustomEvent('removeEventListener', {
      detail: { selectedEmployees: updatedSelectedEmployees },
    });
    window.dispatchEvent(event);

  }

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
                <div style={{ textAlign: 'center' }}>

<div>
                      <h2>จำนวนพนักงานที่เลือก: {storedEmp.length}</h2>
                      <ul style ={{listStyle:'none'}}>
                      {storedEmp.map((employee) => (
                          <li key={employee.employeeId}>
                          {employee.name}

                          <button onClick={() => handleSelectEmp(employee.employeeId)} style={{
                            width: '5rem', height: '2rem', margin: '0.2rem',borderRadius: '8px'
                            }}>เลือก</button>

                          <button onClick={() => handleRemoveEmployee(employee.employeeId)} style={{
                            width: '5rem', height: '2rem', margin: '0.2rem',borderRadius: '8px'
                            }}>นำออก</button>
                        </li>
                      ))}

                      </ul>
                      </div>

                    </div>

)}
    
    </div>
  );
  }

export default EmployeesSelected;
