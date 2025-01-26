import { Router } from 'express';
import { addMoney, withdrawMoney, getAccountDetails, addAccountDetails, deleteAccount } from '../controllers/accountController.js';

const router = Router();

router.post('/add-money', addMoney);
router.post('/withdraw-money', withdrawMoney);
router.get('/:accountId', getAccountDetails);
router.post('/:customerId', addAccountDetails);
router.delete('/:accountId', deleteAccount);

export default router;
