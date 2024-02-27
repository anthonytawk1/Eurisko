const express = require('express');

const albumControler = require('../controllers/albumControler');

const router = express.Router();

router.post('/add-album', albumControler.addAlbum);
router.post('/update-album', albumControler.addAlbum);
router.get('/album', albumControler.getAlbums);
router.get('/album-one', albumControler.getAlbumById);
router.delete('/album', albumControler.deleteAlbumById);

module.exports = router;