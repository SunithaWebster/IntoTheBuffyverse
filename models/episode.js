// const { sortedIndexOf } = require("cypress/types/lodash");
const mongoose = require("mongoose");

const EpisodeSchema = new mongoose.Schema({
  //adds column to database table
  season: Number,
  episode_number: Number,
  title: String,
  air_date: Date,
  lore_year: Date,
  director: String,
  characters_involved: Array,
  plot: String,
  quote: String,
  trivia: String,
  imdb_url: String,
  imgurl: Array,
  createdAt: Date,
  updatedAt: Date,
});

const Episode = mongoose.model("Episode", EpisodeSchema);

module.exports = Episode;
