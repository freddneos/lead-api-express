var express = require('express');
var router = express.Router();
var campaignController = require('../../controllers/campaignController.js');

/*
 * GET
 */
router.get('/', campaignController.list);

/*
 * GET
 */
router.get('/:id', campaignController.show);

/*
 * POST
 */
router.post('/', campaignController.create);

/*
 * PUT
 */
router.put('/:id', campaignController.update);

/*
 * DELETE
 */
router.delete('/:id', campaignController.remove);

module.exports = router;
