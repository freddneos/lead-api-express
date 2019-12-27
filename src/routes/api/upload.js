const express = require('express');
const router = express.Router();
const multiparty = require('connect-multiparty');
const uploadController = require('../../controllers/uploadController');

/*
 * post
 */
router.post('/',multiparty(), uploadController.upload);

module.exports = router;
