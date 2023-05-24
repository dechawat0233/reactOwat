const Employee = require('../models/employee');

exports.createEmployee = (req, res) => {
  const employeeData = req.body;

  const newEmployee = new Employee(employeeData);

  newEmployee.save()
    .then(() => {
      res.status(201).json({ message: 'Employee inserted successfully' });
    })
    .catch((error) => {
      res.status(500).json({ error: 'Error inserting employee' });
    });
};
