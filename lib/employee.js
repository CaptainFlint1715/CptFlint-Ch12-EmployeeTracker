const db = require('./connection')

viewAllEmployees = () => {
    return new Promise((resolve, reject) => {
        db.query('SELECT * FROM employees', (err, results) => {
            if(err) {
                reject(err)
            } else {
                resolve(results)
            }
        })
    })
}

addEmployee= (employeeName) => {
    return new Promise((resolve, reject) => {
        db.query('INSERT INTO employees (name) VALUES (?)', [employeeName], (err, results => {
            if(err) {
                reject(err)
            } else {
                resolve(results)
            }
        }))
    })
}

updateEmployeeRole = (employeeId, roleId) => {
    return new Promise((resolve, reject) => {
        db.query('UPDATE employees SET role_id = ? WHERE id = ?', [roleId, employeeId], (err, results => {
            if(err) {
                reject(err)
            } else {
                resolve(results)
            }
        }))
    })
}

module.exports = { viewAllEmployees, addEmployee, updateEmployeeRole}
