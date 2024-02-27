const getDb = require('../util/databases').getDb;
const mongodb = require('mongodb');
const currentDate = new Date();
const todaysDate = `${currentDate.getFullYear()}-${(currentDate.getMonth() + 1).toString().padStart(2, '0')}-${currentDate.getDate().toString().padStart(2, '0')}`

class Song {
    constructor(name, singer, category, albumId){
        this.name = name;
        this.singer = singer;
        this.category = category;
        this.albumId = albumId;
    }
    static getAlbumsCollection() {
        const db = getDb();
        return db.collection('album');
    }
    
    static getSongsCollection() {
        const db = getDb();
        return db.collection('song');
    }
    
    static addSongsToAlbum(albumId, songs) {
        const albumsCollection = Song.getAlbumsCollection();
        const songsCollection = Song.getSongsCollection();
    
        return albumsCollection.findOne({ _id: new mongodb.ObjectId(albumId) })
            .then(album => {
                if (!album) {
                    throw new Error('Album not found');
                }
    
                const songDocuments = songs.map(song => ({
                    name: song.name,
                    singer: song.singer,
                    category: song.category,
                    album: new mongodb.ObjectId(albumId),
                }));
    
                return songsCollection.insertMany(songDocuments);
            })
            .then(insertedSongs => {
                return albumsCollection.updateOne(
                    { _id: new mongodb.ObjectId(albumId) },
                    { $set: { lastSongAddedAt: new Date() } }
                ).then(() => insertedSongs.ops);
            })
            .catch(error => {
                throw new Error(`Error adding songs to album: ${error.message}`);
            });
    }

    static deleteById(songId) {
        const db = getDb();;
        return db
            .collection('song')
            .deleteOne({_id: new mongodb.ObjectId(songId)})
            .then( result => {
                console.log('Deleted');
            })
            .catch(err => {
                console.log(err);
            })
    }
}

module.exports = Song;