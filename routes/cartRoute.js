const router = require('express').Router();
const CartController = require('../controllers/cartController');
const authentication = require('../middlerwares/auth');
const { authorGetUserCarts } = require('../middlerwares/cartAuth');

router.use(authentication);
router.post('/', CartController.createCart);

router.get('/:userId', authorGetUserCarts, CartController.getCarts);

module.exports = router;