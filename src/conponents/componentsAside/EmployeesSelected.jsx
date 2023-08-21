import React, { useEffect, useState } from 'react';

function EmployeesSelected({ onEmployeeSelect }) {
  const [storedEmp, setStoredEmp] = useState([]);
  const [selectedEmployees, setSelectedEmployees] = useState([]);
  const [selectedEmployee, setSelectedEmployee] = useState(null);


  useEffect(() => {
    const storedItem = localStorage.getItem('selectedEmployees');
    if (storedItem) {
      const parsedData = JSON.parse(storedItem);
      setStoredEmp(parsedData);
    } else {
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

    // Dispatch a custom event to notify other components about the change
    const event = new CustomEvent('selectedEmployeesChanged', {
      detail: { selectedEmployees: updatedSelectedEmployees },
    });
    window.dispatchEvent(event);
    // Do any additional processing or redirection as needed

  }


  async function handleRemoveEmployeeAll() {
    const updatedSelectedEmployees = await storedEmp.filter(
      employee => employee.employeeId === ''
    );

    await localStorage.setItem('selectedEmployees', JSON.stringify(updatedSelectedEmployees));

    await setStoredEmp(updatedSelectedEmployees);

    // Dispatch a custom event to notify other components about the change
    const event = new CustomEvent('selectedEmployeesChanged', {
      detail: { selectedEmployees: updatedSelectedEmployees },
    });
    window.dispatchEvent(event);
    // Do any additional processing or redirection as needed

  }

  return (
    <div>
      {storedEmp.length > 0 && (
        <div style={{ textAlign: 'center' }}>
          <div>
            <h7>จำนวนพนักงานที่เลือก: {storedEmp.length}</h7>
            <ul style={{ listStyle: 'none', paddingLeft: 0 }}>
              {storedEmp.map((employee) => (
                <li
                  key={employee.employeeId}
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginBottom: '0.5rem',
                    marginLeft: '-3rem',
                  }}
                >
                  <span style={{ flex: 1 }}>{employee.name}</span>
                  <div>
                    <button
                      onClick={() => handleEmployeeSelect(employee)}
                      style={{
                        width: '2rem',
                        height: '2rem',
                        margin: '0.1rem',
                        borderRadius: '8px',
                      }}
                    >
                      &#10003;
                    </button>
                    <button
                      type="button"
                      onClick={() => handleRemoveEmployee(employee.employeeId)}
                      style={{
                        width: '2rem',
                        height: '2rem',
                        margin: '0.1rem',
                        borderRadius: '8px',
                      }}
                    >
                      -
                    </button>
                  </div>
                </li>
              ))}


                
                <button
                  type="button"
                  onClick={() => handleRemoveEmployeeAll()}
                  style={{
                    margin: '0.2rem',
                    borderRadius: '8px',
                  }}
                >
                  ล้างรายการ
                </button>
              
            </ul>

          </div>
        </div>
      )}
    </div>
  );
}

export default EmployeesSelected;
