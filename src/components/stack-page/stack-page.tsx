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
  const [stack, setStack] = useState<Stack<string>>()
  useMemo(()=> {
    setStack(new Stack())
  }, [])
  const [inputValue, setInputValue] = useState<string>("");
  const [delay, setDelay] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [action, setAction] = useState<'push' | 'remove' | 'clear' | null>(null)
  useEffect(() => {
    timer.current = setTimeout(() => {
      setDelay(false);
      setAction(null)
    }, 500);
  }, [delay]);

  const handlePushClick = () => {
    if (stack && stack.stack.length < 20) {
      setDelay(true)
      if (inputValue === "") {
        return;
      }
      stack.stack.push(inputValue);
      setInputValue("");
      setAction('push')
    }
  };
  const handleRemoveClick = () => {
    if (stack) {
      setDelay(true)
      const newStack = new Stack<string>()
      newStack.stack = [...stack.stack];
      newStack.pop();
      setStack(newStack);
      setInputValue("");
      setAction('remove')
    }
  };

  const handleClearClick = () => {
    if (stack) {
      setDelay(true)
      const newStack = new Stack<string>();
      setStack(newStack);
      setInputValue("");
      setAction('clear')
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
              handlePushClick();
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
              isLimitText={true}
              data-testid='input'
            />
            <Button
              onClick={handlePushClick}
              text="Добавить"
              extraClass={styles.button}
              disabled={inputValue.length === 0 ? true : false}
              isLoader={action === 'push'}
              data-testid='button'
            />
            <Button
              onClick={handleRemoveClick}
              text="Удалить"
              extraClass={styles.button}
              disabled={stack && !stack.stack.length}
              isLoader={action === 'remove'}
              data-testid='button'
            />
            <Button
              onClick={handleClearClick}
              text="Очистить"
              extraClass={styles.button}
              disabled={ stack && !stack.stack.length}
              isLoader={action === 'clear'}
              data-testid='button'
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
              state={delay && index === stack.stack.length - 1 ? ElementStates.Changing : ElementStates.Default}
              testId='circle'
            />
          ))}
        </AlgorithmContainer>
      </div>
    </SolutionLayout>
  );
};
