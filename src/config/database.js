//connection string
import mysql from 'mysql'

const connection = mysql.createPool({
    connectionLimit:100,
    host:'localhost',
    user:'root',
    password:'password',
    database:'bankapi',
})

export const executeQuery = (query, values) => {
    return new Promise((resolve, reject) => {
        connection.getConnection((err, connection) => {
            if(err){
                console.log(err)
                return reject(err)
            }
            connection.query(query, values, (error, results)=>{
                connection.release()
                if(error){
                    console.log(error)
                    return reject(error)
                }
                return resolve(results)
            })
        })
    })

}