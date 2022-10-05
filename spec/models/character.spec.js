const mongoose = require("mongoose");

require("../mongodb_helper");
const Character = require("../../models/character");

describe("Character model", () => {
  beforeEach((done) => {
    mongoose.connection.collections.characters.drop(() => {
      done();
    });
  });

  it("has a character name", () => {
    const character = new Character({
      character_name: "Buffy Summers",
    });
    expect(character.character_name).toEqual("Buffy Summers");
  });

  it("has a character description", () => {
    const character = new Character({
      character_description: "Buffy Anne Summers was a Slayer activated in the late 20th century. She moved to Sunnydale with her mother, where she acted as guardian of the Hellmouth for seven years before the town's destruction in mid-2003."
    });
    expect(character.character_description).toContain("Summers was a Slayer");
  });

  it("has details of the life or death status of a character", () => {
    const character = new Character({
      vital_status: "Alive"
    });
    expect(character.vital_status).toEqual("Alive");
  });

  it("has details of the species category of a character", () => {
    const character = new Character({
      species: "Slayer"
    });
    expect(character.species).toEqual("Slayer");
  });

  it("can store relationship details of a character", () => {
    const character = new Character({
      character_relationships_with: {"Angel": "Love Interest", "Joyce Summers": "Mother", "Rupert 'Ripper' Giles": "Watcher"}
    });
    expect(character.character_relationships_with["Joyce Summers"]).toContain("Mother");
  });

  it("has the episode name of the debut of a character", () => {
    const character = new Character({
      first_seen: "Welcome to the Hellmouth"
    });
    expect(character.first_seen).toEqual("Welcome to the Hellmouth");
  });

  it("has the episode name of the finale of a character", () => {
    const character = new Character({
      last_seen: "Finale"
    });
    expect(character.last_seen).toEqual("Finale");
  });

  it("has the episode name of the finale of a character", () => {
    const character = new Character({
      last_seen: "Finale"
    });
    expect(character.last_seen).toEqual("Finale");
  });

  it("has an image url for the character", () => {
    const character = new Character({
      images_url: "https://static.wikia.nocookie.net/buffy/images/9/92/C1.jpg/revision/latest?cb=20130212141636"
    });
    expect(character.images_url).toEqual("https://static.wikia.nocookie.net/buffy/images/9/92/C1.jpg/revision/latest?cb=20130212141636");
  });

  it("has trivia information about the character", () => {
    const character = new Character({
      trivia: "The scene with Buffy and Giles at the Bronze was Anthony Head's audition scene."
    });
    expect(character.trivia).toEqual("The scene with Buffy and Giles at the Bronze was Anthony Head's audition scene.");
  });

  it("has the season numbers in which the character appeared", () => {
    const character = new Character({
      season_numbers: [1, 2, 3, 4, 5, 6, 7]
    });
    expect(character.season_numbers).toEqual([1, 2, 3, 4, 5, 6, 7]);
  });

  it("can list all characters", (done) => {
    Character.find((err, characters) => {
      expect(err).toBeNull();
      expect(characters).toEqual([]);
      done();
    });
  });

  it("can save a character", (done) => {
    const character = new Character({
      character_name: "Buffy Summers",
      character_description: "Buffy Anne Summers was a Slayer activated in the late 20th century. She moved to Sunnydale with her mother, where she acted as guardian of the Hellmouth for seven years before the town's destruction in mid-2003.",
      vital_status: "Alive",
      species: "Slayer",
      character_relationships_with: {"Angel": "Love Interest", "Joyce Summers": "Mother", "Rupert 'Ripper' Giles": "Watcher"}, 
      first_seen: "Welcome to the Hellmouth",
      last_seen: "Finale",
      season_numbers: [1, 2, 3, 4, 5, 6, 7],
      images_url: "https://static.wikia.nocookie.net/buffy/images/9/92/C1.jpg/revision/latest?cb=20130212141636",
      trivia: "The scene with Buffy and Giles at the Bronze was Anthony Head's audition scene.",
    });

    character.save((err) => {
      expect(err).toBeNull();

      Character.find((err, characters) => {
        expect(err).toBeNull();

        expect(characters[0]).toMatchObject({
          character_name: "Buffy Summers",
          character_description: "Buffy Anne Summers was a Slayer activated in the late 20th century. She moved to Sunnydale with her mother, where she acted as guardian of the Hellmouth for seven years before the town's destruction in mid-2003.",
          vital_status: "Alive",
          species: "Slayer",
          character_relationships_with: {"Angel": "Love Interest", "Joyce Summers": "Mother", "Rupert 'Ripper' Giles": "Watcher"}, 
          first_seen: "Welcome to the Hellmouth",
          last_seen: "Finale",
          season_numbers: [1, 2, 3, 4, 5, 6, 7],
          images_url: "https://static.wikia.nocookie.net/buffy/images/9/92/C1.jpg/revision/latest?cb=20130212141636",
          trivia: "The scene with Buffy and Giles at the Bronze was Anthony Head's audition scene.",
        });
        done();
      });
    });
  });
});
