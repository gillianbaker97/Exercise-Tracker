const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const ExercisesSchema = new Schema ({
    name: {
        type: String,
        unique: true
    },

    TodayWorkout: [
        {
            type: Schema.Types.ObjectId,
            ref: "TodayWorkout"
        }
    ]
});

const Exercises = mongoose.model("Exercises", ExercisesSchema);
module.exports = Exercises;