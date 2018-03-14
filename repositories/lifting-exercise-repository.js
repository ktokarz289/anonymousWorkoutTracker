const { Pool, Client } = require('pg');
const env = require('dotenv').config();
const LiftingExercise = require('../models/lifting-exercise');
const pool = new Pool({
    user: process.env.PGUSER,
    host: process.env.PGHOST,
    database: process.env.PGDATABASE,
    password: process.env.PGSECRET,
    port: process.env.PGPORT
});

class LiftingExerciseRepository {
    constructor() {
        this.liftingExercises = [];
    }

    select(callback) {
        let text = 'SELECT "Id", "UserId", "Name", "Sets", "Reps", "Weight" FROM app."LiftingExercise"';

        pool.query(text)
            .then(res => {
                if (res && res.rows.length > 0) {
                    var liftingExerciseRepository = this;
                    res.rows.forEach(function(row) {
                        var liftingExercise = new LiftingExercise(row.Id, row.UserId, row.Name, row.Weight, row.Reps, row.Sets);
                        liftingExerciseRepository.liftingExercises.push(liftingExercise);
                    });

                    callback();
                }
            })
            .catch(e => { 
                console.error(e.stack); 
            });
    }
}

module.exports = LiftingExerciseRepository;