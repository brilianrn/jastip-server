const router = require('express').Router();
const CheckoutController = require('../controllers/checkoutController');
const authentication = require('../middlerwares/auth');

router.use(authentication);
router.post('/addCo', CheckoutController.addCheckout);
router.get('/getCo/:id', CheckoutController.findOne);

module.exports = router;