import { baseRouteUrl } from "../../src/constants/cypress-tests";

describe("Тест роутинга приложения", () => {
  it("открывается главная страница", () => {
    cy.visit(`${baseRouteUrl}`);
  });

  it("открывается страница разворота строки", () => {
    cy.visit(`${baseRouteUrl}/recursion`);
  });

  it("открывается страница последовательности Фибоначчи", () => {
    cy.visit(`${baseRouteUrl}/fibonacci`);
  });

  it("открывается страница сортировки массива", () => {
    cy.visit(`${baseRouteUrl}/sorting`);
  });

  it("открывается страница стека", () => {
    cy.visit(`${baseRouteUrl}/stack`);
  });

  it("открывается страница очереди", () => {
    cy.visit(`${baseRouteUrl}/queue`);
  });

  it("открывается страница связного списка", () => {
    cy.visit(`${baseRouteUrl}/list`);
  });
});
