const db = require('../db/connection')

// displays employees table
viewAllEmployees = () => {
    return new Promise((resolve, reject) => {
        db.query('SELECT * FROM employees', (err, results) => {
            if (err) {
                reject(err)
            } else {
                resolve(results)
            }
        })
    })
}

// adds row to employee table given user input
addEmployee = (firstName, lastName, role, managerFirst, managerLast) => {
    return new Promise((resolve, reject) => {
        // finds role id in table from given role title
        db.query('SELECT id FROM roles WHERE title = ?', [role], (err, results) => {
            if (err) {
                reject(err)
            } else {
                const roleId = results[0].id
                // passes null value as manager_id if employee is a manager
                if (managerFirst === null || managerLast === null) {
                    db.query('INSERT INTO employees (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, NULL)', [firstName, lastName, roleId], (err, results) => {
                        if (err) {
                            reject(err)
                        } else {
                            resolve(results)
                        }
                    })
                } else {
                    // finds manager id for new employee using the manager's first and last name
                    db.query('SELECT id FROM employees WHERE first_name = ? AND last_name = ?', [managerFirst, managerLast], (err, results) => {
                        if (err) {
                            reject(err)
                        } else {
                            const managerId = results[0].id
                            db.query('INSERT INTO employees (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)', [firstName, lastName, roleId, managerId], (err, results) => {
                                if (err) {
                                    reject(err)
                                } else {
                                    resolve(results)
                                }
                            })
                        }
                    })
                }
            }
        })
    })
}

module.exports = { viewAllEmployees, addEmployee }
