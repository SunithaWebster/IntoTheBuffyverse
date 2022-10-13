describe("Roadmap page", () => {
  it("checks that the 'Into the Buffyverse' strapline logo is present"),
    () => {
      cy.visit("/roadmap");
      cy.get('div[class="logo"]').find("p").contains("Into the Buffyverse");
    };

  it("checks that it has a title"),
    () => {
      cy.get("h3").and("include", "Roadmap");
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

  it("checks that the Story Events list item and information are present"),
    () => {
      cy.get('div[class="roadmap"]')
        .find("p")
        .should("include", "whether standalone or spanning");
    };

  it("checks that the Story Events list item and information are present"),
    () => {
      cy.get('div[class="roadmap"]')
        .find("p")
        .should("include", "whether standalone or spanning");
    };
});
