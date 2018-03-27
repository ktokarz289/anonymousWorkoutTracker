const Router = require('express-promise-router');
var router = new Router();
const { check, validationResult } = require('express-validator/check');
const { matchedData, sanitize } = require('express-validator/filter');
const LiftingExercise = require('../models/lifting-exercise');
const uuidv4 = require('uuid/v4');
var LiftingExerciseRepository = require("../repositories/lifting-exercise-repository");

router.get('/', async (req, res, next) => {
    var liftingExerciseRepository = new LiftingExerciseRepository();
    await liftingExerciseRepository.select();
    res.render('lifting-overview', {title: "Lifting Overview", lifts: liftingExerciseRepository.liftingExercises});
});

router.get('/exercise', function (req, res, next) {
    res.render('lifting', {title: "Create"});
});

router.post("/exercise", async (req, res, next) => {
    check('exerciseName', 'weight', 'sets', 'reps').isLength({min: 1});
    sanitize('exerciseName', 'weight', 'sets', 'reps').trim().escape();
    var id = uuidv4();
    var liftingExercise = new LiftingExercise(id, req.session.id, req.body.exerciseName, req.body.weight, req.body.sets, req.body.reps);
    await liftingExercise.create();

    res.redirect("/lifting");
});

router.delete("/exercise", async (req, res, next) => {
    var liftingId = req.body.id;

    var liftingExerciseRepository = new LiftingExerciseRepository();
    await liftingExerciseRepository.select();

    var lifting = liftingExerciseRepository.findById(liftingId);
    await lifting.delete();

    res.status(200);
    res.send();
});

module.exports = router;