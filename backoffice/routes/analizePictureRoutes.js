const express = require('express');
const router = express.Router();
const analizePictureController = require('../controller/analizePictureController');
const {upload, multerErrorHandler} = require('../middleware/multer');

router.post('/',  upload.single('imageFile'), multerErrorHandler, analizePictureController.getAnalyze);

module.exports = router;
