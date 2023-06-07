const db = require('./connection')

viewAllDepartments = () => {
    return new Promise((resolve, reject) => {
        db.query('SELECT * FROM departments', (err, results) => {
            if (err) {
                reject(err)
            } else {
                resolve(results)
            }
        })
    })
}

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

addDepartment = (departmentName) => {
    return new Promise((resolve, reject) => {
        db.query('INSERT INTO departments (name) VALUES (?)', [departmentName], (err, results => {
            if(err) {
                reject(err)
            } else {
                resolve(results)
            }
        }))
    })
}

addRole = (roleName) => {
    return new Promise((resolve, reject) => {
        db.query('INSERT INTO roles (name) VALUES (?)', [roleName], (err, results => {
            if(err) {
                reject(err)
            } else {
                resolve(results)
            }
        }))
    })
 }

 module.exports = { viewAllDepartments, viewAllRoles, addDepartment, addRole }