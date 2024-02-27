const Album = require('../models/album');
const Category = require('../models/category');
const Song = require('../models/song');

exports.addCategory = (req, res, next) => {
    console.log(req.body);
    const id = req.body._id;
    const name = req.body.name;
    const description = req.body.description;
    const category = new Category(name, description, id);
    category
        .save()
        .then(result => {
            console.log('Created Product');
            return result;
        })
        .catch(err => {
            console.log(err);
        });
};

exports.getCategories = (req, res, next) => {
    console.log('in get categories');
    Category.fetchAll()
        .then(categories => {
            res.json(categories);
        })
        .catch(err => {
            console.log(err);
        });
};

exports.getCategoryById = (req, res, next) => {
    Category.fetchById(req.body.id)
        .then(category => {
            console.log(category);
            res.json(category);
        })
        .catch(err => {
            console.log(err);
        })
};

exports.deleteCategoryById = (req, res, next) => {
    Category.deleteById(req.body.id)
    .then(result => {
        return result
    })
    .catch(err => {
        console.log(err);
    })
};

