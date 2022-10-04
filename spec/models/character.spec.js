const mongoose = require("mongoose");

require("../mongodb_helper");
const User = require("../../models/user");

describe("Character model", () => {
  beforeEach((done) => {
    mongoose.connection.collections.users.drop(() => {
      done();
    });
  });

  // character_description: String,
  // vital_status: String,
  // species: String,
  // character_relationships_with: Object, 
  // first_seen: String,
  // last_seen: String,
  // season_number: Number,
  // images_url: String,
  // trivia: String

  it.only("has a character name", () => {
    const user = new Character({
      character_name: "Buffy Summers",
    });
    expect(character.character_name).toEqual("Buffy Summers");
  });

  it("has a password", () => {
    const user = new User({
      email: "someone@example.com",
      password: "Password8$",
    });
    expect(user.password).toEqual("Password8$");
  });

  it("can list all users", (done) => {
    User.find((err, users) => {
      expect(err).toBeNull();
      expect(users).toEqual([]);
      done();
    });
  });

  it("can save a user", (done) => {
    const user = new User({
      first_name: "first1",
      last_name: "last1",
      email: "someone@example.com",
      password: "Password8$",
    });

    user.save((err) => {
      expect(err).toBeNull();

      User.find((err, users) => {
        expect(err).toBeNull();

        expect(users[0]).toMatchObject({
          first_name: "first1",
          last_name: "last1",
          email: "someone@example.com",
          password: "Password8$",
        });
        done();
      });
    });
  });
});
