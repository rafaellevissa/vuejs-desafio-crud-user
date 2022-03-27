// https://docs.cypress.io/api/table-of-contents

describe("Auth pages", () => {
  it("Visit login page", () => {
    cy.visit("/");
    cy.get("body").then(($body) => {
      expect($body.find("input[name='username']").length).to.equal(1);
      expect($body.find("input[name='password']").length).to.equal(1);
      expect($body.find("button[type='submit']").length).to.equal(1);
    });
  });

  it("Visit register page", () => {
    cy.visit("/register");
    cy.get("body").then(($body) => {
      expect($body.find("input[name='name']").length).to.equal(1);
      expect($body.find("input[name='username']").length).to.equal(1);
      expect($body.find("input[name='password']").length).to.equal(1);
      expect($body.find("input[name='confirmPassword']").length).to.equal(1);
      expect($body.find("button[type='submit']").length).to.equal(1);
    });
  });
});
