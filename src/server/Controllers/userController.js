const db = require('../models/starWarsModels'); //UPDATE TO PG / POOLS PAGE LINK
const userController = {};


userController.createUser(req, res, next) => {
    const {username, password} = req.body;
    const newUserQuery = 
      INSERT INTO player
      VALUES ('username', 'password');
  if (req.body.username && req.body.password) {
       
  }
}