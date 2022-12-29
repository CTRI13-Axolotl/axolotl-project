const db = require('../Models/axolotlModel');

const petController = {};

// petController.currentPet = (req, res, next) => {
//   const { player_id } = req.body;
//   const currentDate = new Date();
//   const addPetQuery =
//     'SELECT * FROM pet WHERE player_id=$1 AND x_date is NULL;';
//   db.query(addPetQuery, [player_id])
//     .then((data) => {
//       res.locals.currentPets = data.rows;
//       return next();
//     })
//     .catch((err) => {
//       return next({
//         log: 'error in petController.currentPet',
//         message: { err: err },
//       });
//     });
// };

petController.currentPet = async (req, res, next) => {
  const { player_id } = req.body;
  const currentDate = new Date();
  console.log('currentDate: ', currentDate);
  const curPetQuery = 'SELECT * FROM pet WHERE player_id=$1 AND current=true;';
  try {
    //read query to get current pet(s) of player defined in req.body
    const data = await db.query(curPetQuery, [player_id]);
    let petArray = data.rows;

    //iterate through each pet to calculate current health status
    petArray.forEach(async (pet) => {
      //initialize current pet id, and health subtract points
      const petId = pet._id;
      let health = 100 - pet.health;
      let healthSubtract = 0;

      //calculate how much time in hours elapsed between current time and last time the pet
      //was fed, cleaned, or played with
      const feedTime = new Date(pet.last_fed);
      const cleanTime = new Date(pet.last_cleaned);
      const playTime = new Date(pet.last_played);
      const feedElapsedTime = Math.floor(
        (currentDate - feedTime) / 1000 / 60 / 60,
      );
      const cleanElapsedTime = Math.floor(
        (currentDate - cleanTime) / 1000 / 60 / 60,
      );
      const playElapsedTime = Math.floor(
        (currentDate - playTime) / 1000 / 60 / 60,
      );

      //check if any of the times are over 24 hours and if x_date is not null
      //if true, update database with current time for x_date
      if (
        (feedElapsedTime > 24 ||
          cleanElapsedTime > 24 ||
          playElapsedTime > 24) &&
        pet.x_date === null
      ) {
        const xQuery =
          'UPDATE pet SET x_date=CURRENT_TIMESTAMP, health=0 WHERE _id=$1;';
        const x = await db.query(xQuery, [petId]);

        //else if x_date is defined and current pet is true
        //update database to set current as false
        //current keeps track of current pet(s) assigned to a user
      } else if (pet.x_date !== null && pet.current === true) {
        const currentQuery = 'UPDATE pet SET current=false WHERE _id=$1;';
        const current = await db.query(currentQuery, [petId]);

        //else if time elapsed since last fed, played, or cleaned
        //is greater than 8, 12, or 8 hours respectively
      } else if (
        cleanElapsedTime > 8 ||
        feedElapsedTime > 12 ||
        playElapsedTime > 8
      ) {
        //calculate how many points to subtract from health
        //and how many poops to render
        const numPoops = Math.floor(cleanElapsedTime / 8);
        const feedSubtract = Math.floor(feedElapsedTime / 12);
        const playSubtract = Math.floor(playElapsedTime / 8);
        console.log('play: ', playElapsedTime);
        console.log(
          'name: ',
          pet.name,
          'playSub: ',
          playSubtract,
          'feedSub: ',
          feedSubtract,
          'numPoops: ',
          numPoops,
        );
        healthSubtract += (numPoops + feedSubtract + playSubtract) * 20;
        // console.log('healthSubtract: ', healthSubtract);

        //if number of poops is greater than current number of poops in the database
        //update database with new number of poops
        if (numPoops > pet.num_poop) {
          const pooVal = [numPoops, petId];
          const poopQuery = 'UPDATE pet SET num_poop=$1 WHERE _id=$2;';
          const poop = await db.query(poopQuery, pooVal);
        }
        //if healthsubtract points is greater than how much health
        //has already depleted
        if (healthSubtract > health) {
          //if health subtract is greater than 100
          //update database to have x_date as current time
          if (healthSubtract >= 100) {
            const xHealthQuery =
              'UPDATE pet SET x_date=CURRENT_TIMESTAMP, health=0 WHERE _id=$1;';
            const x = await db.query(xHealthQuery, [petId]);
            //otherwise update health in database with the
            //difference of healthSubtract from 100
          } else {
            const newHealth = 100 - healthSubtract;
            const healthVals = [newHealth, petId];
            const healthQuery = 'UPDATE pet SET health=$1 WHERE _id=$2;';
            const updateHealth = await db.query(healthQuery, healthVals);
          }
        }
      }
    });
    //query database to get the updated current pet(s)
    //store updated pets to res.locals
    newPets = await db.query(curPetQuery, [player_id]);
    res.locals.currentPets = newPets.rows;
    return next();
  } catch (err) {
    return next({
      log: 'error in petController.currentPet',
      message: { err: err },
    });
  }
};

//adds new pet to the database
petController.addPet = (req, res, next) => {
  const { name, player_id, pet_type } = req.body;
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

//updates database for last_fed to current timestamp if more than 1 hour has elapsed since last fed,
//also adds 20 health points without exceeding 100;
petController.feedPet = (req, res, next) => {
  const petId = [req.body._id];
  const feedPetQuery =
    "UPDATE pet SET last_fed = CURRENT_TIMESTAMP, health = LEAST(health+20, 100) WHERE _id=$1 AND CASE WHEN age(current_timestamp, last_fed) > interval '1 hour' THEN true ELSE false END RETURNING *;";
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

//updates database for last_cleaned to current timestamp if more than 1 hour has elapsedsince last cleaned
//also adds 20 health points without exceeding 100;
petController.cleanPet = (req, res, next) => {
  // console.log('req.body: ', req.body);
  const petId = [req.body._id];
  const cleanPetQuery =
    "UPDATE pet SET last_cleaned = CURRENT_TIMESTAMP, health = LEAST(health+20, 100) WHERE _id=$1 AND CASE WHEN age(current_timestamp, last_cleaned) > interval '1 hour' THEN true ELSE false END RETURNING *;";
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

//updates database for last_played to current timestamp if more than 1 hour has elapsed since last played
//also adds 20 health points without exceeding 100;
petController.playPet = (req, res, next) => {
  // console.log('req.body: ', req.body);
  const petId = [req.body._id];
  const playPetQuery =
    "UPDATE pet SET last_played = CURRENT_TIMESTAMP, health = LEAST(health+20, 100) WHERE _id=$1 AND CASE WHEN age(current_timestamp, last_played) > interval '1 hour' THEN true ELSE false END RETURNING *;";
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

//updates num_poop, but probably won't use this middleware
petController.poops = (req, res, next) => {
  // console.log('req.body: ', req.body);
  const petId = req.body._id;
  const poops = req.body.poops;
  values = [poops, petId];
  const poopQuery = 'UPDATE pet SET num_poop=$1 WHERE _id=$2 RETURNING *;';
  // console.log('values: ', values);
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

//updates x date, but probably won't use this middleware
petController.x = (req, res, next) => {
  const petId = [req.body._id];
  // console.log('req.body in x', req.body);
  const xQuery =
    'UPDATE pet SET x_date=CURRENT_TIMESTAMP WHERE _id=$1 RETURNING *;';
  db.query(xQuery, petId)
    .then((data) => {
      // console.log(data);
      res.locals.x = data.rows[0];
      return next();
    })
    .catch((err) => {
      return next({
        log: 'error in petController.x',
        message: { err: err },
      });
    });
};

module.exports = petController;
