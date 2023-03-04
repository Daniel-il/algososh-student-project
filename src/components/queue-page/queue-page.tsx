import React, { FormEvent, FormEventHandler, useEffect, useRef, useState } from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { TQueueItem } from "../../types/utils";
import { Circle } from "../ui/circle/circle";
import { ElementStates } from "../../types/element-states";
import { Button } from "../ui/button/button";
import { Input } from "../ui/input/input";
import { AlgorithmContainer } from "../algorithm-container/algorithm-container";
import styles from "./queue-page.module.css";
import { QueueClass } from "./queue-page-class";

export const QueuePage: React.FC = () => {
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const queueRef = useRef(new QueueClass<string>(7));

  const [animation, setAnimation] = useState<"head" | "tail" | null>(null);

  useEffect(() => {
    timerRef.current = setTimeout(() => {
      setAnimation(null);
    }, 500);
  }, [animation]);

  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleEnqueueClick = () => {
    queueRef.current.enqueue(inputValue);
    setInputValue("");
    setAnimation("tail");
  };

  const handleDequeueClick = () => {
    queueRef.current.dequeue();
    setAnimation("head");
  };

  const handleClearClick = () => {
    queueRef.current.clear();
    setAnimation("tail");
    setInputValue("");
  };

  return (
    <SolutionLayout title="Очередь">
      <form className={styles.form__container} onSubmit={(e: FormEvent) => {
        e.preventDefault()
        handleEnqueueClick()
      }}>
        <Input
          value={inputValue}
          onChange={handleInputChange}
          maxLength={4}
          type='text'
          isLimitText={true}
          extraClass={styles.input}
        />
        <Button
          onClick={handleEnqueueClick}
          disabled={!inputValue}
          text="Добавить"
          extraClass={styles.button}
        />
        <Button
          onClick={handleDequeueClick}  
          disabled={queueRef.current.tail === null}
          text="Удалить"
          extraClass={styles.button}
        />
        <Button
          onClick={handleClearClick}
          disabled={queueRef.current.tail === null}
          text="Очистить"
          extraClass={styles.button}
        />
      </form>
      <AlgorithmContainer extraClass={styles.container}>
        {queueRef.current.items &&
          queueRef.current.items.map((item, index) => (
            <Circle
              key={index}
              letter={item}
              state={
                (animation === "head" && index === queueRef.current.head - 1) ||
                (animation === "tail" && index === queueRef.current.tail - 1)
                  ? ElementStates.Changing
                  : ElementStates.Default
              }
              head={queueRef.current.head === index ? 'head' : ''}
              tail={queueRef.current.tail - 1  === index ? 'tail' : ''}
              index={index}
            />
          ))}
      </AlgorithmContainer>
    </SolutionLayout>
  );
};
