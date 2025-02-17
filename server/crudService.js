/**
 *
 *  data that has already made its way server-side, to interface with
 *  SQL database.
*
*   Keep in mind that the client-server architecture is very much the
*   same as it was on Roblox. You know what you're doing, man. Keep going.
*   Remember when Nicholas told us about Odin project? That was this
*
*   Essentially, crudService acts as the go-between for app.js and database
*/ 

const mysql = require('mysql');
const dotenv = require('dotenv');
const { resolve } = require('path');
const { rejects } = require('assert');
const { error } = require('console');
const { query } = require('express');
let instance = null;
dotenv.config()

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    database: 'fema',
    port:'3306'
})

connection.connect((error) => {
    if (error) {
        console.log(error.message)
    }
})

class CrudService {
    static getCrudServiceIstance() {
        return instance ? instance : new CrudService();
    }
    
    // what do you think we should do next? confirm that everything actually got added to db correct;y
    async signUpNewUser(name, email, password, type) {
        console.log("trying to insert " + name + " into db.")

        try {   
            const insertId = await new Promise((resolve, reject) => { 
                const query = "INSERT INTO users (name, email, password, type) VALUES (?, ?, ?, ?);" // Prevent SQL injection. HB
                connection.query(query, [name, email, password, type], (error, result) => { 
                    // Callback function, or so I'm told.
                    if (error) reject(new Error(error.message))
                    resolve(result) // What does resolve do, specifically?
                })
            })
            console.log(insertId)
        } catch (error) {
            console.log(error);
        }
    }

    async getAllDisasters() {
        try {
            const response = await new Promise((resolve, reject) => {
                const query = "SELECT * FROM disasters;";

                connection.query(query, (err, results) => {
                    if (err) reject(new Error(err.message));
                    resolve(results)
                })
            });
            console.log(response)
            return response
        } catch (error) {
            console.log(error)
        }
    }

    async getAllNeeds() {
        try {
            const response = await new Promise((resolve, reject) => {
                const query = "SELECT * FROM needs;";
                console.log('DERP!')
                connection.query(query, (err, results) => {
                    if (err) reject(new Error(err.message));
                    resolve(results)
                })
            });
            console.log(response)
            return response
        } catch (error) {
            console.log(error)
        }
    }

    async getDisasterById(disasterId) {
        try {
            const response = await new Promise((resolve, reject) => {
                const query = "SELECT * FROM disasters WHERE id = " + disasterId + ";";
                connection.query(query, (err, results) => {
                    if (err) reject(new Error(err.message));
                    resolve(results)
                })
            });
            console.log(response)
            return response
        } catch (error) {
            console.log(error)
        }
    }

    async getAllNeedsOfADisaster(disasterId) {
        if (disasterId) {
            try {
                const response = await new Promise((resolve, reject) => {
                    const query = "SELECT * FROM needs WHERE needs.disaster_id = " + disasterId + ";";
                    connection.query(query, (err, results) => {
                        if (err) reject(new Error(err.message));
                        resolve(results)
                    })
                });
                console.log(response)
                return response
            } catch (error) {
                console.log(error)
            }
        } else {
            throw new Error('No disaster Id provided')
        }
       
    }

    /**
     *  Here, there is a possiblity of the picture stirng being indefined,
     *  so we have two separate queries for that.
     * 
     * @param {string} type 
     * @param {string} city 
     * @param {string | undefined} picture 
     * @returns 
     * 
     * HB
     */

    async createNewDisaster(type, city, picture) { 
        console.log("trying to insert " + type + ": " + city + " " + picture + " into db.")
        try {   
            const insertId = await new Promise((resolve, reject) => { 
                let query
                if (picture) {query = "INSERT INTO disasters (type, city, picture) VALUES (?, ?, ?);"}
                else {query = "INSERT INTO disasters (type, city) VALUES (?, ?);"
            }
                connection.query(query, [type, city, picture], (error, result) => { 
                    if (error) reject(new Error(error.message))
                    resolve(result.insertId) 
                })
            })
            console.log(insertId)
            return insertId;
        } catch (error) {
            console.log(error);
            return undefined;
        }
    }

    async createNewNeed(name, disasterId, quantityMax) {
        try {
            const result = await new Promise((resolve, reject) => { 
                let query = "INSERT INTO needs (name, disaster_id, quantity_max) VALUES (?, ?, ?);"

                connection.query(query, [name, disasterId, quantityMax], (error, results) => { 
                    if (error) reject(new Error(error.message))
                    resolve(results) 
                })
            })
            console.log('insertId for need: ' + result.insertId) // Use result.insertId
        } catch (error) {
            console.log(error)
        }
    }
 
    //TODO: Prevent SQL injection. HB
    async submitDonations(donations) {
        console.log('donations: ' + donations)
        for (const donationAddition of donations) {
            try {   
                console.log('donation addition: ' + donationAddition)
                const insertId = await new Promise((resolve, reject) => { 
                    let query = "UPDATE needs SET quantity_filled = quantity_filled + " +  donationAddition[1]  + " WHERE id = " + donationAddition[0] + ";"
                    connection.query(query, (error, result) => { 
                        if (error) reject(new Error(error.message))
                        resolve(result) 
                    })
                })
                console.log(insertId)
            } catch (error) {
                console.log(error);
            }
        }
    }
    
    async setNeedStatus(needId, status) {
    try {
        const result = await new Promise((resolve, reject) => {
            // Use parameterized query to avoid SQL injection
            const query = "UPDATE needs SET status = ? WHERE id = ?";
            connection.query(query, [status, needId], (error, result) => {
                if (error) {
                    reject(new Error(error.message));
                } else {
                    resolve(result);
                }
            });
        });

        // Check if any rows were actually updated and log accordingly
        if (result.affectedRows > 0) {
            console.log(`Status updated for needId ${needId}`);
        } else {
            console.log(`No record found with needId ${needId} to update.`);
        }

        return {
            success: true,
            message: 'Status updated successfully',
            data: result
        };
    } catch (error) {
        console.log(error);
        return {
            success: false,
            message: 'Failed to update status',
            error: error.message
        };
    }
}

}

module.exports = CrudService
