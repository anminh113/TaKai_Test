const express = require('express');
const router = express.Router();
const transactionsController = require('../controllers/TransactionController');
const multer = require('multer');
const auth = require("../middleware/auth");

const upload = multer({
  dest: 'src/uploads/', // Directory where uploaded files will be stored
  limits: { fileSize: 100 * 1024 * 1024 }, // Limit file size to 100MB
});

router.post('/', auth, upload.single('csvFile'), transactionsController.transactionsData);
module.exports = router;
