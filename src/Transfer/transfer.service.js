import { executeQuery } from "../config/database.js";

export const createTransfer = async (walletId, currency, amount) => {

    try {
        const query = `INSERT INTO transfer (walletId, currency, amount)
            VALUES(?, ?, ?)`

        const values = [walletId, currency, amount];

        const results = await executeQuery(query, values);

        return results;
    } catch (error) {
        console.log('Error making transfer', error)
    }
}


export const transferTo = async (walletId, amount) => {
    try {
        const query = `UPDATE wallets SET = amount - ? WHERE id = ?`;

        const values = [amount, walletId];

        const results = await executeQuery(query, values);

        return results;
    } catch (error) {
        console.log("Sapa eh Sapa ah", error);
    }
}