const env = require('dotenv').config();
const LiftingExercise = require('../models/lifting-exercise');
const db = require('../database');

class LiftingExerciseRepository {
    constructor() {
        this.liftingExercises = [];
    }

    async select() {
        let text = 'SELECT "Id", "UserId", "Name", "Sets", "Reps", "Weight" FROM app."LiftingExercise"';

        const { rows } = await db.query(text);
        var self = this;
        rows.forEach(function(row) {
            var liftingExercise = new LiftingExercise(row.Id, row.UserId, row.Name, row.Weight, row.Reps, row.Sets);
            self.liftingExercises.push(liftingExercise);
        });
    }

    findById(liftingId) {
        return this.liftingExercises.find(function(liftingExercise) {
            return liftingExercise.id === liftingId;
        });
    }
}

module.exports = LiftingExerciseRepository;