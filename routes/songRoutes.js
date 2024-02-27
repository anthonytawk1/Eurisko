const express = require('express');

const songController = require('../controllers/songController');

const router = express.Router();

router.post('/add-song', songController.adSongToAlbum);
router.delete('/song', songController.deleteSongById);

module.exports = router;