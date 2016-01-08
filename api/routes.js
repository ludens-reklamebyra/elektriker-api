import express from 'express';
import {adminAuth} from './auth';
import Services from './controllers/services';
import Franchises from './controllers/franchises';

const router = express.Router();

router.get('/', (req, res) => {
  res.json({msg: `Hello world.`});
});

// Service routes
router.get('/services', Services.index);
router.post('/services', adminAuth, Services.create);

// Franchise routes
router.get('/franchises', Franchises.index);
router.post('/franchises', adminAuth, Franchises.create);

export default router;
