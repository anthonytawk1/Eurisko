const getDb = require('../util/databases').getDb;
const mongodb = require('mongodb');
const currentDate = new Date();
const todaysDate = `${currentDate.getFullYear()}-${(currentDate.getMonth() + 1).toString().padStart(2, '0')}-${currentDate.getDate().toString().padStart(2, '0')}`

class Album {
    //name, description, showNbTracks, createdAt, updatedAt, lastSongAddedAt
    constructor(name, description, showNbTracks, id) {
        this._id = id
        this.name = name;
        this.description = description;
        this.showNbTracks = showNbTracks;
        this.createdAt = todaysDate;
        this.updatedAt = null;
        // this.lastSongAddedAT = todaysDate;
    }
    save() {
        const db = getDb();;
        let dbOp;
        if (this._id) {
            console.log(this._id);
            dbOp = db.collection('album')
                .updateOne({ _id: new mongodb.ObjectId(this._id) }, { $set: { name: this.name, description: this.description, showNbTracks: this.showNbTracks, updatedAt: todaysDate } });
        } else {
            dbOp = db.collection('album').insertOne(this);

        }
        return dbOp
            .then(result => {
                console.log('the result: ', result);
            })
            .catch(err => {
                console.log('error from the product.js: ', err);
            })
    }

    static fetchAll() {
        const db = getDb();;
        return db.collection('album')
        .find()
        .toArray()
        .then(albums => {
            return albums;
        })
        .catch(err => {
           console.log(err); 
        });
    }

    static fetchById(albumId) {
        const db = getDb();;
        console.log(albumId);
        return db.collection('album')
        .findOne({_id: new mongodb.ObjectId(albumId)})
        .then(album => {
            return album
        })
        .catch(err => {
            console.log(err);
        })
    }

    static deleteById(albumId) {
        const db = getDb();;
        return db
            .collection('album')
            .deleteOne({_id: new mongodb.ObjectId(albumId)})
            .then( result => {
                console.log('Deleted');
            })
            .catch(err => {
                console.log(err);
            })
    }

}

module.exports = Album;