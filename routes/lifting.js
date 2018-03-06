var express = require("express");
var router = express.Router();
const { check, validationResult } = require('express-validator/check');
const { matchedData, sanitize } = require('express-validator/filter');
const LiftingExercise = require('../models/lifting-exercise');
const uuidv5 = require('uuid/v5');

router.get('/', function (req, res, next) {
    res.render('lifting', {title: "Lifting"});
});

router.post("/exercise", function (req, res, next) {
    sanitize('exerciseName', 'weight', 'sets', 'reps').trim().escape();
    var id = uuidv5('anonymousWorkoutTracker.com', uuidv5.URL);
    var liftingExercise = new LiftingExercise(id, req.session.id, req.body.exerciseName, req.body.weight, req.body.sets, req.body.reps);
    liftingExercise.create();
});

module.exports = router;