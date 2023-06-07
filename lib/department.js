const db = require('./connection')

viewAllDepartments = () => {
    return new Promise((resolve, reject) => {
        db.query('SELECT * FROM departments', (err, results) => {
            if(err) {
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
            if(err) {
                reject(err)
            } else {
                resolve(results)
            }
        })
    })
}

addDepartment() {}

addRole() {}