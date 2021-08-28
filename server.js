const express = require("express");
const logger = require("morgan");
const mongoose = require("mongoose");

const PORT = process.env.PORT || 3000;

const db = require("./models")
const app = express();

app.use(logger("dev"));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static("public"));

mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/userdb", { useUnifiedTopology: true, useNewUrlParser: true, useCreateIndex: true, });

//creating all the exercises we need for the database
db.Exercises.create({name: "Daily Workout"})
  .then(dbExercises => {
    console.log(dbExercises);
  })
  .catch(({message}) => {
    console.log(message);
  });
//creating a new workout by id
app.post("/submit", ({body}, res) => {
  db.TodayWorkout.create(body)
    .then(({_id}) => db.Exercises.findOneAndUpdate({}, {$push: { workouts: _id}}, {new: true}))
    .then(dbExercises => {
      res.json(dbExercises);
    })
    .catch(err => {
      res.json(err);
    });
});


app.listen(PORT, () => {
  console.log(`App running on port ${PORT}!`);
})