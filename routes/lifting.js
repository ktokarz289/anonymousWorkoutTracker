var express = require("express");
var router = express.Router();
const { check, validationResult } = require('express-validator/check');
const { matchedData, sanitize } = require('express-validator/filter');

router.get('/', function (req, res, next) {
    res.render('lifting', {title: "Lifting"});
});

router.post("/exercise", function (req, res, next) {
    sanitize('exercise-name', 'weight', 'sets', 'reps').trim().escape();

    
});

module.exports = router;