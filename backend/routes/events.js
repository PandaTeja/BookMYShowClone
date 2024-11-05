const express = require('express');
const { getAllEvents, createEvent } = require('../controller/eventsController');
const router = express.Router();

router.get('/',getAllEvents)
router.post('/',createEvent)

module.exports = router