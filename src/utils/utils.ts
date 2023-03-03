import React from "react";
import { ElementStates } from "../types/element-states";
import { LettersStep } from "../types/utils";

export const randomArr = (minLen: number, maxLen: number): number[] => {
  const len = Math.floor(Math.random() * (maxLen - minLen + 1)) + minLen;
  const arr = new Array(len).fill(0).map(() => Math.floor(Math.random() * 101));
  return arr;
};

export const SelectionSort = (
  arr: number[],
  setIsSorting: React.Dispatch<React.SetStateAction<boolean>>,
  setArr: React.Dispatch<React.SetStateAction<number[]>>,
  sortDirection: string
) => {
  setIsSorting(true);
  const animations: number[][] = [];

  for (let i = 0; i < arr.length - 1; i++) {
    let minIndex = i;

    for (let j = i + 1; j < arr.length; j++) {
      animations.push([minIndex, j]);

      if (
        sortDirection === "Ascending"
          ? arr[j] < arr[minIndex]
          : arr[j] > arr[minIndex]
      ) {
        minIndex = j;
      }
    }

    if (minIndex !== i) {
      animations.push([minIndex, i]);
      [arr[i], arr[minIndex]] = [arr[minIndex], arr[i]];
    }
  }

  let i = 0;
  const interval = setInterval(() => {
    if (i >= animations.length) {
      clearInterval(interval);
      setIsSorting(false);
      return;
    }

    const [firstIndex, secondIndex] = animations[i];

    setArr((prevArr) => {
      const newBars = [...prevArr];
      [newBars[firstIndex], newBars[secondIndex]] = [
        newBars[secondIndex],
        newBars[firstIndex],
      ];
      return newBars;
    });

    i++;
  }, 1000);
};
export const BubbleSort = (
  arr: number[],
  setIsSorting: React.Dispatch<React.SetStateAction<boolean>>,
  setArr: React.Dispatch<React.SetStateAction<number[]>>,
  sortDirection: string
) => {
  setIsSorting(true);
  const animations: number[][] = [];

  for (let i = 0; i < arr.length - 1; i++) {
    for (let j = 0; j < arr.length - i - 1; j++) {
      animations.push([j, j + 1]);

      if (
        sortDirection === "Ascending"
          ? arr[j] > arr[j + 1]
          : arr[j] < arr[j + 1]
      ) {
        animations.push([j, j + 1]);
        [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
      }
    }
  }

  let i = 0;
  const interval = setInterval(() => {
    if (i >= animations.length) {
      clearInterval(interval);
      setIsSorting(false);
      return;
    }

    const [firstIndex, secondIndex] = animations[i];

    setArr((prevArr) => {
      const newBars = [...prevArr];
      [newBars[firstIndex], newBars[secondIndex]] = [
        newBars[secondIndex],
        newBars[firstIndex],
      ];
      return newBars;
    });

    i++;
  }, 1000);
};

export const getSteps = (source: string): LettersStep[] => {
  const letters = source.split("");
  const steps: LettersStep[] = [];
  const len = letters.length;

  const elementStates = new Array<ElementStates>(len).fill(
    ElementStates.Default
  );

  for (let i = 0; i < Math.ceil(len / 2); i++) {
    const leftIndex = i;
    const rightIndex = len - 1 - i;

    elementStates[leftIndex] = ElementStates.Changing;
    elementStates[rightIndex] = ElementStates.Changing;

    [letters[leftIndex], letters[rightIndex]] = [
      letters[rightIndex],
      letters[leftIndex],
    ];

    steps.push({
      letters: [...letters],
      index: i,
      state: [...elementStates],
    });

    elementStates[leftIndex] = ElementStates.Modified;
    elementStates[rightIndex] = ElementStates.Modified;

    steps.push({
      letters: [...letters],
      index: i,
      state: [...elementStates],
    });
  }

  return steps;
};
