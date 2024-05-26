import {executeQuery} from "../config/database.js";

export const createTransferTable = async () => {
    try {
        const query = `CREATE TABLE IF NOT EXISTS transfer (
            transferId INT AUTO_INCREMENT PRIMARY KEY NOT NULL,
            walletId INT NOT NULL, 
            FOREIGN KEY(walletId) REFERENCES wallets(id),
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            currency VARCHAR(3) CHECK(currency IN ('NGN','ngn','USD','usd')) NOT NULL,
            amount DECIMAL NOT NULL

        )`;
    await executeQuery(query, []);
    console.log("Transfer table created");    
    } catch (error) {
        console.log("Error creating Transfer table", error);
    }
};