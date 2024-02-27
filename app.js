const express = require('express');
const bodyParser = require('body-parser');
const mongoConnect = require('./util/databases').mongoConnect;

const app = express();

const categoryRoutes = require('./routes/categoryRoutes');
const albumRoutes = require('./routes/albumRoutes');
const songRoutes = require('./routes/songRoutes');
app.use(express.json());
// app.use(bodyParser.urlencoded({ extended: false }));


app.use((req, res, next) => {
    // console.log(req.body);
    // User.findById(1)
    //   .then(user => {
    //     req.user = user;
    //     next();
    //   })
    //   .catch(err => console.log(err));
    next();
  });

  app.use(categoryRoutes);
  app.use(albumRoutes);
  app.use(songRoutes);


  mongoConnect(() => {
    app.listen(3000);
  });