const { Pool, Client } = require('pg');
const env = require('dotenv').config();
const pool = new Pool({
    user: process.env.PGUSER,
    host: process.env.PGHOST,
    database: process.env.PGDATABASE,
    password: process.env.PGSECRET,
    port: process.env.PGPORT
});

class LiftingExercise {
    constructor(id, userId, exerciseName, weight, reps, sets) {
        this.id = id;
        this.userId = userId;
        this.exerciseName = exerciseName;
        this.weight = weight;
        this.reps = reps;
        this.sets = sets; 
    }

    create() {
        let text = 'INSERT INTO app."LiftingExercise" ("Id", "UserId", "Name", "Sets", "Reps", "Weight") VALUES ($1, $2, $3, $4, $5, $6)';
        let values = [this.id, this.userId, this.exerciseName, this.sets, this.reps, this.weight];

        pool.query(text, values)
            .then(res => {
                console.log(res.rows[0]);
            })
            .catch(e => console.error(e.stack));
    }

    update() {
        let text = 'UPDATE app."LiftingExercise" SET "UserId" = $1, "Name" = $2, "Sets" = $3, "Reps" = $4, "Weight" $5 WHERE Id = $6';
        let values = [this.userId, this.exerciseName, this.sets, this.reps, this.weight, this.id];

        pool.query(text, values)
            .then(res => {
                console.log(res.rows[0]);
            })
            .catch(e => console.error(e.stack));
    }

    delete() {
        let text = 'DELETE FROM app."LiftingExercise" WHERE Id = $1';
        let values = [this.id];

        pool.query(text, values)
            .then(res => {
                console.log(res.rows[0]);
            })
            .catch(e => console.error(e.stack));
    }
}

module.exports = LiftingExercise;