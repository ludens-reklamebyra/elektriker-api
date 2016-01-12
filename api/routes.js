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
router.param('franchise', Franchises.load);
router.get('/franchises', Franchises.index);
router.get('/franchises/:franchise', Franchises.show)
router.post('/franchises', adminAuth, Franchises.create);
router.put('/franchises/:franchise', adminAuth, Franchises.update);
router.delete('/franchises/:franchise', adminAuth, Franchises.destroy);

export default router;
