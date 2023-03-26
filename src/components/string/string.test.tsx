import { getSteps } from "../../utils/utils";
describe("Тест разворота строки", () => {
  it("разворачивает строку с четным количеством символов", () => {
    const source = "123456";
    const expected = "654321";

    const steps = getSteps(source);
    const result = steps[steps.length - 1].letters.join("");

    expect(result).toEqual(expected);
  });

  it("разворачивает строку с нечетным количеством символом", () => {
    const source = "12345";
    const expected = "54321";

    const steps = getSteps(source);
    const result = steps[steps.length - 1].letters.join("");

    expect(result).toEqual(expected);
  });

  it("разворачивает строку с одним символом", () => {
    const source = "1";
    const expected = "1";

    const steps = getSteps(source);
    const result = steps[steps.length - 1].letters.join("");

    expect(result).toEqual(expected);
  });

  it("разворачивает пустую строку", () => {
    const source = "";
    const expected = "";

    const steps = getSteps(source);
    const result = steps[steps.length - 1].letters.join("");

    expect(result).toEqual(expected);
  });
});
