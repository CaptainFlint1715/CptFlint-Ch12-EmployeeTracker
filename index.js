const inquirer = require('inquirer')

const { viewAllDepartments, addDepartment } = require('./lib/department')
const { viewAllRoles, addRole, updateEmployeeRole } = require('./lib/role')
const { viewAllEmployees, addEmployee } = require('./lib/employee')



function menu() {
    inquirer.prompt([
        {
            type: 'list',
            name: 'method',
            message: 'Which method would you like to utilize?',
            choices: [
                'View all departments',
                'View all roles',
                'View all employees',
                'Add department',
                'Add role',
                'Add employee',
                'Update employee role',
            ]
        }
    ])
    // invokes relevant functions on case basis to handle requested method
        .then(answer => {
            switch (answer.method) {
                case 'View all departments':
                    viewAllDepartments()
                        .then((results) => {
                            console.table(results)
                        })
                    break;
                case 'View all roles':
                    viewAllRoles()
                        .then((results) => {
                            console.table(results)
                        })
                    break
                case 'View all employees':
                    viewAllEmployees()
                        .then((results) => {
                            console.table(results)
                        })
                    break;
                case 'Add department':
                    promptAddDepartment()
                    break;
                case 'Add role':
                    promptAddRole()
                    break;
                case 'Add employee':
                    promptAddEmployee()
                    break;
                case 'Update employee role':
                    promptUpdateEmployeeRole()
                    break;
            }
        })
        .catch(err => {
            console.log('error occured', err);
            process.exit(1)
        })
}

// solicits info for new department to be passed to addDepartment function
function promptAddDepartment() {
    inquirer
        .prompt([
            {
                type: 'input',
                name: 'departmentName',
                message: 'Provide name for new department',
            },
        ])
        .then((answer) => {
            const departmentName = answer.departmentName.trim()
            if (departmentName) {
                addDepartment(departmentName)
                    .then(() => {
                        console.log('department added!')
                        menu()
                    })
                    .catch((err) => {
                        console.log('error adding department', err)
                        menu()
                    })
            } else {
                console.log('please provide valid department name')
                menu()
            }
        })
        .catch((err) => {
            console.log('error occurred', err)
            process.exit(1)
        })
}

// solicits info for new role to be passed to addRole function
function promptAddRole() {
    inquirer
        .prompt([
            {
                type: 'input',
                name: 'roleName',
                message: 'Provide name for new role',
            },
            {
                type: 'input',
                name: 'salary',
                message: 'Provide salary for the new role',
            },
            {
                type: 'input',
                name: 'department',
                message: 'Provide department for the new role',
            },
        ])
        .then((answers) => {
            const roleName = answers.roleName.trim()
            const salary = parseFloat(((answers.salary)).replace(/\D/g, ''))
            const department = answers.department.trim()

            // function ensuring that the department entered matches one existing in the database
            const departmentExists = function (department) {
                return new Promise((resolve, reject) => {
                    // counts number of departments by given name (should be 1), if there are 0 it returns false
                    db.query('SELECT COUNT(*) AS count FROM departments WHERE name = ?', [department], (err, results) => {
                        if (err) {
                            reject(err);
                        } else {
                            const count = results[0].count
                            resolve(count > 0)
                        }
                    });
                });
            }
            // ensures roleName is provided, salary is a number and calls function verifying department
            if (roleName && !isNaN(salary) && departmentExists) {
                addRole(roleName, salary, department)
                    .then(() => {
                        console.log('Role added!')
                        menu()
                    })
                    .catch((err) => {
                        console.log('Error adding role', err)
                        menu()
                    });
            } else {
                console.log('Please provide valid role information');
                menu();
            }
        })
        .catch((err) => {
            console.log('Error occurred', err);
            process.exit(1);
        });
}


