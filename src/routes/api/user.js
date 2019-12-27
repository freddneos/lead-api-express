const express = require('express');
const router = express.Router();
const userController = require('../../controllers/userController');
const userMid = require('../../middleware/user');
const {check,validationresult} = require('express-validator');

/*
 * GET
 */
router.get('/', userController.list);

/*
 * GET
 */
router.get('/:id', userController.show);

/*
 * POST
 */
router.post('/',[
    check('name', 'Name is required')
        .not()
        .isEmpty(),
    check('email', 'Email is required')
        .not()
        .isEmpty(),
    check('password', 'Password is required')
        .not()
        .isEmpty(),
    check('password', 'Password must be at least 6 characters')
        .isLength({ min: 6 })
], userController.create);

/*
 * PUT
 */
router.put('/:id', userController.update);

/*
 * DELETE
 */
router.delete('/:id', userController.remove);

module.exports = router;
