const getDb = require('../util/databases').getDb;
const mongodb = require('mongodb');
const currentDate = new Date();
const todaysDate = `${currentDate.getFullYear()}-${(currentDate.getMonth() + 1).toString().padStart(2, '0')}-${currentDate.getDate().toString().padStart(2, '0')}`

class Category {
    constructor (name, description, id) {
      this._id = id;
      this.name = name;
      this.description = description;
      this.createdAt = todaysDate;
      this.updatedAt = null;
    }
    save () {
      const db = getDb();;
      let dbOp;
      if(this._id){
        dbOp = db.collection('category')
        .updateOne({_id: new mongodb.ObjectId(this._id)}, {$set: {name: this.name, description: this.description, updatedAt: todaysDate}});
    }else{
          dbOp = db.collection('category').insertOne(this);

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
        return db.collection('category')
        .find()
        .toArray()
        .then(categories => {
            console.log('categories: ', categories);
            return categories;
        })
        .catch(err => {
           console.log(err); 
        });
    }

    static fetchById(categoryId) {
        const db = getDb();;
        console.log(categoryId);
        return db.collection('category')
        .findOne({_id: new mongodb.ObjectId(categoryId)})
        .then(category => {
            return category
        })
        .catch(err => {
            console.log(err);
        })
    }

    static deleteById(categoryId) {
        const db = getDb();;
        return db
            .collection('category')
            .deleteOne({_id: new mongodb.ObjectId(categoryId)})
            .then( result => {
                console.log('Deleted');
            })
            .catch(err => {
                console.log(err);
            })
    }
  }
  
  module.exports = Category;