/* eslint-disable testing-library/await-async-utils */
import {
  baseRouteUrl,
  buttonTestId,
  changingColor,
  circleTestId,
  defaultColor,
  inputTestId,
} from "../../src/constants/cypress-tests";

describe("Тестирование работы страницы Стека", () => {
  beforeEach(() => {
    cy.visit(`${baseRouteUrl}/stack `);
  });
  it("проверка состояния кнопки при первом заходе на страницу", () => {
    cy.get(inputTestId).should("have.value", "");
    cy.get(buttonTestId).should("be.disabled");
  });
  it("проверка корректности добавления элемента в стек", () => {
    cy.get(inputTestId).type("1");
    cy.clock();
    cy.get(buttonTestId).contains("Добавить").click();

    cy.get(circleTestId).each((item, i) => {
      if (i === 0)
        cy.wrap(item)
          .should("have.css", "border", changingColor)
          .parent()
          .should("contain", "top");
    });
    cy.wait(500);
    cy.get(circleTestId).each((item, i) => {
      if (i === 0)
        cy.wrap(item)
          .should("have.css", "border", defaultColor)
          .parent()
          .should("contain", "top");
    });

    cy.get(inputTestId).type("2");
    cy.get(buttonTestId).contains("Добавить").click();
    cy.get(circleTestId).each((item, i) => {
      if (i === 1)
        cy.wrap(item)
          .should("have.css", "border", changingColor)
          .parent()
          .should("contain", "top");
    });
    cy.tick(500);
    cy.get(circleTestId).each((item, i) => {
      if (i === 1)
        cy.wrap(item)
          .should("have.css", "border", defaultColor)
          .parent()
          .should("contain", "top");
    });

    cy.get(inputTestId).type("3");
    cy.get(buttonTestId).contains("Добавить").click();
    cy.get(circleTestId).each((item, i) => {
      if (i === 2)
        cy.wrap(item)
          .should("have.css", "border", changingColor)
          .parent()
          .should("contain", "top");
    });
    cy.tick(500);
    cy.get(circleTestId).each((item, i) => {
      if (i === 2)
        cy.wrap(item)
          .should("have.css", "border", defaultColor)
          .parent()
          .should("contain", "top");
    });
  });
  it("Проверка правильности удаления элемента из стека", () => {
    cy.get(inputTestId).type("1");
    cy.get(buttonTestId).contains("Добавить").click();

    cy.get(inputTestId).type("2");
    cy.get(buttonTestId).contains("Добавить").click();

    cy.get(buttonTestId).contains("Удалить").click();
    cy.clock();
    cy.get(circleTestId).eq(0).should("have.css", "border", changingColor) &&
      cy.get(circleTestId).should("have.length", 1);
    cy.tick(500);
    cy.get(circleTestId).eq(0).should("have.css", "border", defaultColor) &&
      cy.get(circleTestId).should("have.length", 1);
  });
  it("Проверка правильности полной очистки стэка", () => {
    cy.get(inputTestId).type("1");
    cy.get(buttonTestId).contains("Добавить").click();

    cy.get(inputTestId).type("2");
    cy.get(buttonTestId).contains("Добавить").click();

    cy.get(inputTestId).type("3");
    cy.get(buttonTestId).contains("Добавить").click();

    cy.clock();
    cy.get(buttonTestId).contains("Очистить").click();
    cy.tick(500);

    cy.get(circleTestId).should("have.length", 0);
  });
});
