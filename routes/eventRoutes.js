const express = require('express');
const Event = require('../models/Event');
const router = express.Router();

router.post('/', async (req, res) => {
  try {
    const event = new Event(req.body);
    await event.save();
    res.status(201).send(event);
  } catch (error) {
    res.status(400).send(error);
  }
});

router.get('/', async (req, res) => {
  try {
    const event = await Event.find({});
    res.send(products);
  } catch (error) {
    res.status(500).send(error);
  }
});

module.exports = router;
