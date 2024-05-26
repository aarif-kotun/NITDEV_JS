import { executeQuery } from "../config/database.js";

export const findUser = async (email) => {
    try{
        const query = `SELECT * FROM users WHERE email = ?`;
        const users = await executeQuery(query, (email));
        return users;
    }catch (error) {
        console.log('Error finding user', error );
    }
}

export const createUser = async(email, password) => {
    try{
        const query = `INSERT INTO users (email, password) VALUES(?,?)`;
        const result = await executeQuery(query, [email, password]);
        return result;
    }catch (error){
        console.log('Error creating user', error);
    }
}


export const getUser = async() => {
    try{
        const query = `SELECT * FROM users`;
        const result = await executeQuery(query, []);
        return result;
    }catch (error){
        console.log('Error creating user', error);
    }
}

export const getOneUser = async(email) => {
    try{
        const query = `INSERT INTO users (email) VALUE(?)`;
        const result = await executeQuery(query, [email]);
        return result;
    }catch{
        console.log('User does not exist')
    }
}