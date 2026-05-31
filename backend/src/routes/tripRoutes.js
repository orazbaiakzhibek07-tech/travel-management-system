const router = require('express').Router();
const auth = require('../middleware/auth');
const { validateTrip } = require('../middleware/validate');
const { getAllTrips, getTripById, createTrip, updateTrip, deleteTrip } = require('../controllers/tripController');

router.get('/', auth, getAllTrips);
router.get('/:id', auth, getTripById);
router.post('/', auth, validateTrip, createTrip);
router.put('/:id', auth, validateTrip, updateTrip);
router.delete('/:id', auth, deleteTrip);

module.exports = router;