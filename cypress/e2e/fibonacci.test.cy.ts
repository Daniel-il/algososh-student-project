/* eslint-disable testing-library/await-async-utils */
import {
  baseRouteUrl,
  buttonTestId,
  circleTestId,
  inputTestId,
} from "../../src/constants/cypress-tests";

describe("Тестирование работы страницы Фибоначчи", () => {
  beforeEach(() => {
    cy.visit(`${baseRouteUrl}/fibonacci `);
  });

  it("Проверка состояния кнопки при первом заходе на страницу", () => {
    cy.get(inputTestId).should("have.value", "");
    cy.get(buttonTestId).should("be.disabled");
  });

  it("Проверка корректности генерации чисел последовательности", () => {
    cy.get(inputTestId).type("19");

    cy.get(buttonTestId).click();

    cy.get(circleTestId).each((item, i) => {
      cy.wait(450);
      if (i === 0) cy.wrap(item).contains(1);
      if (i === 1) cy.wrap(item).contains(1);
      if (i === 2) cy.wrap(item).contains(2);
      if (i === 3) cy.wrap(item).contains(3);
      if (i === 4) cy.wrap(item).contains(5);
      if (i === 5) cy.wrap(item).contains(8);
      if (i === 6) cy.wrap(item).contains(13);
      if (i === 7) cy.wrap(item).contains(21);
      if (i === 8) cy.wrap(item).contains(34);
      if (i === 9) cy.wrap(item).contains(55);
      if (i === 10) cy.wrap(item).contains(89);
      if (i === 11) cy.wrap(item).contains(144);
      if (i === 12) cy.wrap(item).contains(233);
      if (i === 13) cy.wrap(item).contains(377);
      if (i === 14) cy.wrap(item).contains(610);
      if (i === 15) cy.wrap(item).contains(987);
      if (i === 16) cy.wrap(item).contains(1597);
      if (i === 17) cy.wrap(item).contains(2584);
      if (i === 18) cy.wrap(item).contains(4181);
    });
  });
});
