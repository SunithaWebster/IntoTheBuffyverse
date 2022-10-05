const mongoose = require("mongoose");

const EventSchema = new mongoose.Schema({
  //adds column to database table
  event_name: String,
  event_description: String,
  episode_numbers: Array,
  season_number: Number,
  characters_involved: Array,
  images_url: String,
  in_lore_year: Number
});

const Event = mongoose.model("Event", EventSchema);

module.exports = Event;