function promptAddEmployee() {
    inquirer
        .prompt([
            {
                type: 'input',
                name: 'firstName',
                message: "Provide the employee's first name",
            },
            {
                type: 'input',
                name: 'lastName',
                message: "Provide the employee's last name",
            },
            {
                type: 'input',
                name: 'role',
                message: "Provide the employee's role",
            },
            // checks whether new employee is a manager or not
            {
                type: 'input',
                name: 'isManager',
                message: "Is the employee a manager? (yes/no)",
                validate: function (input) {
                    return input === 'yes' || input === 'no' || 'Please enter "yes" or "no"'
                }
            },
            // if employee is a manager, these questions will not be askes as they are not applicable
            {
                type: 'input',
                name: 'manager1',
                message: "Provide the employee's manager's first name",
                when: function (answers) {
                    return answers.isManager === 'no'
                }
            },
            {
                type: 'input',
                name: 'manager2',
                message: "Provide the employee's manager's last name",
                when: function (answers) {
                    return answers.isManager === 'no'
                }
            },
        ])
        .then((answers) => {
            const firstName = answers.firstName.trim();
            const lastName = answers.lastName.trim();
            const role = answers.role.trim()
            const isManager = answers.isManager
            // checks role exists in database
            const roleExists = (role) => {
                return new Promise((resolve, reject) => {
                    db.query('SELECT COUNT(*) AS count FROM roles WHERE title = ?', [role], (err, results) => {
                        if (err) {
                            reject(err);
                        } else {
                            const count = results[0].count;
                            if (count > 0) {
                                resolve(true);
                            } else {
                                console.log('role does not exist')
                                resolve(false)
                            }
                        }
                    });
                });
            }
            // checks manager exists in database(only called if new employee isn't a manager and thus has a manager)
            const managerExists = (managerFirst, managerLast) => {
                return new Promise((resolve, reject) => {
                    db.query('SELECT COUNT(*) AS count FROM employees WHERE first_name = ? AND last_name = ?', [managerFirst, managerLast], (err, results) => {
                        if (err) {
                            reject(err);
                        } else {
                            const count = results[0].count;
                            if (count > 0) {
                                resolve(true)
                            } else {
                                console.log('manager does not exist')
                                resolve(false)
                            }
                        }
                    })
                });

            }

            // passes null values for manager first and last names
            if (isManager === 'yes') {
                if (firstName && lastName && roleExists) {
                    addEmployee(firstName, lastName, role, null, null)
                        .then(() => {
                            console.log('employee added!')
                            menu()
                        })
                        .catch((err) => {
                            console.log('error adding employee', err)
                            menu()
                        })
                } else {
                    console.log('please provide valid employee info')
                    menu()
                }
            // passes given values for manager first and last names if employee has a manager
            } else if (isManager === 'no') {
                const managerFirst = answers.manager1.trim();
                const managerLast = answers.manager2.trim()

                if (firstName && lastName && roleExists && managerExists) {
                    addEmployee(firstName, lastName, role, managerFirst, managerLast)
                        .then(() => {
                            console.log('employee added!')
                            menu()
                        })
                        .catch((err) => {
                            console.log('error adding employee', err)
                            menu()
                        })
                } else {
                    console.log('please provide valid employee info')
                    menu()
                }
            }

        })
        .catch((err) => {
            console.log('Error occurred', err);
            process.exit(1);
        });
}

function promptUpdateEmployeeRole() {
    Promise.all([viewAllEmployees(), viewAllRoles()])
        .then(([employees, roles]) => {
            // creates array of employee objects which can be selected from
            const employeeChoices = employees.map((employee) => ({
                name: `${employee.first_name} ${employee.last_name}`,
                value: employee.id,
            }))

            const roleChoices = roles.map((role) => ({
                name: role.title,
                value: role.id,
            }))

            inquirer
                .prompt([
                    {
                        type: 'list',
                        name: 'employeeId',
                        message: 'select employee to update',
                        choices: employeeChoices,
                    },
                    {
                        type: 'list',
                        name: 'roleId',
                        message: 'select a new role for employee',
                        choices: roleChoices,
                    }
                ])
                .then((answers) => {
                    const { employeeId, roleId } = answers

                    updateEmployeeRole(employeeId, roleId)
                        .then(() => {
                            console.log('updated employee role!')
                            menu()
                        })
                        .catch((err) => {
                            console.log('error error updating employee role', err)
                            menu()
                        })
                })
                .catch((err) => {
                    console.log('error occurred', err)
                    process.exit(1)
                })
        })
        .catch((err) => {
            console.log('error retrieving data for employee or role', err)
            process.exit(1)
        })
}

menu()
