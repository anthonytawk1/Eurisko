const Album = require('../models/album');

exports.addAlbum = (req, res, next) => {
    console.log(req.body);
    const id = req.body._id;
    const name = req.body.name;
    const description = req.body.description;
    const showNbTracks = req.body.showNbTracks;
    const album = new Album(name, description, showNbTracks, id);
    album
        .save()
        .then(result => {
            console.log('Created Album');
            return result;
        })
        .catch(err => {
            console.log(err);
        });
};

exports.getAlbums = (req, res, next) => {
    Album.fetchAll()
        .then(albums => {
            res.json(albums);
        })
        .catch(err => {
            console.log(err);
        });
};

exports.getAlbumById = (req, res, next) => {
    Album.fetchById(req.body.id)
        .then(album => {
            console.log(album);
            res.json(album);
        })
        .catch(err => {
            console.log(err);
        })
};

exports.deleteAlbumById = (req, res, next) => {
    Album.deleteById(req.body.id)
    .then(result => {
        return result
    })
    .catch(err => {
        console.log(err);
    })
};
