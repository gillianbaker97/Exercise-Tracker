const express = require("express");
const logger = require("morgan");
const mongoose = require("mongoose");
const { MongoClient } = require('mongodb');
//const uri="mongodb+srv://AtlasAdmin:<koalalove97>@cluster0.vjzey.mongodb.net/Exercises?retryWrites=true&w=majority";
const uri = process.env.MONGODB_URI;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
client.connect(err => {
  const collection = client.db("test").collection("devices");
  // perform actions on the collection object
  client.close();
});

const PORT = process.env.PORT || 3000;

const db = require("./models")
const app = express();

app.use(logger("dev"));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static("public"));

mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/Exercises", { useUnifiedTopology: true, useNewUrlParser: true, useCreateIndex: true, });

//creating all the exercises we need for the database
db.Exercises.create({name: "Daily Workout"})
  .then(dbExercises => {
    console.log(dbExercises);
    console.log("your workouts were created!");
  })
  .catch(({message}) => {
    console.log(message);
  });

//updating a new workout by id
app.post("/Exercises", ({body}, res) => {
  db.Exercises.create(body)
    .then(({_id}) => db.Exercises.findOneAndUpdate({}, {$push: { workouts: _id}}, {new: true}))
    .then(dbExercises => {
      res.json(dbExercises);
      console.log("your workout was updated!");
    })
    .catch(err => {
      res.json(err);
      console.log("your workout failed to update; please try again");
    });
});

//finding all workouts
app.get("/Exercises", (req, res) => {
  db.Exercises.find({})
  .then(dbExercises => {
    res.json(dbExercises);
    console.log("found the workouts!")
  })
  .catch(err => {
    res.json(err);
  });
});

//getting the exercises themselves so we can do the workouts
app.get("/Exercises", (req, res) => {
  db.Exercises.find({})
  .then( dbExercises => {
    res.json(dbExercises);
    console.log("exercise retrieved!");
  })
  .catch(err => {
    res.json(err)
  });
});

app.listen(PORT, () => {
  console.log(`App running on port ${PORT}!`);
});




