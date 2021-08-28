const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const ExerciseSchema = new Schema ({
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

const Exercise = mongoose.model("Exercise", ExerciseSchema);
module.exports = Exercise;