const db = require('../Models/axolotlModel');

const petController = {};

petController.currentPet = (req, res, next) => {
  const { player_id } = req.body;
  // console.log('in addPet: ', req.body);
  const addPetQuery =
    'SELECT * FROM pet WHERE player_id=$1 AND death_date is NULL;';
  db.query(addPetQuery, [player_id])
    .then((data) => {
      // console.log(data);
      res.locals.currentPets = data.rows;
      return next();
    })
    .catch((err) => {
      return next({
        log: 'error in petController.currentPet',
        message: { err: err },
      });
    });
};

petController.addPet = (req, res, next) => {
  const { name, player_id, pet_type } = req.body;
  // console.log('in addPet: ', req.body);
  const values = [player_id, name, pet_type];
  const addPetQuery =
    'INSERT INTO pet (player_id, name, pet_type) VALUES ($1, $2, $3) RETURNING *';
  db.query(addPetQuery, values)
    .then((data) => {
      // console.log(data);
      res.locals.newPet = data.rows[0];
      return next();
    })
    .catch((err) => {
      return next({
        log: 'error in petController.addPet',
        message: { err: err },
      });
    });
};

petController.feedPet = (req, res, next) => {
  const petId = [req.body['_id']];
  const feedPetQuery =
    'UPDATE pet SET last_fed=CURRENT_TIMESTAMP WHERE _id=$1 RETURNING *;';
  db.query(feedPetQuery, petId)
    .then((data) => {
      // console.log(data);
      res.locals.feedPet = data.rows[0];
      return next();
    })
    .catch((err) => {
      return next({
        log: 'error in petController.feedPet',
        message: { err: err },
      });
    });
};

petController.cleanPet = (req, res, next) => {
  // console.log('req.body: ', req.body);
  const petId = [req.body['_id']];
  const cleanPetQuery = `UPDATE pet SET last_cleaned=CURRENT_TIMESTAMP, num_poop=0 WHERE _id=$1 RETURNING *;`;
  db.query(cleanPetQuery, petId)
    .then((data) => {
      res.locals.cleanPet = data.rows[0];
      return next();
    })
    .catch((err) => {
      return next({
        log: 'error in petController.cleanPet',
        message: { err: err },
      });
    });
};

petController.playPet = (req, res, next) => {
  // console.log('req.body: ', req.body);
  const petId = [req.body['_id']];
  const playPetQuery = `UPDATE pet SET last_played=CURRENT_TIMESTAMP WHERE _id=$1 RETURNING *;`;
  db.query(playPetQuery, petId)
    .then((data) => {
      res.locals.playPet = data.rows[0];
      return next();
    })
    .catch((err) => {
      return next({
        log: 'error in petController.playPet',
        message: { err: err },
      });
    });
};

petController.poops = (req, res, next) => {
  console.log('req.body: ', req.body);
  const petId = req.body['_id'];
  const poops = req.body.poops;
  values = [poops, petId];
  const poopQuery = 'UPDATE pet SET num_poop=$1 WHERE _id=$2 RETURNING *;';
  console.log('values: ', values);
  db.query(poopQuery, values)
    .then((data) => {
      res.locals.poops = data.rows[0];
      return next();
    })
    .catch((err) => {
      return next({
        log: 'error in petController.poops',
        message: { err: err },
      });
    });
};

petController.death = (req, res, next) => {
  const petId = [req.body['_id']];
  console.log('req.body in death', req.body);
  const deathQuery =
    'UPDATE pet SET death_date=CURRENT_TIMESTAMP WHERE _id=$1 RETURNING *;';
  db.query(deathQuery, petId)
    .then((data) => {
      // console.log(data);
      res.locals.death = data.rows[0];
      return next();
    })
    .catch((err) => {
      return next({
        log: 'error in petController.death',
        message: { err: err },
      });
    });
};

module.exports = petController;
