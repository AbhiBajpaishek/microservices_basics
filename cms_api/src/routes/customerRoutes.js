import { Router } from 'express';
import { addCustomer, getAllCustomers, getCustomer, updateCustomer, deleteCustomer } from '../controllers/customerController';

const router = Router();

router.post('/', addCustomer);
router.get('/', getAllCustomers);
router.get('/:id', getCustomer);
router.put('/:id', updateCustomer);
router.delete('/:id', deleteCustomer);

export default router;
