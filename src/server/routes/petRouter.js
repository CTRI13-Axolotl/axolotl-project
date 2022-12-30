const express = require('express');
const petController = require('../controllers/petController');
const router = express.Router();

router.get('/', petController.currentPet, (req, res) => {
  res.status(200).send(res.locals.currentPets);
});

router.post('/', petController.addPet, (req, res) => {
  res.status(200).json(res.locals.newPet);
});

router.put('/feed', petController.feedPet, (req, res) => {
  res.status(200).json(res.locals.feedPet);
});

router.put('/clean', petController.cleanPet, (req, res) => {
  res.status(200).json(res.locals.cleanPet);
});

//may not need this route
router.put('/poops', petController.poops, (req, res) => {
  res.status(200).json(res.locals.poops);
});

router.put('/play', petController.playPet, (req, res) => {
  res.status(200).json(res.locals.playPet);
});

//may not need this route
router.put('/x', petController.x, (req, res) => {
  res.status(200).json(res.locals.x);
});

module.exports = router;
