var express = require("express");
var router = express.Router();
const { check, validationResult } = require('express-validator/check');
const { matchedData, sanitize } = require('express-validator/filter');
const LiftingExercise = require('../models/lifting-exercise');
const uuidv4 = require('uuid/v4');

router.get('/', function (req, res, next) {
    res.render('lifting', {title: "Lifting"});
});

router.post("/exercise", function (req, res, next) {
    check('exerciseName', 'weight', 'sets', 'reps').isLength({min: 1});
    sanitize('exerciseName', 'weight', 'sets', 'reps').trim().escape();
    var id = uuidv4();
    var liftingExercise = new LiftingExercise(id, req.session.id, req.body.exerciseName, req.body.weight, req.body.sets, req.body.reps);
    liftingExercise.create();

    res.redirect("/lifting");
});

module.exports = router;