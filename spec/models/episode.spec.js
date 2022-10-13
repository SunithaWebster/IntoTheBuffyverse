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
      title: "Welcome to the Hellmouth",
    });
    expect(episode.title).toEqual("Welcome to the Hellmouth");
  });

  it("has a episode description", () => {
    const episode = new Episode({
      plot: "When teen vampire slayer Buffy tries to start a new life at Sunnydale High, she discovers that the school sits atop a demonic dimensional portal.",
    });
    expect(episode.plot).toEqual(
      "When teen vampire slayer Buffy tries to start a new life at Sunnydale High, she discovers that the school sits atop a demonic dimensional portal."
    );
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
      imgurl: [
        "https://static.wikia.nocookie.net/buffy/images/1/14/1x01_002.jpg/revision/latest/scale-to-width-down/668?cb=20180123203848",
      ],
    });
    expect(episode.imgurl).toEqual([
      "https://static.wikia.nocookie.net/buffy/images/1/14/1x01_002.jpg/revision/latest/scale-to-width-down/668?cb=20180123203848",
    ]);
  });

  it("has the season number of the episode", () => {
    const episode = new Episode({
      season: 1,
    });
    expect(episode.season).toEqual(1);
  });

  it("has the name of the episode director", () => {
    const episode = new Episode({
      director: "Charles Martin Smith",
    });
    expect(episode.director).toEqual("Charles Martin Smith");
  });

  it("provides a quote from the episode", () => {
    const episode = new Episode({
      quote:
        'Buffy Summers: "Now, we can do this the hard way or... Well, actually, there\'s just the hard way." Darla: "That\'s fine with me" Buffy Summers: "Are you sure? Now, this is not gonna be pretty. We\'re talking violence, strong language, adult content."',
    });
    expect(episode.quote).toEqual(
      'Buffy Summers: "Now, we can do this the hard way or... Well, actually, there\'s just the hard way." Darla: "That\'s fine with me" Buffy Summers: "Are you sure? Now, this is not gonna be pretty. We\'re talking violence, strong language, adult content."'
    );
  });

  it("provides trivia information from the episode", () => {
    const episode = new Episode({
      trivia:
        "The scene with Buffy and Giles at the Bronze was Anthony Head's audition scene.",
    });
    expect(episode.trivia).toEqual(
      "The scene with Buffy and Giles at the Bronze was Anthony Head's audition scene."
    );
  });

  it("provides the IMDb link for the episode", () => {
    const episode = new Episode({
      imdb_url: "https://www.imdb.com/title/tt0452716/?ref_=ttep_ep1",
    });
    expect(episode.imdb_url).toEqual(
      "https://www.imdb.com/title/tt0452716/?ref_=ttep_ep1"
    );
  });

  // it("provides the date and time of when the record was created on the website", () => {
  //   const episode = new Episode({
  //     createdAt: '2022-10-10T17:17:00.503Z'
  //   });
  //   expect(episode.createdAt).toBe('2022-10-10T17:17:00.503Z');
  // });

  // it("provides date and time for the last update of the website record", () => {
  //   const episode = new Episode({
  //     updatedAt: "\"2022-10-10T17:17:00.503Z\""
  //   });
  //   expect(episode.updatedAt).toEqual("\"2022-10-10T17:17:00.503Z\"");
  // });

  it("can list all episodes", (done) => {
    Episode.find((err, episodes) => {
      expect(err).toBeNull();
      expect(episodes).toEqual([]);
      done();
    });
  });

  it("can save an episode", (done) => {
    const episode = new Episode({
      season: 1,
      episode_number: 1,
      title: "Welcome to the Hellmouth",
      air_date: "Mar 10 1997",
      lore_year: 1997,
      director: "Charles Martin Smith",
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
      plot: "When teen vampire slayer Buffy tries to start a new life at Sunnydale High, she discovers that the school sits atop a demonic dimensional portal.",
      quote:
        'Buffy Summers: "Now, we can do this the hard way or... Well, actually, there\'s just the hard way." Darla: "That\'s fine with me" Buffy Summers: "Are you sure? Now, this is not gonna be pretty. We\'re talking violence, strong language, adult content."',
      trivia:
        "The scene with Buffy and Giles at the Bronze was Anthony Head's audition scene.",
      imdb_url: "https://www.imdb.com/title/tt0452716/?ref_=ttep_ep1",
      //imgurl://
      //["https://static.wikia.nocookie.net/buffy/images/1/14/1x01_002.jpg/revision/latest/scale-to-width-down/668?cb=20180123203848"],//
      // createdAt: "\"2022-10-10T17:17:00.503Z\"",
      // updatedAt: "\"2022-10-10T17:17:00.503Z\"",
    });

    episode.save((err) => {
      expect(err).toBeNull();

      Episode.find((err, episodes) => {
        expect(err).toBeNull();

        expect(episodes[0]).toMatchObject({ episode_number: 1 });
        expect(episodes[0]).toMatchObject({
          title: "Welcome to the Hellmouth",
        });
        expect(episodes[0]).toMatchObject({
          plot: "When teen vampire slayer Buffy tries to start a new life at Sunnydale High, she discovers that the school sits atop a demonic dimensional portal.",
        });
        expect(episodes[0]).toMatchObject({ season: 1 });
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
        // expect(episodes[0]).toMatchObject({
        //   imgurl:
        //     "https://static.wikia.nocookie.net/buffy/images/1/14/1x01_002.jpg/revision/latest/scale-to-width-down/668?cb=20180123203848",
        // });
        // expect(episodes[0]).toMatchObject({ lore_year: 1997 });
        // expect(episodes[0]).toMatchObject({ air_date: "Mar 10 1997" });

        done();
      });
    });
  });
});
