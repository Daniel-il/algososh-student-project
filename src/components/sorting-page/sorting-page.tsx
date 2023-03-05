import React, { ChangeEvent, useEffect, useRef, useState } from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import styles from "./sorting-page.module.css";
import { RadioInput } from "../ui/radio-input/radio-input";
import { Button } from "../ui/button/button";
import { Direction } from "../../types/direction";
import {
  bubbleSortAscending,
  bubbleSortDescending,
  selectionSortDescending,
  selectionSortAscending
} from "../../utils/utils";
import { AlgorithmContainer } from "../algorithm-container/algorithm-container";
import { Column } from "../ui/column/column";
import { ElementStates } from "../../types/element-states";

let arrToSort: Array<{ letter: number; state: ElementStates }[]> = [];
let arrToShow: number[] = [];


export const SortingPage: React.FC = () => {
  const pointer = useRef(0);
  const [sortMethod, setSortMethod] = useState<"selection" | "bubble">("selection");
  const [sortDirection, setSortDirection] = useState<"Ascending" | "Descending" | null>(
    null
  );
  const [arr, setArr] = useState<
  { letter: number; state: ElementStates }[]
>([]);
const generateNewRandomArr = () => {
  setArr(randomArr());
  setSortMethod("selection");
  setSortDirection(null);
}
useEffect(()=> {
setArr(randomArr())
}, [])
useEffect(() => {
  if (!!sortDirection) {
    const timer = setTimeout(() => {
      if (pointer.current < arrToSort.length - 1) {
        setArr(arrToSort[++pointer.current]);
      } else {
        arrToSort = [arrToSort[0]];
        pointer.current = 0;
        setSortMethod("selection");
        setSortDirection(null);
      }
    }, 500);
    return () => clearTimeout(timer);
  } else {
    pointer.current = 0;
  }
}, [arr, sortDirection]);

  const handleChangeMethod = (event: ChangeEvent<HTMLInputElement>) => {
    setSortMethod(event.target.value as "selection" | "bubble");
  };

  const startSortAscending = () => {
    if (sortMethod === "selection") {
      selectionSortAscending(arrToSort, arrToShow);
    } else {
      bubbleSortAscending(arrToSort, arrToShow);
    }

    setSortDirection("Ascending");
  };

  const startSortDescending = () => {
    if (sortMethod === "selection") {
      selectionSortDescending(arrToSort, arrToShow);
    } else {
      bubbleSortDescending(arrToSort, arrToShow);
    }
    setSortDirection("Descending");
  };

 ;

  const randomArr = () => {
    arrToShow = [];
    arrToSort = [];
    for (let i = 0, j = 3 + Math.floor(Math.random() * 15); i < j; i++) {
      arrToShow.push(Math.floor(Math.random() * 101));
    }

    arrToSort[0] = arrToShow.map((elem) => {
      return { letter: elem, state: ElementStates.Default };
    });

    return arrToSort[0];
  };

  return (
    <SolutionLayout title="Сортировка массива">
      <form className={styles.form}>
        <RadioInput
          label="Выбор"
          extraClass={styles.form__radio}
          checked={sortMethod === "selection"}
          name="sortMethod"
          value="selection"
          onChange={handleChangeMethod}
          disabled={sortDirection === null ? false : true}
        />
        <RadioInput
          label={"Пузырек"}
          extraClass={styles.form__radio}
          checked={sortMethod === "bubble"}
          name="sortMethod"
          value="bubble"
          onChange={handleChangeMethod}
          disabled={sortDirection === null ? false : true}
        />
        <Button
          sorting={Direction.Ascending}
          text={"По возрастанию"}
          onClick={startSortAscending}
          extraClass={styles.button}
          isLoader={sortDirection === "Ascending"}
          disabled={sortDirection === "Descending" || !arr.length}
          name="Ascending"
        />
        <Button
          sorting={Direction.Descending}
          text={"По убыванию"}
          onClick={startSortDescending}
          extraClass={styles.button}
          isLoader={sortDirection === "Descending"}
          disabled={sortDirection === "Ascending" || !arr.length}
          name="Descending"
        />
        <Button
          text="Новый массив"
          extraClass={styles.button}
          onClick={generateNewRandomArr}
          disabled={sortDirection === null ? false : true}
        />
      </form>
      <AlgorithmContainer extraClass={styles.container}>
        {arr && 
          arr.map((letter, i) => (
            <Column key={i} index={letter.letter} state={letter.state} />
          ))}
      </AlgorithmContainer>
    </SolutionLayout>
  );
};
