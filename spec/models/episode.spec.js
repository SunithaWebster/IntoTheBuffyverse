const mongoose = require("mongoose");

require("../mongodb_helper");
const Episode = require("../../models/episode");

describe("Episode model", () => {
  beforeEach((done) => {
    mongoose.connection.collections.episodes.drop(() => {
      done();
    });
  });

  it("has an episode number", () => {
    const episode = new Episode({
      episode_number: 1,
    });
    expect(episode.episode_number).toEqual(1);
  });

  it("has an episode name", () => {
    const episode = new Episode({
      episode_name: "Welcome to the Hellmouth",
    });
    expect(episode.episode_name).toEqual("Welcome to the Hellmouth");
  });

  it("has a episode description", () => {
    const episode = new Episode({
      episode_description:
        "When teen vampire slayer Buffy tries to start a new life at Sunnydale High, she discovers that the school sits atop a demonic dimensional portal.",
    });
    expect(episode.episode_description).toContain("vampire slayer Buffy tries");
  });

  it("has a list of the characters appearing in the episode", () => {
    const episode = new Episode({
      characters_involved: [
        "Angel",
        "Buffy Summers",
        "Cordelia Chase",
        "Darla",
        "Rupert Giles",
        "Robert Flutie",
        "Alexander Harris",
        "Master",
        "Willow Rosenberg",
        "Joyce Summers",
        "Luke",
        "Jesse McNally",
      ],
    });
    expect(episode.characters_involved[2]).toContain("Cordelia Chase");
  });

  it("has an image url for the episode", () => {
    const episode = new Episode({
      images_url:
        "https://static.wikia.nocookie.net/buffy/images/1/14/1x01_002.jpg/revision/latest/scale-to-width-down/668?cb=20180123203848",
    });
    expect(episode.images_url).toEqual(
      "https://static.wikia.nocookie.net/buffy/images/1/14/1x01_002.jpg/revision/latest/scale-to-width-down/668?cb=20180123203848"
    );
  });

  it("has the season number of the episode", () => {
    const episode = new Episode({
      season_number: 1,
    });
    expect(episode.season_number).toEqual(1);
  });

  it("can list all episodes", (done) => {
    Episode.find((err, episodes) => {
      expect(err).toBeNull();
      expect(episodes).toEqual([]);
      done();
    });
  });

  it("can save an episode", (done) => {
    const episode = new Episode({
      episode_number: 1,
      episode_name: "Welcome to the Hellmouth",
      episode_description:
        "When teen vampire slayer Buffy tries to start a new life at Sunnydale High, she discovers that the school sits atop a demonic dimensional portal.",
      season_number: 1,
      characters_involved: [
        "Angel",
        "Buffy Summers",
        "Cordelia Chase",
        "Darla",
        "Rupert Giles",
        "Robert Flutie",
        "Alexander Harris",
        "Master",
        "Willow Rosenberg",
        "Joyce Summers",
        "Luke",
        "Jesse McNally",
      ],
      images_url:
        "https://static.wikia.nocookie.net/buffy/images/1/14/1x01_002.jpg/revision/latest/scale-to-width-down/668?cb=20180123203848",
      in_lore_year: 1997,
      irl_release_date: "Mar 10 1997",
    });

    episode.save((err) => {
      expect(err).toBeNull();

      Episode.find((err, episodes) => {
        expect(err).toBeNull();

        expect(episodes[0]).toMatchObject({ episode_number: 1 });
        expect(episodes[0]).toMatchObject({
          episode_name: "Welcome to the Hellmouth",
        });
        expect(episodes[0]).toMatchObject({
          episode_description:
            "When teen vampire slayer Buffy tries to start a new life at Sunnydale High, she discovers that the school sits atop a demonic dimensional portal.",
        });
        expect(episodes[0]).toMatchObject({ season_number: 1 });
        expect(episodes[0]).toMatchObject({
          characters_involved: [
            "Angel",
            "Buffy Summers",
            "Cordelia Chase",
            "Darla",
            "Rupert Giles",
            "Robert Flutie",
            "Alexander Harris",
            "Master",
            "Willow Rosenberg",
            "Joyce Summers",
            "Luke",
            "Jesse McNally",
          ],
        });
        expect(episodes[0]).toMatchObject({
          images_url:
            "https://static.wikia.nocookie.net/buffy/images/1/14/1x01_002.jpg/revision/latest/scale-to-width-down/668?cb=20180123203848",
        });
        expect(episodes[0]).toMatchObject({ in_lore_year: 1997 });
        expect(episodes[0]).toMatchObject({ irl_release_date: "Mar 10 1997" });

        done();
      });
    });
  });
});
