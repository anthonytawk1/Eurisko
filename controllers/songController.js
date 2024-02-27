const Song = require('../models/song');

exports.adSongToAlbum = (req, res, next) => {
    let newBody = req.body[0];
    const name = newBody.name;
    const singer = newBody.singer;
    const category = newBody.category;
    const albumId = newBody.albumId;
    const song = new Song(name, singer, category, albumId);
    song
        .addSongsToAlbum(albumId, [song])
        .then(result => {
            console.log('Created song');
            return result;
        })
        .catch(err => {
            console.log(err);
        });
};

exports.deleteSongById = (req, res, next) => {
    Song.deleteById(req.body.id)
    .then(result => {
        return result
    })
    .catch(err => {
        console.log(err);
    })
};
