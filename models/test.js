const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// create a geolocation schema
const GeoSchema = new Schema({
    type:{
        type: String,
    default:"Point"
    },
    coordinates:{
        type:[Number],
        index:"2dsphere"
    }
    
})    

//creating a anew schema
const ninjaSchema = new Schema({
  name: {
    type: String,
    required: [true, "Name fiels is mandatory"],
  },
  rank: {
    type: String,
  },
  available: {
    type: Boolean,
    default: false,
  },
  geometry: GeoSchema
});

const Ninja = mongoose.model("ninja", ninjaSchema); //loading the data to mongoose database 'ninja'-table in db
module.exports = Ninja;
