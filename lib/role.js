const db = require('../db/connection')

// displays the roles table
viewAllRoles = () => {
    return new Promise((resolve, reject) => {
        db.query('SELECT * FROM roles', (err, results) => {
            if (err) {
                reject(err)
            } else {
                resolve(results)
            }
        })
    })
}

// adds a row to the roles table given user input
addRole = (roleName, salary, departmentName) => {
    return new Promise((resolve, reject) => {
        // finds department_id using the department name
        db.query('SELECT id FROM departments WHERE name = ?', [departmentName], (err, results) => {
            if (err) {
                reject(err)
            } else {
                const departmentId = results[0].id

                db.query('INSERT INTO roles (title, salary, department_id) VALUES (?, ?, ?)', [roleName, salary, departmentId], (err, results) => {
                    if (err) {
                        reject(err)
                    } else {
                        resolve(results)
                    }

                })
            }
        })
    })
}

// changes employees role by giving a different role id
updateEmployeeRole = (employeeId, roleId) => {
    return new Promise((resolve, reject) => {
        db.query('UPDATE employees SET role_id = ? WHERE id = ?', [roleId, employeeId], (err, results) => {
            if (err) {
                reject(err)
            } else {
                resolve(results)
            }
        })
    })
}

module.exports = { viewAllRoles, addRole, updateEmployeeRole }