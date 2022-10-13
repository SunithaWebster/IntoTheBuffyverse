describe("about page", () => {
  it("checks that it has a title"),
    () => {
      cy.visit("/about");
      cy.get('h1[class="about"').and("include", "About Team Kitten Poker");
    };

  it("checks that you can navigate to the Miro Board"),
    () => {
      cy.url().should(
        "include",
        'a[href="https://miro.com/app/board/uXjVPRTgeFM=/]'
      );
    };

  it("checks that you can navigate to the trello board"),
    () => {
      cy.url().should(
        "include",
        'a[href="https://trello.com/b/i8kn5ccu/to-do]'
      );
    };

  it("checks that you can navigate to the project git repository"),
    () => {
      cy.url().should(
        "include",
        'a[href="https://github.com/SunithaWebster/IntoTheBuffyverse]'
      );
    };
});
