import React from "react";
import { ElementStates } from "../../types/element-states";

import { bubbleSortAscending } from "../../utils/utils";
import { bubbleSortDescending } from "../../utils/utils";
import { selectionSortAscending } from "../../utils/utils";
import { selectionSortDescending } from "../../utils/utils";

describe("тест алгоритмa сортировки пузырьком", () => {
  it("сортирует пустой массив по убывания", () => {
    const arrToShow: Array<{ letter: number; state: ElementStates }[]> = [];
    const arrToSort: number[] = [];
    bubbleSortDescending(arrToShow, arrToSort);
    expect(arrToShow).toEqual([[], []]);
  });

  it("сортирует массив с одним элементом по убыванию", () => {
    const arrToShow: Array<{ letter: number; state: ElementStates }[]> = [[]];
    const arrToSort: number[] = [1];

    bubbleSortDescending(arrToShow, arrToSort);
    expect(arrToShow).toEqual([
      [{ letter: 1, state: ElementStates.Changing }],
      [{ letter: 1, state: ElementStates.Modified }],
    ]);
  });

  it("сортирует массив из нескольких элементов по убывания", () => {
    const arrToShow: Array<{ letter: number; state: ElementStates }[]> = [];
    const arrToSort: number[] = [3, 32, 54, 56];
    bubbleSortDescending(arrToShow, arrToSort);

    expect(arrToShow).toEqual([
      [
        { letter: 3, state: "changing" },
        { letter: 32, state: "changing" },
        { letter: 54, state: "default" },
        { letter: 56, state: "default" },
      ],
      [
        { letter: 3, state: "changing" },
        { letter: 32, state: "changing" },
        { letter: 54, state: "default" },
        { letter: 56, state: "modified" },
      ],
      [
        { letter: 32, state: "default" },
        { letter: 3, state: "changing" },
        { letter: 54, state: "changing" },
        { letter: 56, state: "modified" },
      ],
      [
        { letter: 32, state: "default" },
        { letter: 54, state: "default" },
        { letter: 3, state: "changing" },
        { letter: 56, state: "modified" },
      ],
      [
        { letter: 32, state: "changing" },
        { letter: 54, state: "changing" },
        { letter: 56, state: "modified" },
        { letter: 3, state: "modified" },
      ],
      [
        { letter: 54, state: "default" },
        { letter: 32, state: "changing" },
        { letter: 56, state: "modified" },
        { letter: 3, state: "modified" },
      ],
      [
        { letter: 54, state: "changing" },
        { letter: 56, state: "modified" },
        { letter: 32, state: "modified" },
        { letter: 3, state: "modified" },
      ],
      [
        { letter: 56, state: "modified" },
        { letter: 54, state: "modified" },
        { letter: 32, state: "modified" },
        { letter: 3, state: "modified" },
      ],
    ]);
  });
});
describe("Тест алгоритма сортировки пузырьком по возрастанию", () => {
  it("сортирует пустой массив по возрастанию", () => {
    const arrToShow: Array<{ letter: number; state: ElementStates }[]> = [];
    const arrToSort: number[] = [];
    bubbleSortAscending(arrToShow, arrToSort);
    expect(arrToShow).toEqual([[], []]);
  });

  it("сортирует массив с одним элементом по возрастанию", () => {
    const arrToShow: Array<{ letter: number; state: ElementStates }[]> = [[]];
    const arrToSort: number[] = [1];

    bubbleSortAscending(arrToShow, arrToSort);
    expect(arrToShow).toEqual([
      [{ letter: 1, state: ElementStates.Changing }],
      [{ letter: 1, state: ElementStates.Modified }],
    ]);
  });

  it("сортирует массив из нескольких элементов по возрастанию", () => {
    const arrToShow: Array<{ letter: number; state: ElementStates }[]> = [];
    const arrToSort: number[] = [77, 81, 18, 35];

    bubbleSortAscending(arrToShow, arrToSort);

    expect(arrToShow).toEqual([
      [
        { letter: 77, state: "changing" },
        { letter: 81, state: "changing" },
        { letter: 18, state: "default" },
        { letter: 35, state: "default" },
      ],
      [
        { letter: 77, state: "changing" },
        { letter: 81, state: "changing" },
        { letter: 18, state: "default" },
        { letter: 35, state: "default" },
      ],
      [
        { letter: 77, state: "default" },
        { letter: 81, state: "changing" },
        { letter: 18, state: "changing" },
        { letter: 35, state: "default" },
      ],
      [
        { letter: 77, state: "default" },
        { letter: 18, state: "default" },
        { letter: 81, state: "changing" },
        { letter: 35, state: "changing" },
      ],
      [
        { letter: 77, state: "changing" },
        { letter: 18, state: "changing" },
        { letter: 35, state: "default" },
        { letter: 81, state: "modified" },
      ],
      [
        { letter: 18, state: "default" },
        { letter: 77, state: "changing" },
        { letter: 35, state: "changing" },
        { letter: 81, state: "modified" },
      ],
      [
        { letter: 18, state: "changing" },
        { letter: 35, state: "changing" },
        { letter: 77, state: "modified" },
        { letter: 81, state: "modified" },
      ],
      [
        { letter: 18, state: "modified" },
        { letter: 35, state: "modified" },
        { letter: 77, state: "modified" },
        { letter: 81, state: "modified" },
      ],
    ]);
  });
});

