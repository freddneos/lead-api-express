const express = require('express');
const router = express.Router();
const categoryController = require('../../controllers/categoryController');
const {check,validationresult} = require('express-validator');

/*
 * GET
 */
router.get('/', categoryController.list);

/*
 * GET
 */
router.get('/:id', categoryController.show);

/*
 * POST
 */
router.post('/',[
    check('name', 'Name is required')
        .not()
        .isEmpty(),
    check('description', 'Description is required and need to have more than 150 characters')
        .isLength({ min: 20 })
], categoryController.create);

/*
 * PUT
 */
router.put('/:id', categoryController.update);

/*
 * DELETE
 */
router.delete('/:id', categoryController.remove);

module.exports = router;
