const express = require('express');
const router = express.Router();
const contactController = require('../../controllers/contactController');
const {check,validationresult} = require('express-validator');

/*
 * GET
 */
router.get('/', contactController.list);

/*
 * GET
 */
router.get('/:id', contactController.show);

/*
 * POST
 */
router.post('/',[
    check('name', 'Name is required')
        .not()
        .isEmpty(),
    check('phone', 'Phone is required')
        .not()
        .isEmpty(),
    check('phone', 'Phone must be at least 9 characters')
        .isLength({ min: 9 })
], contactController.create);

/*
 * PUT
 */
router.put('/:id', contactController.update);

/*
 * DELETE
 */
router.delete('/:id', contactController.remove);

module.exports = router;
