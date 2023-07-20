import React from "react";
import renderer from "react-test-renderer";
import { render, screen, fireEvent } from "@testing-library/react";
import { Button } from "./button";

describe("Тест компонента Button", () => {
  it("Кнопка с текстом", () => {
    const tree = renderer.create(<Button text="Тест" />).toJSON();

    expect(tree).toMatchSnapshot();
  });

  it("Кнопка без текста", () => {
    const tree = renderer.create(<Button text="" />).toJSON();

    expect(tree).toMatchSnapshot();
  });

  it("Заблокировання кнопка", () => {
    const tree = renderer.create(<Button disabled={true} />).toJSON();

    expect(tree).toMatchSnapshot();
  });

  it("Кнопка с индикацией загрузки", () => {
    const tree = renderer.create(<Button isLoader={true} />).toJSON();

    expect(tree).toMatchSnapshot();
  });

  it("Проверка вызова коллбэка при клике", () => {
    window.alert = jest.fn();
    render(
      <Button
        text="Тест"
        onClick={() => {
          window.alert("Кнопку нажали");
        }}
      />
    );

    const button = screen.getByText("Тест");
    fireEvent.click(button);

    expect(window.alert).toHaveBeenCalledWith("Кнопку нажали");
  });
});
