/* eslint-disable testing-library/await-async-utils */
import {
  baseRouteUrl,
  buttonTestId,
  changingColor,
  circleSmallTestId,
  circleTestId,
  defaultColor,
  indexInputTestId,
  modifiedColor,
  valueInputTestId,
} from "../../src/constants/cypress-tests";

describe("Тестирование работы страницы связного списка", () => {
  beforeEach(() => {
    cy.visit(`${baseRouteUrl}/list `);
  });

  it("Проверка состояния кнопки при первом заходе на страницу", () => {
    cy.get(valueInputTestId).should("have.value", "");
    cy.get(indexInputTestId).should("have.value", "0");

    cy.contains(buttonTestId, "Добавить в tail").should(
      "have.attr",
      "disabled"
    );

    cy.contains(buttonTestId, "Добавить в head").should(
      "have.attr",
      "disabled"
    );

    cy.contains(buttonTestId, "Добавить по индексу").should(
      "have.attr",
      "disabled"
    );
  });

  it("Проверка корректности отрисовки дефолтного списка", () => {
    cy.get(circleTestId).should("have.length", "7");
    cy.get(circleTestId).eq(0).should("have.text", "1");
    cy.get(circleTestId).eq(1).should("have.text", "2");
    cy.get(circleTestId).eq(2).should("have.text", "3");
    cy.get(circleTestId).eq(3).should("have.text", "19");
    cy.get(circleTestId).eq(4).should("have.text", "44");
    cy.get(circleTestId).eq(5).should("have.text", "81");
    cy.get(circleTestId).eq(6).should("have.text", "77");
  });
  it("Проверка корректности добавления элемента в head", () => {
    cy.get(valueInputTestId).type("34");
    cy.clock();

    cy.get(buttonTestId).contains("Добавить в head").click();
    cy.get(circleTestId).eq(0).parent().contains(circleTestId, "34");

    cy.get(circleTestId)
      .eq(0)
      .parent()
      .contains(circleTestId, "34")
      .should("have.css", "border", changingColor);

    cy.tick(500);

    cy.get(circleTestId).eq(0).should("have.text", "34");
    cy.get(circleTestId).eq(0).should("have.css", "border", modifiedColor);

    cy.tick(500);

    cy.get(circleTestId).eq(0).should("have.text", "34");
    cy.get(circleTestId).eq(0).should("have.css", "border", defaultColor);
    cy.get(circleTestId).should("have.length", "8");
  });

  it("Проверка корректности добавления элемента в tail", () => {
    cy.get(valueInputTestId).type("34");

    cy.clock();

    cy.get(buttonTestId).contains("Добавить в tail").click();
    cy.get(circleTestId).eq(6).parent().contains(circleTestId, "34");

    cy.tick(500);

    cy.get(circleTestId).eq(6).should("have.text", "34");
    cy.get(circleTestId).eq(7).should("have.css", "border", modifiedColor);

    cy.tick(500);

    cy.get(circleTestId).eq(7).should("have.text", "34");
    cy.get(circleTestId).eq(7).should("have.css", "border", defaultColor);
    cy.get(circleTestId).should("have.length", "8");
  });

  it("Проверка корректности добавления элемента по индексу", () => {
    cy.get(indexInputTestId).type("2");
    cy.get(valueInputTestId).type("34");
    cy.clock();

    cy.get(buttonTestId).contains("Добавить по индексу").click();
    cy.get(circleTestId)
      .eq(0)
      .parent()
      .contains(circleTestId, "34")
      .should("have.css", "border", changingColor);

    cy.tick(1000);

    cy.get(circleTestId).eq(0).should("have.css", "border", changingColor);
    cy.get(circleTestId)
      .eq(1)
      .parent()
      .contains(circleTestId, "34")
      .should("have.css", "border", changingColor);

    cy.tick(1000);

    cy.get(circleTestId).eq(0).should("have.css", "border", changingColor);
    cy.get(circleTestId).eq(1).should("have.css", "border", changingColor);
    cy.get(circleTestId)
      .eq(2)
      .parent()
      .contains(circleTestId, "34")
      .should("have.css", "border", changingColor);

    cy.tick(1000);

    cy.get(circleTestId).eq(0).should("have.css", "border", defaultColor);
    cy.get(circleTestId).eq(1).should("have.css", "border", defaultColor);
    cy.get(circleTestId)
      .eq(2)
      .contains(circleTestId, "34")
      .should("have.css", "border", defaultColor);
    cy.tick(1000);
    cy.get(circleTestId).should("have.length", "8");
  });

  it("Проверка корректности удаления элемента из head", () => {
    cy.clock();
    cy.tick(1000);
    cy.get(buttonTestId).contains("Удалить из head").click();
    cy.get(circleTestId)
      .eq(0)
      .should("have.text", "")
      .should("have.css", "border", modifiedColor);
    cy.get(circleSmallTestId)
      .should("have.css", "border", changingColor)
      .should("have.text", "1");
    cy.tick(1000);

    cy.get(circleTestId).should("have.length", 6);
    cy.get(circleTestId).eq(0).should("have.text", "2");
    cy.get(circleTestId).eq(0).parent().should("contain", "head");
  });

  it("Проверка корректности удаления элемента из tail", () => {
    cy.clock();
    cy.tick(1000);
    cy.get(buttonTestId).contains("Удалить из tail").click();
    cy.get(circleTestId)
      .eq(6)
      .should("have.text", "")
      .should("have.css", "border", defaultColor);
    cy.get(circleSmallTestId)
      .should("have.css", "border", changingColor)
      .should("have.text", "77");
    cy.tick(1000);

    cy.get(circleTestId).should("have.length", 6);
    cy.get(circleTestId).eq(5).should("have.text", "81");
    cy.get(circleTestId).eq(5).parent().should("contain", "tail");
  });

  it("Проверка корректности удаления элемента по индексу", () => {
    cy.get(indexInputTestId).type("2");

    cy.get(buttonTestId).contains("Удалить по индексу").click();
    cy.wait(1000);

    cy.get(circleTestId).eq(0).should("have.css", "border", changingColor);
    cy.clock();

    cy.tick(1000);
    cy.get(circleTestId).eq(1).should("have.css", "border", changingColor);

    cy.tick(1000);
    cy.get(circleTestId).eq(2).should("have.css", "border", changingColor);

    cy.tick(1000);
    cy.get(circleTestId).eq(2).should("have.text", "");
    cy.get(circleSmallTestId)
      .should("have.css", "border", changingColor)
      .should("have.text", "3");

    cy.tick(1000);
    cy.get(circleTestId).eq(2).should("have.text", "19");
    cy.get(circleTestId).eq(2).should("have.css", "border", defaultColor);
    cy.get(circleTestId).should("have.length", 6);
  });
});
