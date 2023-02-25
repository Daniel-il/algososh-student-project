import React from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import styles from "./sorting-page.module.css";
import { RadioInput } from "../ui/radio-input/radio-input";

export const SortingPage: React.FC = () => {
  return (
    <SolutionLayout title="Сортировка массива">
      <form className={styles.form}>
        <RadioInput label={"Выбор"} extraClass={styles.form__radio} />
        <RadioInput label={"Пузырек"} extraClass={styles.form__radio} />
      </form>
    </SolutionLayout>
  );
};
