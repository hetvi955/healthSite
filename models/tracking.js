const mongoose = require("mongoose");
var profileSchema = new mongoose.Schema({
	username: String,
	medicationReminder:[{
       details:String,
       time:Date
        
    }],
    upcomingDoctorVisit:[{
        data:String,
        time:Date
         
     }],
    AttackRecords:[{
    attackType:String,
         intensity : Number,
         Triggers: String,
         affectedActivities:String,
         relief:String,
         medication:String,
         Notes: String,
         symptom:String
        }
    ]

});

module.exports = mongoose.model("Trackeddata", profileSchema);