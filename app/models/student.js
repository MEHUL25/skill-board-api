const mongoose = require("mongoose");
// Using mongoose-float for cgpa
var Float2 = require("mongoose-float").loadType(mongoose, 2);

// Not Sure how to use Timestamps in Mongoose ,so please check it
const schemaOptions = {
  timestamps: { createdAt: "created_at", updatedAt: "updated_at" },
};

const studentSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    Login: {
      email: {
        type: String,
        required: true,
        match: /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/,
      },
      password: {
        type: String,
        required: true,
      },
    },
    Personal: {
      name: {
        type: String,
        required: true,
      },
      college: {
        type: String,
        required: true,
      },
      department: {
        type: String,
        required: true,
      },
      year: {
        type: String,
        required: true,
      },
      division: {
        type: String,
        // required: true,
        // Was not sure to keep it mandatory
      },
      rollno: {
        type: String,
        required: true,
      },
    },
    Social: {
      phone: {
        type: Number,
        match: /^[0-9]{10}$/,
        required: true,
      },
      linkedin: {
        type: String,
        required: true,
        match: /[(http(s)?):\/\/(www\.)?a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/gi,
      },
      github: {
        type: String,
        required: true,
        match: /[(http(s)?):\/\/(www\.)?a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/gi,
      },
      personalwebsite: {
        type: String,
        match: /[(http(s)?):\/\/(www\.)?a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/gi,
      },
      resume: {
        type: String,
        match: /[(http(s)?):\/\/(www\.)?a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/gi,
      },
      iswhatsaap: {
        type: Boolean,
        required: true,
      },
    },
    // All required
    Skills: {
      skills: [
        {
          type: String,
          required: true,
        },
      ],
      projectsforskills: [
        {
          type: String,
          match: /[(http(s)?):\/\/(www\.)?a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/gi,
          required: true,
        },
      ],
      topskill: {
        type: String,
        required: true,
      },
      cgpa: {
        type: Float2,
        required: true,
      },
    },
    Optionals: {
      introduction: {
        type: String,
      },
      gender: {
        type: String,
        enum: ["Male", "Female", "Other"],
        required: true,
      },
      age: {
        type: Number,
        min: 10,
        max: 100,
        required: true,
      },
      mother_tongue: {
        type: String,
      },
      languages_known: [{ type: String }],
    },
    MetaData: {
      timestamp: {
        type: Date,
        default: Date.now(),
      },
      hasAdminAccess: {
        type: Boolean,
        required: true,
      },
      github_metadata_object: {
        type: Object,
      },
    },
  },
  schemaOptions
);

module.exports = mongoose.model("Student", studentSchema);

// I have made a few changes in types I have mentioned them below

// Required fields for StudentUser
// ----------------------Login
// Email: str                                                   ---> Required
// password: str                                                ---> Required

// ----------------------Personal
// Name - str                                                   ---> Required
// College - str                                                ---> Required
// Department - str                                             ---> Required
// Year - str                                                   ---> Required
// Division - str
// Roll Number - str                                            ---> Required
// ----------------------Social 
// phone number - number validated for mobile no                ---> Required
// is whatsapp available - boolean                              ---> Required
// github profile url - str validated for url                   ---> Required
// linkedin profile url - str validated for url                 ---> Required
// personal website - str validated for url                                 
// resume - str validated for url
// ---------------------------Skills                             ____> Additonal Field not avaialble in superuser
// skills - array of str                                           ---> Required
// projects for every skill - array of str validated for url       ---> Required
// top-skill - number (index of the top skill from skills array)   ---> Required 
// cgpa till date - number float(with 2 decimal spaces)            ---> Required   
// --------------------------Optionals
// introduction - str
// gender - str             -> String, added enum,                  ---> Required  
// age - number             -> Number, added min/max,                 ---> Required  
// mother tongue - str
// languages known - str    -> Array of Strings
// -------------------------Meta Data
// timestamp - date
//                                                          ---> Removed has admin access
// github metadata object - object
