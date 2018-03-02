module.exports = {
    identity: 'liftingexercise',
    globalId: 'liftingExercise',
    connection: 'postgresql',
    tableName: 'LiftingExercise',
    attributes: {
        id: {
            type: 'string',
            primaryKey: true,
            required: true
        },
        userId: {
            type: 'string',
            required: true
        },
        name: {
            type: 'string',
            required: true
        },
        sets: {
            type: 'integer',
            required: true
        },
        reps: {
            type: 'integer',
            required: true
        },
        weight: {
            type: 'integer',
            required: true
        }
    }
};