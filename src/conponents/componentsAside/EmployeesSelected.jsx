import React, { useEffect, useState } from 'react';

function EmployeesSelected({ onEmployeeSelect }) {
  const [storedEmp, setStoredEmp] = useState([]);
  const [selectedEmployees, setSelectedEmployees] = useState([]);
  const [selectedEmployee, setSelectedEmployee] = useState(null);


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
      // console.log('Item does not exist');
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



  const handleEmployeeSelect = (selectedEmployee) => {
    setSelectedEmployee(selectedEmployee);
    // alert(selectedEmployee.employeeId);
    onEmployeeSelect(selectedEmployee);
  };

  async function handleRemoveEmployee(employeeId) {
    const updatedSelectedEmployees = await storedEmp.filter(
      employee => employee.employeeId !== employeeId
    );

    // const selectedEmployeeCount = updatedSelectedEmployees.length;

    await localStorage.setItem('selectedEmployees', JSON.stringify(updatedSelectedEmployees));

    await setStoredEmp(updatedSelectedEmployees);
    // const test = JSON.parse(localStorage.getItem('selectedEmployees')) || [];
    // alert(test.length);


    // Dispatch a custom event to notify other components about the change
    /*
        const event = new CustomEvent('removeEventListener', {
          detail: { selectedEmployees: updatedSelectedEmployees },
        });
        window.dispatchEvent(event);
    */

    // Dispatch a custom event to notify other components about the change
    const event = new CustomEvent('selectedEmployeesChanged', {
      detail: { selectedEmployees: updatedSelectedEmployees },
    });
    window.dispatchEvent(event);
    // Do any additional processing or redirection as needed

  }


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
            <h3>จำนวนพนักงานที่เลือก: {storedEmp.length}</h3>
            <ul style={{ listStyle: 'none', marginLeft: "-2rem" }}>
              {storedEmp.map((employee) => (
                <li key={employee.employeeId}>
                  {employee.name}

                  <button onClick={() => handleEmployeeSelect(employee)} style={{
                    width: '5rem', height: '2rem', margin: '0.2rem', borderRadius: '8px'
                  }}>เลือก</button>

                  <button type="button" onClick={() => handleRemoveEmployee(employee.employeeId)} style={{
                    width: '5rem', height: '2rem', margin: '0.2rem', borderRadius: '8px'
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
