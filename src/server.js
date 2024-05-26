import express from 'express';
import { createUserTable } from './User/user.model.js';
import { userRouter } from './User/user.routes.js';
import { config } from './config/env.js';
import { createWalletTable } from './Wallet/wallet.model.js';
import { auth } from './middlewares/auth.js';
import { walletRouter } from './Wallet/wallet.route.js';
import { createDepositTable } from './Deposit/deposit.model.js';
import { depositRouter } from './Deposit/deposit.route.js'
import { createTransferTable } from './Transfer/transfer.model.js';
import { transferRouter } from './Transfer/transfer.routes.js';

const app = express();

app.use(express.json());



app.get('/', auth, (req, res) =>{
    res.status(200).json({
        message: 'Welcome to the home page',
        user: req.user
    })
});

app.use("/user", userRouter);
app.use("/wallet", walletRouter);
app.use("/deposit", depositRouter);
app.use("/transfer", transferRouter);



app.listen(config.port, async () => {
    await createUserTable();
    await createWalletTable();
    await createDepositTable();
    await createTransferTable();
    console.log(`server running on port ${config.port}`)
})