describe("Home page", () => {
  it("checks that the 'Into the Buffyverse' strapline logo is present"),
    () => {
      cy.visit("/");
      cy.get('div[class="logo"]').find("p").contains("Into the Buffyverse");
    };

  it("checks that the body has the navbar and logo divs"),
    () => {
      cy.get("body")
        .get("div")
        // finds the larger, div.navbar and
        // and the further nested div.logo inside
        .should("have.class", "navbar")
        .and("have.class", "logo");
    };

  it("checks that the Episode title is included"),
    () => {
      cy.get("h3").contains("Episode View: S1, E1: Welcome to the Hellmouth");
    };

  it("checks that the Buffy the Vampire Slayer logo is included"),
    () => {
      cy.get("h1")
        .find("img")
        .should("have.class", "logo")
        .should("have.attr", "alt")
        .should("include", "Buffy the Vampire Slayer Logo");
    };

  it("checks that the navbar icon is present"),
    () => {
      cy.get('div[class="navbar"]')
        .find("img")
        .should("have.id", "menu")
        .should("have.attr", "src")
        .and("include", "images/menuicon2.png");
    };

  it("checks that the viewport has expected nested elements"),
    () => {
      cy.get('div[class="viewport"]')
        .get("div")
        .should("have.class", "scene3D-container")
        .should("have.class", "scene3D")
        .should("have.class", "card")
        .should("have.class", "card_right")
        .should("have.class", "card_right__details")
        .should("have.class", "card_right__review")
        .and(
          "include",
          'a[href="https://m.media-amazon.com/images/M/MV5BY2MwOGIyZGYtNzgxZC00N2Q5LTllYjItM2U4MTkwMDBjYzUyXkEyXkFqcGdeQXVyNzA5NjUyNjM@._V1_FMjpg_UX1000_.jpg"]'
        );
    };

  it("checks for the presence of the left and inverted card elements"),
    () => {
      cy.get('div[class="card_left"]')
        .find("img")
        .should("have.attr", "src")
        .and(
          "include",
          "https://m.media-amazon.com/images/M/MV5BY2MwOGIyZGYtNzgxZC00N2Q5LTllYjItM2U4MTkwMDBjYzUyXkEyXkFqcGdeQXVyNzA5NjUyNjM@._V1_FMjpg_UX1000_.jpg"
        );
    };

  it("checks for card elements on either end"),
    () => {
      cy.scrollTo(0, 3600).get('div[id="300"]').should("be.visible");
    };

  // it('can navigate the menu items', () => {
  //   cy.get('[data-cy="dropdown-link-about"]').click();
  //   cy.location('pathname').should('match', /\/about$/);
  //   cy.contains('main h1', 'About').should('be.visible');
  // });
});
