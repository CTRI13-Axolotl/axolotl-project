const db = require('../Models/axolotlModel'); //UPDATE TO PG / POOLS PAGE LINK

const userController = {};


//////////////REDIRECT TO SELECT PET

userController.createUser = (req, res, next) => {
    const {username, password} = req.body;
    const values = [username, password];
    const newUserQuery = 
      "INSERT INTO player(username, password) VALUES ($1, $2);";
  if (req.body.username && req.body.password) {
    db.query(newUserQuery, values)
      .then((data) => { //////////////REDIRECT TO SELECT PET
        res.locals.newUser = (data.rows[0])
        return next();
      })
      .catch((err) => {
        return next({
          log: 'error in petController.addPet',
          message: { error: err },
      });
  });
 };
};

userController.verifyUser = (req, res, next) => {
  const {username, password} = req.body;
  const values = [username, password];
  const verifyQuery = 
    "SELECT * FROM player WHERE player.username = $1 AND player.password = $2;";
  db.query(verifyQuery, values)
    .then((data) => {
      (data === null) ? res.redirect('/login') : res.redirect('/');
    })
    .catch((err) => {
      return next({
        log: 'error in petController.addPet',
        message: { error: err },
    });
  });
};

module.exports = userController;