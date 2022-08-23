const express = require('express');
const routes = require('./routes');
const path = require('path')
// import sequelize connection
const sequelize = require('./config/connection');
require('dotenv').config({ path: 'path/to/.env' });


const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(routes);

sequelize.authenticate()
  .then(()=>console.log('connect to db'))

  .catch(err=>console.log(err))

// sync sequelize models to the database, then turn on the server

sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => console.log(`Now listening on port ${PORT}`));
});
