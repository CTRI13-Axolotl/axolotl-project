const db = require('../Models/axolotlModel');

const petController = {};

// petController.currentPet = async (req, res, next) => {
//   const { player_id } = req.body;
//   const currentDate = new Date();
//   console.log('currentDate: ', currentDate);
//   const curPetQuery = 'SELECT * FROM pet WHERE player_id=$1 AND current=true;';
//   try {
//     //read query to get current pet(s) of player defined in req.body
//     const data = await db.query(curPetQuery, [player_id]);
//     let petArray = data.rows;

//     //iterate through each pet to calculate current health status
//     petArray.forEach(async (pet) => {
//       //initialize current pet id, and health subtract points
//       const petId = pet._id;
//       let health = 100 - pet.health;
//       let healthSubtract = 0;

//       //calculate how much time in hours elapsed between current time and last time the pet
//       //was fed, cleaned, or played with
//       const feedTime = new Date(pet.last_fed);
//       const cleanTime = new Date(pet.last_cleaned);
//       const playTime = new Date(pet.last_played);
//       const feedElapsedTime = Math.floor(
//         (currentDate - feedTime) / 1000 / 60 / 60,
//       );
//       const cleanElapsedTime = Math.floor(
//         (currentDate - cleanTime) / 1000 / 60 / 60,
//       );
//       const playElapsedTime = Math.floor(
//         (currentDate - playTime) / 1000 / 60 / 60,
//       );

//       //check if any of the times are over 24 hours and if x_date is not null
//       //if true, update database with current time for x_date
//       if (
//         (feedElapsedTime > 24 ||
//           cleanElapsedTime > 24 ||
//           playElapsedTime > 24) &&
//         pet.x_date === null
//       ) {
//         const xQuery =
//           'UPDATE pet SET x_date=CURRENT_TIMESTAMP, health=0 WHERE _id=$1;';
//         const x = await db.query(xQuery, [petId]);

//         //else if x_date is defined and current pet is true
//         //update database to set current as false
//         //current keeps track of current pet(s) assigned to a user
//       } else if (pet.x_date !== null && pet.current === true) {
//         const currentQuery = 'UPDATE pet SET current=false WHERE _id=$1;';
//         const current = await db.query(currentQuery, [petId]);

//         //else if time elapsed since last fed, played, or cleaned
//         //is greater than 8, 12, or 8 hours respectively
//       } else if (
//         cleanElapsedTime > 8 ||
//         feedElapsedTime > 12 ||
//         playElapsedTime > 8
//       ) {
//         //calculate how many points to subtract from health
//         //and how many poops to render
//         const numPoops = Math.floor(cleanElapsedTime / 8);
//         const feedSubtract = Math.floor(feedElapsedTime / 12);
//         const playSubtract = Math.floor(playElapsedTime / 8);
//         healthSubtract += (numPoops + feedSubtract + playSubtract) * 20;
//         // console.log('healthSubtract: ', healthSubtract);

//         //if number of poops is greater than current number of poops in the database
//         //update database with new number of poops
//         if (numPoops > pet.num_poop) {
//           const pooVal = [numPoops, petId];
//           const poopQuery = 'UPDATE pet SET num_poop=$1 WHERE _id=$2;';
//           const poop = await db.query(poopQuery, pooVal);
//         }
//         //if healthsubtract points is greater than how much health
//         //has already depleted
//         if (healthSubtract > health) {
//           //if health subtract is greater than 100
//           //update database to have x_date as current time
//           if (healthSubtract >= 100) {
//             const xHealthQuery =
//               'UPDATE pet SET x_date=CURRENT_TIMESTAMP, health=0 WHERE _id=$1;';
//             const x = await db.query(xHealthQuery, [petId]);
//             //otherwise update health in database with the
//             //difference of healthSubtract from 100
//           } else {
//             const newHealth = 100 - healthSubtract;
//             const healthVals = [newHealth, petId];
//             const healthQuery = 'UPDATE pet SET health=$1 WHERE _id=$2;';
//             const updateHealth = await db.query(healthQuery, healthVals);
//           }
//         }
//       }
//     });
//     //query database to get the updated current pet(s)
//     //store updated pets to res.locals
//     newPets = await db.query(curPetQuery, [player_id]);
//     res.locals.currentPets = newPets.rows;
//     return next();
//   } catch (err) {
//     return next({
//       log: 'error in petController.currentPet',
//       message: { err: err },
//     });
//   }
// };

