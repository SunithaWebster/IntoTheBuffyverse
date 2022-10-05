const mongoose = require("mongoose");

const EpisodeSchema = new mongoose.Schema({
  //adds column to database table
  episode_number: Number,
  episode_name: String,
  episode_description: String,
  season_number: Number,
  characters_involved: Array,
  images_url: String,
  in_lore_year: Number,
  irl_release_date: String,
});

const Episode = mongoose.model("Episode", EpisodeSchema);

module.exports = Episode;
