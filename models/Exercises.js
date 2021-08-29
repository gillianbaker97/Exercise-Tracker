const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const ExercisesSchema = new Schema ({
    
    type: {
        type: String,
        trim: true,
        required: "Define a type of exercise"
    },

    name: { 
        type: String, 
        trim: true,
        required: "What exercise is it?"
    },

    duration: { 
        type: Number,
        trim: true,
        required: "How long were you working out?",
        validate: [({ length }) => length >= 5, "Workout should be shorter."]
        
    },

    weight: { 
        type: Number,
        trim: true,
        required: "How heavy are your weights?",
        validate: [({ length }) => length >= 5, "Workout should be shorter."]
        
    },

    reps: { 
        type: Number,
        trim: true,
        required: "How many reps?",
        validate: [({ length }) => length >= 5, "Workout should be shorter."]
        
    },

    sets: { 
        type: Number,
        trim: true,
        required: "How many sets did you do?",
        validate: [({ length }) => length >= 5, "Workout should be shorter."]
        
    }
});

const Exercises = mongoose.model("Exercises", ExercisesSchema);
module.exports = Exercises;