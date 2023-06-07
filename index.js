const inquirer = require('inquirer')
const lib = require('./lib')

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
        .then(answer => {
            switch (answer.method) {
                case 'View all departments':
                    lib.viewAllDepartments()
                    console.log(results)
                    break;
                case 'View all roles':
                    lib.viewAllRoles()
                    console.log(results)
                    break;
                case 'View all employees':
                    lib.viewAllEmployees()
                    console.log(results)
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
                lib.addDepartment(departmentName)
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

function promptAddRole() {
    inquirer
        .prompt([
            {
                type: 'input',
                name: 'roleName',
                message: 'Provide name for new role',
            },
        ])
        .then((answer) => {
            const roleName = answer.roleName.trim()
            if (roleName) {
                lib.addRole(roleName)
                    .then(() => {
                        console.log('role added!')
                        menu()
                    })
                    .catch((err) => {
                        console.log('error adding role', err)
                        menu()
                    })
            } else {
                console.log('please provide valid role name')
                menu()
            }
        })
        .catch((err) => {
            console.log('error occurred', err)
            process.exit(1)
        })
}

function promptAddEmployee() {
    inquirer
        .prompt([
            {
                type: 'input',
                name: 'employeeName',
                message: 'Provide name for new employee',
            },
        ])
        .then((answer) => {
            const employeeName = answer.employeeName.trim()
            if (employeeName) {
                lib.addEmployee(employeeName)
                    .then(() => {
                        console.log('employee added!')
                        menu()
                    })
                    .catch((err) => {
                        console.log('error adding employee', err)
                        menu()
                    })
            } else {
                console.log('please provide valid employee name')
                menu()
            }
        })
        .catch((err) => {
            console.log('error occurred', err)
            process.exit(1)
        })
}

function promptUpdateEmployeeRole() {
    Promise.all([lib.getAllEmployees(), lib.getAllRoles()])
        .then(([employees, roles]) => {
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

                    lib.updateEmployeeRole(employeeId, roleId)
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
