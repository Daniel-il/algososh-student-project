import React, { useState } from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import styles from "./sorting-page.module.css";
import { RadioInput } from "../ui/radio-input/radio-input";
import { Button } from "../ui/button/button";
import { Direction } from "../../types/direction";
import { BubbleSort, randomArr, SelectionSort } from "../../utils/utils";
import { AlgorithmContainer } from "../algorithm-container/algorithm-container";
import { Column } from "../ui/column/column";

export const SortingPage: React.FC = () => {
  const [arr, setArr] = useState(randomArr(3, 17));
  const [isSorting, setIsSorting] = useState(false);
  const [sortMethod, setSortMethod] = useState<"Selection" | "Bubble">(
    "Selection"
  );
  const [isLoading, setIsLoading] = useState(false);
  const [sortDirection, setSortDirection] = useState<
    "Ascending" | "Descending"
  >("Ascending");

  const handleSort = () => {
    if (isSorting) return;
    setIsSorting(true);
    if (sortMethod === "Selection") {
      SelectionSort(arr, setIsSorting, setArr, sortDirection);
    } else if (sortMethod === "Bubble") {
      BubbleSort(arr, setIsSorting, setArr, sortDirection);
    }
  };

  const handleNewArray = () => {
    setIsLoading(true);
    console.log(isLoading)
    setArr(randomArr(3, 17));
    if(arr) 
    setIsLoading(false)
    
    console.log(isLoading)
  ;
  };

  const handleSortMethodChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSortMethod(e.target.value as "Selection" | "Bubble");
  };

  const handleAscendingSort = () => {
    if (isSorting || sortDirection === "Ascending") return;
    setSortDirection("Ascending");
  };

  const handleDescendingSort = () => {
    if (isSorting || sortDirection === "Descending") return;
    setSortDirection("Descending");
  };

  return (
    <SolutionLayout title="Сортировка массива">
      <form className={styles.form}>
        <RadioInput
          name="radio"
          label={"Выбор"}
          extraClass={styles.form__radio}
          disabled={isSorting}
          value="Selection"
          checked={sortMethod === "Selection"}
          onChange={handleSortMethodChange}
        />
        <RadioInput
          name="radio"
          label={"Пузырек"}
          extraClass={styles.form__radio}
          value="Bubble"
          checked={sortMethod === "Bubble"}
          onChange={handleSortMethodChange}
          disabled={isSorting}
        />
        <Button
          sorting={Direction.Ascending}
          text="По возрастанию"
          extraClass={styles.button}
          name="sortDirection"
          value="Ascending"
          checked={sortDirection === "Ascending"}
          onClick={() => {
            handleAscendingSort();
            handleSort();
          }}
        />
        <Button
          sorting={Direction.Descending}
          text="По убыванию"
          extraClass={styles.button}
          onClick={() => {
            handleDescendingSort();
            handleSort();
          }}
          disabled={isSorting}
        />
        <Button
          text="Новый массив"
          extraClass={styles.button}
          onClick={() => {
            handleNewArray();
          }}
          disabled={isSorting}
          isLoader={isLoading}
        />
      </form>
      <AlgorithmContainer extraClass={styles.container}>
        {arr.map((num, i) => (
          <Column
            key={i}
            index={num}
          />
        ))}
      </AlgorithmContainer>
    </SolutionLayout>
  );
};
