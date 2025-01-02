const express = require('express');
const router = express.Router();
const analizePictureController = require('../controller/analizePictureController');
const {upload, multerError} = require('../middleware/multer');

router.post('/',  upload.single('imageFile'), multerError, analizePictureController.getAnalyze);

module.exports = router;
