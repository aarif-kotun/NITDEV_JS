import { getWalletById } from "../Wallet/wallet.service.js";
import { convertCurrency } from "../utils/converter.js";
import { TransferSchema } from "../validator/transfer.js";
import { createTransfer } from "./transfer.service.js";


export const createTransferController = async (req, res) => {
    try {
        const walletId = req.param.walletId;
        const curr_user = req.user;

        if(!curr_user){
            return res.status(401).json({error: "Unauthorized, you cant access this endpoint!!"});
        }

        const {error, value} = TransferSchema.validate(req.body);

        if (error){
            return res.status(400).json({error: error.message});
        }
        const wallet  = await getWalletById(walletId);

        if (wallet.length == 0){
            return res.status(404).json({
                error: 'Wallet not found'
            })
        }
        let {currency, amount} = value;

        currency = currency.toLowerCase();

        if (wallet[0].currency !== currency) {
            amount = await convertCurrency(currency, wallet[0].currency, amount);
        }

        if(!amount) {
            return res.status(400).json({
                error: 'Error converting currency'
            })
        }

        amount = parseFloat(amount);

        if(isNaN(amount) || amount <= 0) {
            return res.status(400).json({
                error: 'Invalid amount'
            })
        }

        await TransferTo(walletId, amount);

        await createTransfer(walletID, currency, amount);

        const updatedWallet = await getWalletById(walletId);

        return res.status(201).json({
          message: "Transfer successful",
            updatedWallet,
        });

    } catch(error) {
        console.log("Error creating transfer", error.message);

        return res.status(500).json({
            error: 'Error creating transfer',
        })
    }
}