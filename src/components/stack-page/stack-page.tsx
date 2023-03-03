import React, { ChangeEvent, FormEvent, useEffect, useMemo, useRef, useState } from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { Button } from "../ui/button/button";
import { Circle } from "../ui/circle/circle";
import { Input } from "../ui/input/input";
import styles from "./stack-page.module.css";
import { AlgorithmContainer } from "../algorithm-container/algorithm-container";
import { Stack } from "./stack-class";
import { ElementStates } from "../../types/element-states";

export const StackPage: React.FC = () => {
  const [stack, setStack] = useState<Stack>()
  useMemo(()=> {
    setStack(new Stack())
  }, [])
  const [inputValue, setInputValue] = useState<string>("");

  const handleAddClick = () => {
    if (stack && stack.stack.length < 20) {
      if (inputValue === "") {
        return;
      }
      stack.stack.push(inputValue);
      setInputValue("");
    }
  };
  const handleDeleteClick = () => {
    if (stack) {
      const newStack = new Stack();
      newStack.stack = [...stack.stack];
      newStack.pop();
      setStack(newStack);
      setInputValue("");
    }
  };

  const handleClearClick = () => {
    if (stack) {
      const newStack = new Stack();
      setStack(newStack);
      setInputValue("");
    }
  };

  return (
    <SolutionLayout title="Стек">
      <div>
        <div>
          <form
            className={styles.form__container}
            onSubmit={(e: FormEvent) => {
              e.preventDefault();
              handleAddClick();
            }}
          >
            <Input
              type="text"
              value={inputValue}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                setInputValue(e.target.value)
              }
              maxLength={4}
              extraClass={styles.input}
            />
            <Button
              onClick={handleAddClick}
              text="Добавить"
              extraClass={styles.button}
            />
            <Button
              onClick={handleDeleteClick}
              text="Удалить"
              extraClass={styles.button}
            />
            <Button
              onClick={handleClearClick}
              text="Очистить"
              extraClass={styles.button}
            />
          </form>
        </div>
        <AlgorithmContainer extraClass={styles.algorithm__container}>
          {stack && stack.stack.map((element, index) => (
            <Circle
              key={index}
              letter={`${element}`}
              index={index}
              head={index === stack.stack.length - 1 ? 'top' : "" }
              state={index === stack.stack.length - 1 ? ElementStates.Changing : ElementStates.Default}
            />
          ))}
        </AlgorithmContainer>
      </div>
    </SolutionLayout>
  );
};
