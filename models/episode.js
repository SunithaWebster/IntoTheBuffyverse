const mongoose = require("mongoose");

const EpisodeSchema = new mongoose.Schema({
  //adds column to database table
  episode_number: Number,
  episode_name: String,
  episode_description: String,
  season_number: Number,
  characters_involved: Array,
  images_url: String,
  in_lore_date: Date, 
  irl_release_date: Date
});

const Episode = mongoose.model("Episode", EpisodeSchema);

module.exports = Episode;
