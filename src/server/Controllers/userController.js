const db = require('../Models/axolotlModel'); //UPDATE TO PG / POOLS PAGE LINK
const bcrypt = require('bcryptjs');

const userController = {};

//////////////REDIRECT TO SELECT PET

userController.createUser = async (req, res, next) => {
  const { username, password } = req.body;
  const hash = await bcrypt.hash(password, 10);
  const values = [username, hash];
  const newUserQuery =
    'INSERT INTO player(username, password) VALUES ($1, $2) RETURNING *;';
  if (req.body.username && req.body.password) {
    // console.log('line 15: ', username, hash);
    await db
      .query(newUserQuery, values)
      .then((data) => {
        //////////////REDIRECT TO SELECT PET
        res.locals.newUser = data.rows[0]._id;
        return next();
      })
      .catch((err) => {
        return next({
          log: 'error in userController.createUser',
          message: { error: err },
        });
      });
  }
};

userController.verifyUser = async (req, res, next) => {
  const { username, password } = req.query;
  const values = [username];
  const verifyQuery = 'SELECT * FROM player WHERE player.username = $1;';
  // console.log('testing user');
  console.log('username: ', username);
  db.query(verifyQuery, values)
    .then(async (user) => {
      if (!user) return res.status(400).json({ msg: 'User not found' });
      // console.log('comparing password');
      const valid = await bcrypt.compare(password, user.rows[0].password);
      if (valid) {
        console.log(user.rows);
        res.locals.userId = user.rows[0]._id;
        return res.status(200).json(res.locals.userId);
        // .res.redirect('/');
      } else {
        return res.status(400).json({ msg: 'Password invalid' });
        //  res.redirect('/login');
      }
    })
    .catch((err) => {
      return next({
        log: 'error in userController.verifyUser',
        message: { error: err },
      });
    });
};

module.exports = userController;
