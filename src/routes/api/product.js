const express = require('express');
const router = express.Router();
const productController = require('../../controllers/productController');
const { check, validationresult } = require('express-validator');

/*
 * GET
 */
router.get('/', productController.list);

/*
 * GET
 */
router.get('/:id', productController.show);


/*
 * GET
 */
router.get('/search/:query',[
    check('query', '!uery must be at least 4 characters')
        .isLength({ min: 4 })
], productController.find);

/*
 * POST
 */
router.post('/', [
    check('name', 'Name is required')
        .not()
        .isEmpty(),
    check('description', 'description is required')
        .not()
        .isEmpty(),
    check('category_id', 'category_id is required')
        .not()
        .isEmpty(),
    check('description', 'Description must be at least 150 characters')
        .isLength({ min: 10 })
], productController.create);

/*
 * PUT
 */
router.put('/:id', productController.update);

/*
 * DELETE
 */
router.delete('/:id', productController.remove);

module.exports = router;
