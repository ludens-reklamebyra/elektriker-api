import express from 'express';
import {adminAuth} from './auth';
import Services from './controllers/services';
import Franchises from './controllers/franchises';
import Electricians from './controllers/electricians';

const router = express.Router();

router.get('/', (req, res) => {
  res.json({msg: `Hello world.`});
});

// Service routes
router.param('service', Services.load);
router.get('/services', Services.index);
router.post('/services', adminAuth, Services.create);
router.put('/services/:service', adminAuth, Services.update);

// Franchise routes
router.get('/franchises', Franchises.index);
router.post('/franchises', adminAuth, Franchises.create);

// Electrician routes
router.param('electrician', Electricians.load);
router.get('/electricians', Electricians.index);
router.post('/electricians', adminAuth, Electricians.create);
router.put(
  '/electricians/:electrician',
  adminAuth,
  Electricians.update
);
router.get('/electricians/search', Electricians.search);

export default router;
