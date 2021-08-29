const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const TodayWorkout = new Schema({
    type: String
});

const TodayWorkout = mongoose.model("TodayWorkout", TodayWorkout);
module.exports = TodayWorkout;