//rewrote above logic using SQL queries instead of javascript
//currentPet method will get all current pets of the specified player
//and it will update health and/or x_date status
//depending on how much time has elapsed since last fed, cleaned, or played
petController.currentPet = async (req, res, next) => {
  const { player_id } = req.query;
  // console.log('player_id in currentPet controller', player_id);
  try {
    //query to update x_date if pet has not been fed, cleaned, or played with for over 24 hours
    //also update health by subtracting 5 points for each interval where last fed is > 2 hours
    //last cleaned > 1 hours and/or last played > 1 hours
    const xDateQuery =
      "UPDATE pet SET x_date = CASE WHEN age(current_timestamp, last_cleaned) > interval '24 hours' OR age(current_timestamp, last_played) > interval '24 hours' OR age(current_timestamp, last_fed) > interval '24 hours' THEN CURRENT_TIMESTAMP ELSE x_date END, health = CASE WHEN age(current_timestamp, last_cleaned) > interval '24 hours' OR age(current_timestamp, last_played) > interval '24 hours' OR age(current_timestamp, last_fed) > interval '24 hours' THEN 0 WHEN ((FLOOR(EXTRACT(EPOCH FROM current_timestamp-last_cleaned)/3600/1) + FLOOR(EXTRACT(EPOCH FROM current_timestamp-last_played)/3600/1) + FLOOR(EXTRACT(EPOCH FROM current_timestamp-last_fed)/3600/1))*5) > (100-health) THEN GREATEST(100-((FLOOR(EXTRACT(EPOCH FROM current_timestamp-last_cleaned)/3600/1) + FLOOR(EXTRACT(EPOCH FROM current_timestamp-last_played)/3600/1) + FLOOR(EXTRACT(EPOCH FROM current_timestamp-last_fed)/3600/1))*5),0) ELSE health END, num_poop = CASE WHEN FLOOR(EXTRACT(EPOCH FROM current_timestamp-last_cleaned)/3600/1) > num_poop THEN FLOOR(EXTRACT(EPOCH FROM current_timestamp-last_cleaned)/3600/1) ELSE num_poop END WHERE player_id=$1 RETURNING *;";
    const xData = await db.query(xDateQuery, [player_id]);
    //query to update x_date to current time stamp if health is 0
    const healthQuery =
      'UPDATE pet SET x_date = CASE WHEN health=0 THEN CURRENT_TIMESTAMP ELSE x_date END WHERE player_id=$1 RETURNING *;';
    const healthData = await db.query(healthQuery, [player_id]);

    //query to get updated pets from database for current player
    const curPetQuery =
      'SELECT * FROM pet WHERE player_id=$1 AND current=true;';
    const getPets = await db.query(curPetQuery, [player_id]);

    //store current pets in res.locals
    res.locals.currentPets = getPets.rows;
    return next();
  } catch (err) {
    //error handling
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

petController.updatePet = async (req, res, next) => {
  const { petId } = req.body;
  // console.log('player_id in currentPet controller', player_id);
  try {
    //query to set current to false if x_date is not null
    const curPetsUpdateQ =
      'UPDATE pet SET current = false WHERE _id=$1 RETURNING *;';
    const curPetsUpdate = await db.query(curPetsUpdateQ, [petId]);
    //store current pets in res.locals
    res.locals.updatePet = curPetsUpdate.rows;
    return next();
  } catch (err) {
    //error handling
    return next({
      log: 'error in petController.updatePet',
      message: { err: err },
    });
  }
};

//updates database for last_fed to current timestamp if more than 1 hour has elapsed since last fed,
//also adds 20 health points without exceeding 100;
petController.feedPet = (req, res, next) => {
  const petId = [req.body._id];
  const feedPetQuery =
    "UPDATE pet SET last_fed = CURRENT_TIMESTAMP, health = LEAST(health+20, 100) WHERE _id=$1 AND last_fed < CURRENT_TIMESTAMP - interval '1 hour' RETURNING *;";
  db.query(feedPetQuery, petId)
    .then((data) => {
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
  const petId = [req.body._id];
  const cleanPetQuery =
    "UPDATE pet SET last_cleaned = CURRENT_TIMESTAMP, health = LEAST(health+20, 100), num_poop=0 WHERE _id=$1 AND last_cleaned < CURRENT_TIMESTAMP - interval '1 hour' RETURNING *;";
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
  const petId = [req.body._id];
  const playPetQuery =
    "UPDATE pet SET last_played = CURRENT_TIMESTAMP, health = LEAST(health+20, 100) WHERE _id=$1 AND last_played < CURRENT_TIMESTAMP - interval '1 hour' RETURNING *;";
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
  const petId = req.body._id;
  const poops = req.body.poops;
  values = [poops, petId];
  const poopQuery = 'UPDATE pet SET num_poop=$1 WHERE _id=$2 RETURNING *;';
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
  const xQuery =
    'UPDATE pet SET x_date=CURRENT_TIMESTAMP WHERE _id=$1 RETURNING *;';
  db.query(xQuery, petId)
    .then((data) => {
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
