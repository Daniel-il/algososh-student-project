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
  
    // Нет символов - нет шагов, всё честно
    if (letters.length === 0) {
      return steps;
    }
  
    // Первым шагом показываем исходную строку
    steps.push({
      letters: [...letters], 
      state: ElementStates.Default
    });
  
    let leftIndex = 0;
    let rightIndex = letters.length - leftIndex - 1;
  
    // До тех пор, пока не дошли до середины
    while (leftIndex <= rightIndex) {
      // Показываем, какие символы сейчас будут меняться местами
      steps.push({
        letters: [...letters], // Обязательно копируем!
        index: leftIndex,
        state: ElementStates.Changing,
      });
  
      // Меняем символы местами и показываем, что они изменились
      letters[leftIndex] = source[rightIndex];
      letters[rightIndex] = source[leftIndex];
      steps.push({
        letters: [...letters], // Обязательно копируем!
        index: leftIndex,
        state: ElementStates.Modified,
      });
  
      // Двигаемся к середине
      leftIndex++;
      rightIndex--;
    }
  
    // Завершаем разворот, показываем результат
    steps.push({
      letters: [...letters],
      state: ElementStates.Modified, // Обязательно копируем!
    });
  
    return steps;
  };
