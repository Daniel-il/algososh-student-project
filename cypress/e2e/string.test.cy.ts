import {
  baseRouteUrl,
  buttonTestId,
  changingColor,
  circleTestId,
  defaultColor,
  inputTestId,
  modifiedColor,
} from "../../src/constants/cypress-tests";

describe("Тест страницы разоворота строки", () => {
  beforeEach(() => {
    cy.visit(`${baseRouteUrl}/recursion `);
  });

  it("Проверка состояния кнопки при первом заходе на страницу", () => {
    cy.get(inputTestId).should("have.value", "");
    cy.get(buttonTestId).should("be.disabled");
  });

  it("Проверка на корректность разворачивания строки", () => {
    cy.get(inputTestId).type("dab");
    cy.clock();
    cy.get(buttonTestId).click();

    cy.get(circleTestId).each((item, i) => {
      cy.wrap(item).should("have.css", "border", defaultColor);
      if (i === 0) cy.wrap(item).contains("d");
      if (i === 1) cy.wrap(item).contains("a");
      if (i === 2) cy.wrap(item).contains("b");
    });

    cy.tick(1000);
    cy.get(circleTestId).each((item, i) => {
      if (i === 0)
        cy.wrap(item).contains("b") &&
          cy.wrap(item).should("have.css", "border", changingColor);
      if (i === 1)
        cy.wrap(item).contains("a") &&
          cy.wrap(item).should("have.css", "border", defaultColor);
      if (i === 2)
        cy.wrap(item).contains("d") &&
          cy.wrap(item).should("have.css", "border", changingColor);
    });

    cy.tick(1000);
    cy.get(circleTestId).each((item, i) => {
      if (i === 0)
        cy.wrap(item).contains("b") &&
          cy.wrap(item).should("have.css", "border", changingColor);
      if (i === 1)
        cy.wrap(item).contains("a") &&
          cy.wrap(item).should("have.css", "border", defaultColor);
      if (i === 2)
        cy.wrap(item).contains("d") &&
          cy.wrap(item).should("have.css", "border", changingColor);
    });

    cy.tick(1000);
    cy.get(circleTestId).each((item, i) => {
      if (i === 0)
        cy.wrap(item).contains("b") &&
          cy.wrap(item).should("have.css", "border", modifiedColor);
      if (i === 1)
        cy.wrap(item).contains("a") &&
          cy.wrap(item).should("have.css", "border", defaultColor);
      if (i === 2)
        cy.wrap(item).contains("d") &&
          cy.wrap(item).should("have.css", "border", modifiedColor);
    });

    cy.tick(1000);
    cy.get(circleTestId).each((item, i) => {
      if (i === 0)
        cy.wrap(item).contains("b") &&
          cy.wrap(item).should("have.css", "border", modifiedColor);
      if (i === 1)
        cy.wrap(item).contains("a") &&
          cy.wrap(item).should("have.css", "border", changingColor);
      if (i === 2)
        cy.wrap(item).contains("d") &&
          cy.wrap(item).should("have.css", "border", modifiedColor);
    });

    cy.tick(1000);
    cy.get(circleTestId).each((item, i) => {
      if (i === 0)
        cy.wrap(item).contains("b") &&
          cy.wrap(item).should("have.css", "border", modifiedColor);
      if (i === 1)
        cy.wrap(item).contains("a") &&
          cy.wrap(item).should("have.css", "border", changingColor);
      if (i === 2)
        cy.wrap(item).contains("d") &&
          cy.wrap(item).should("have.css", "border", modifiedColor);
    });

    cy.tick(1000);
    cy.get(circleTestId).each((item, i) => {
      if (i === 0)
        cy.wrap(item).contains("b") &&
          cy.wrap(item).should("have.css", "border", modifiedColor);
      if (i === 1)
        cy.wrap(item).contains("a") &&
          cy.wrap(item).should("have.css", "border", modifiedColor);
      if (i === 2)
        cy.wrap(item).contains("d") &&
          cy.wrap(item).should("have.css", "border", modifiedColor);
    });
  });
});
