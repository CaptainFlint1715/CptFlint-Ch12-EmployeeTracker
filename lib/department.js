const db = require('../db/connection')

// displays departments table
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

// adds row to department table given user input
addDepartment = (departmentName) => {
    return new Promise((resolve, reject) => {
        db.query('INSERT INTO departments (name) VALUES (?)', [departmentName], (err, results) => {
            if (err) {
                reject(err);
            } else {
                resolve(results);
            }
        })
    })
};



module.exports = { viewAllDepartments, addDepartment }