import { Router } from 'express';
import { addMoney, withdrawMoney, getAccountDetails, deleteAccount } from '../controllers/accountController';

const router = Router();

router.post('/add-money', addMoney);
router.post('/withdraw-money', withdrawMoney);
router.get('/:accountId', getAccountDetails);
router.delete('/:accountId', deleteAccount);

export default router;
