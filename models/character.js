const mongoose = require("mongoose");

const CharacterSchema = new mongoose.Schema({
  //adds column to database table
  character_name: String,
  character_description: String,
  vital_status: String,
  species: String,
  character_relationships_with: Object,
  first_seen: String,
  last_seen: String,
  season_numbers: Array,
  images_url: String,
  trivia: String,
});

const Character = mongoose.model("Character", CharacterSchema);

module.exports = Character;
