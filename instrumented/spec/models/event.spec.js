const mongoose = require("mongoose");

require("../mongodb_helper");
const Event = require("../../models/event");

describe("Event model", () => {
  beforeEach((done) => {
    mongoose.connection.collections.events.drop(() => {
      done();
    });
  });

  it("has an event name", () => {
    const event = new Event({
      event_name: "Buffy starts at Sunnydale School",
    });
    expect(event.event_name).toEqual("Buffy starts at Sunnydale School");
  });

  it("has an event description", () => {
    const event = new Event({
      event_description:
        "In the winter of 1997, Buffy Summers, the active Slayer, moved to 1630 Revello Drive, where she began attending Sunnydale High.",
    });
    expect(event.event_description).toContain("moved to 1630 Revello Drive");
  });

  it("has the episode numbers that span an event", () => {
    const event = new Event({
      episode_numbers: [1],
    });
    expect(event.episode_numbers).toEqual([1]);
  });

  it("has the season number of the event", () => {
    const event = new Event({
      season_number: 1,
    });
    expect(event.season_number).toEqual(1);
  });

  it("has a list of the characters appearing in the event", () => {
    const event = new Event({
      characters_involved: [
        "Buffy Summers",
        "Joyce Summers",
        "Robert Flutie",
        "Alexander Harris",
        "Cordelia Chase",
        "Willow Rosenberg",
        "Rupert Giles",
        "Jesse McNally",
      ],
    });
    expect(event.characters_involved[2]).toContain("Robert Flutie");
  });

  it("has an image url for the episode", () => {
    const event = new Event({
      images_url: "https://miro.medium.com/max/1384/0*3GTwPospF4H8gF4N.",
    });
    expect(event.images_url).toEqual(
      "https://miro.medium.com/max/1384/0*3GTwPospF4H8gF4N."
    );
  });

  it("can list all events", (done) => {
    Event.find((err, events) => {
      expect(err).toBeNull();
      expect(events).toEqual([]);
      done();
    });
  });

  it("can save an event", (done) => {
    const event = new Event({
      event_name: "Welcome to the Hellmouth",
      event_description:
        "When teen vampire slayer Buffy tries to start a new life at Sunnydale High, she discovers that the school sits atop a demonic dimensional portal.",
      episode_numbers: [1],
      season_number: 1,
      characters_involved: [
        "Buffy Summers",
        "Joyce Summers",
        "Robert Flutie",
        "Alexander Harris",
        "Cordelia Chase",
        "Willow Rosenberg",
        "Rupert Giles",
        "Jesse McNally",
      ],
      images_url: "https://miro.medium.com/max/1384/0*3GTwPospF4H8gF4N.",
      in_lore_year: 1997,
    });

    event.save((err) => {
      expect(err).toBeNull();

      Event.find((err, events) => {
        expect(err).toBeNull();

        expect(events[0]).toMatchObject({
          event_name: "Welcome to the Hellmouth",
        });
        expect(events[0]).toMatchObject({
          event_description:
            "When teen vampire slayer Buffy tries to start a new life at Sunnydale High, she discovers that the school sits atop a demonic dimensional portal.",
        });
        expect(events[0]).toMatchObject({ episode_numbers: [1] });
        expect(events[0]).toMatchObject({ season_number: 1 });
        expect(events[0]).toMatchObject({
          characters_involved: [
            "Buffy Summers",
            "Joyce Summers",
            "Robert Flutie",
            "Alexander Harris",
            "Cordelia Chase",
            "Willow Rosenberg",
            "Rupert Giles",
            "Jesse McNally",
          ],
        });
        expect(events[0]).toMatchObject({
          images_url: "https://miro.medium.com/max/1384/0*3GTwPospF4H8gF4N.",
        });
        expect(events[0]).toMatchObject({ in_lore_year: 1997 });

        done();
      });
    });
  });
});
