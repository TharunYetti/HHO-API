const express = require("express");
const router = express.Router();
const {createEvent} = require("../Controllers/eventController");

router.post("/createEvent", createEvent);

module.exports = router;
