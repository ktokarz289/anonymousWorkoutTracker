const db = require('../database');
const env = require('dotenv').config();

class LiftingExercise {
    constructor(id, userId, exerciseName, weight, reps, sets) {
        this.id = id;
        this.userId = userId;
        this.exerciseName = exerciseName;
        this.weight = weight;
        this.reps = reps;
        this.sets = sets; 
    }

    async create() {
        let text = 'INSERT INTO app."LiftingExercise" ("Id", "UserId", "Name", "Sets", "Reps", "Weight") VALUES ($1, $2, $3, $4, $5, $6)';
        let values = [this.id, this.userId, this.exerciseName, this.sets, this.reps, this.weight];

        await db.query(text, values);
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

    async delete() {
        let text = 'DELETE FROM app."LiftingExercise" WHERE "Id" = $1';
        let values = [this.id];

        await db.query(text, values);
    }
}

module.exports = LiftingExercise;