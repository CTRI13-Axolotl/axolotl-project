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

router.put('/poops', petController.poops, (req, res) => {
  res.status(200).json(res.locals.poops);
});

router.put('/play', petController.playPet, (req, res) => {
  res.status(200).json(res.locals.playPet);
});

router.put('/death', petController.death, (req, res) => {
  res.status(200).json(res.locals.death);
});

module.exports = router;
