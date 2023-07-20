/* eslint-disable testing-library/await-async-utils */
import {
  baseRouteUrl,
  buttonTestId,
  changingColor,
  circleTestId,
  defaultColor,
  inputTestId,
} from "../../src/constants/cypress-tests";

describe("Тестирование работы страницы Очереди", () => {
  beforeEach(() => {
    cy.visit(`${baseRouteUrl}/queue`);
  });

  it("Проверка состояния кнопки при первом заходе на страницу", () => {
    cy.get(inputTestId).should("have.value", "");
    cy.get(buttonTestId).should("be.disabled");
  });

  it("Проверка корректности добавления элемента в очередь", () => {
    cy.get(inputTestId).type("1");
    cy.get(buttonTestId).contains("Добавить").click();

    cy.clock();
    cy.get(circleTestId).eq(0).should("have.css", "border", changingColor) &&
      cy.get(circleTestId).eq(0).parent().should("contain", "head");
    cy.tick(500);
    cy.get(circleTestId).eq(0).should("have.css", "border", defaultColor) &&
      cy.get(circleTestId).eq(0).parent().should("contain", "head") &&
      cy.get(circleTestId).eq(0).parent().should("contain", "tail");

    cy.wait(500)
    cy.get(inputTestId).type("2");
    cy.get(buttonTestId).contains("Добавить").click();
    cy.get(circleTestId).eq(0).should("have.css", "border", defaultColor) &&
      cy.get(circleTestId).eq(0).parent().should("contain", "head");
    cy.get(circleTestId).eq(1).should("have.css", "border", changingColor) &&
      cy.get(circleTestId).eq(1).parent().should("contain", "tail");
    cy.tick(500);
    cy.get(circleTestId).eq(1).should("have.css", "border", defaultColor) &&
      cy.get(circleTestId).eq(1).parent().should("contain", "tail");
  });

  it('Проверка корректности удаления элемента из очереди', () => {
    cy.get(inputTestId).type("1");
    cy.get(buttonTestId).contains("Добавить").click();

    cy.get(inputTestId).type("2");
    cy.get(buttonTestId).contains("Добавить").click();

    cy.get(inputTestId).type("3");
    cy.get(buttonTestId).contains("Добавить").click();

    cy.clock()
    cy.get(buttonTestId).contains("Удалить").click()

    cy.get(circleTestId).eq(0).should('have.css', 'border', changingColor) && cy.get(circleTestId).eq(1).parent().should('contain','head')
    cy.tick(500) 
    cy.get(circleTestId).eq(0).should('have.text', '')
    cy.get(circleTestId).eq(0).should('have.css', 'border', defaultColor)
  })
  it('Проверка корректности полной очистки элементов из очереди', () => {
    cy.get(inputTestId).type("1");
    cy.get(buttonTestId).contains("Добавить").click();

    cy.get(inputTestId).type("2");
    cy.get(buttonTestId).contains("Добавить").click();

    cy.get(inputTestId).type("3");
    cy.get(buttonTestId).contains("Добавить").click();

    cy.clock()
    cy.get(buttonTestId).contains("Очистить").click()
    cy.tick(500)
    cy.get(circleTestId).eq(0).should('have.text', '') && cy.get(circleTestId).eq(0).parent().should('contain', 'head')
    cy.get(circleTestId).eq(1).should('have.text', '')
    cy.get(circleTestId).eq(2).should('have.text', '')
})
});
