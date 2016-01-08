import express from 'express';
import {adminAuth} from './auth';
import Franchises from './controllers/franchises';

const router = express.Router();

router.get('/', (req, res) => {
  res.json({msg: `Hello world.`});
});

// Franchise routes
router.get('/franchises', Franchises.index);
router.post('/franchises', adminAuth, Franchises.create);

export default router;
