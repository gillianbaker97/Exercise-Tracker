const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const TodayWorkoutSchema = new Schema({
    type: String
});

const TodayWorkout = mongoose.model("TodayWorkout", TodayWorkoutSchema);
module.exports = TodayWorkout;