describe("Тест алгоритма сортировки массива выбором по возрастанию", () => {
  it("сортирует пустой массив по возрастанию", () => {
    const arrToShow: Array<{ letter: number; state: ElementStates }[]> = [];
    const arrToSort: number[] = [];

    selectionSortAscending(arrToShow, arrToSort);
    expect(arrToShow).toEqual([[]]);
  });

  it("сортирует массив с одним элементом по возрастанию", () => {
    const arrToShow: Array<{ letter: number; state: ElementStates }[]> = [];
    const arrToSort: number[] = [1];

    selectionSortAscending(arrToShow, arrToSort);
    expect(arrToShow).toEqual([[{ letter: 1, state: ElementStates.Modified }]]);
  });

  it("сортирует массив из нескольких элементов по возрастанию", () => {
    const arrToShow: Array<{ letter: number; state: ElementStates }[]> = [];
    const arrToSort: number[] = [55, 36, 47];

    selectionSortAscending(arrToShow, arrToSort);
    expect(arrToShow).toEqual([
      [
        { letter: 55, state: "changing" },
        { letter: 36, state: "changing" },
        { letter: 47, state: "default" },
      ],
      [
        { letter: 55, state: "changing" },
        { letter: 36, state: "default" },
        { letter: 47, state: "changing" },
      ],
      [
        { letter: 36, state: "modified" },
        { letter: 55, state: "changing" },
        { letter: 47, state: "default" },
      ],
      [
        { letter: 36, state: "modified" },
        { letter: 55, state: "changing" },
        { letter: 47, state: "changing" },
      ],
      [
        { letter: 36, state: "modified" },
        { letter: 47, state: "modified" },
        { letter: 55, state: "changing" },
      ],
      [
        { letter: 36, state: "modified" },
        { letter: 47, state: "modified" },
        { letter: 55, state: "modified" },
      ],
    ]);
  });
});

describe("Тест алгоритма сортировки выбором по убыванию", () => {
  it("сортирует пустой массив по убыванию", () => {
    const arrToShow: Array<{ letter: number; state: ElementStates }[]> = [];
    const arrToSort: number[] = [];

    selectionSortDescending(arrToShow, arrToSort);
    expect(arrToShow).toEqual([[], []]);
  });

  it("сортирует массив с одним элементом по убыванию", () => {
    const arrToShow: Array<{ letter: number; state: ElementStates }[]> = [];
    const arrToSort: number[] = [1];

    selectionSortDescending(arrToShow, arrToSort);
    expect(arrToShow).toEqual([
      [{ letter: 1, state: ElementStates.Changing }],
      [{ letter: 1, state: ElementStates.Modified }],
    ]);
  });
  it("сортирует массив из нескольких элементов по возрастанию", () => {
    const arrToShow: Array<{ letter: number; state: ElementStates }[]> = [];
    const arrToSort: number[] = [66, 96, 76];

    selectionSortDescending(arrToShow, arrToSort);
    expect(arrToShow).toEqual([
      [
        { letter: 66, state: "changing" },
        { letter: 96, state: "changing" },
        { letter: 76, state: "default" },
      ],
      [
        { letter: 96, state: "changing" },
        { letter: 66, state: "changing" },
        { letter: 76, state: "default" },
      ],
      [
        { letter: 96, state: "modified" },
        { letter: 76, state: "changing" },
        { letter: 66, state: "changing" },
      ],
      [
        { letter: 96, state: "modified" },
        { letter: 76, state: "modified" },
        { letter: 66, state: "modified" },
      ],
    ]);
  });
});
