import express from 'express';
import {adminAuth} from './auth';
import Services from './controllers/services';
import Franchises from './controllers/franchises';

const router = express.Router();

router.get('/', (req, res) => {
  res.json({msg: `Hello world.`});
});

// Service routes
router.param('service', Services.load);
router.get('/services', Services.index);
router.get('/services/:service', Services.show);
router.post('/services', adminAuth, Services.create);
router.put('/services/:service', adminAuth, Services.update);
router.delete('/services/:service', adminAuth, Services.destroy);

// Franchise routes
router.get('/franchises', Franchises.index);
router.post('/franchises', adminAuth, Franchises.create);

export default router;
