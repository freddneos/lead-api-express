var express = require('express');
var router = express.Router();
var campaignController = require('../../controllers/campaignController.js');
const {check,validationresult} = require('express-validator');


/*
 * GET
 */
router.get('/search/:query',[
    check('query', '!query must be at least 4 characters')
        .isLength({ min: 4 })
], campaignController.find);


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
 * POST
 */
router.post('/highlight/:campaign_id', campaignController.addHighlight);


/*
 * POST
//  */
router.post('/recomended/:campaign_id', campaignController.addRecomended);


// /*
//  * POST
//  */
router.post('/contacts/:campaign_id', campaignController.addContact);


// /*
//  * DELETE
//  */
router.delete('/highlight/:campaign_id', campaignController.delHighlight);


// /*
//  * DELETE
//  */
router.delete('/recomended/:campaign_id', campaignController.delRecomended);


// /*
//  * DELETE
//  */
router.delete('/contacts/:campaign_id', campaignController.delContact);

/*
 * PUT
 */
router.put('/:id', campaignController.update);

/*
 * DELETE
 */
router.delete('/:id', campaignController.remove);

module.exports = router;
