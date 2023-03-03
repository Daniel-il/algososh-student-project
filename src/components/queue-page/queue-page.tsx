import React, { useEffect, useRef, useState } from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { TQueueItem } from "../../types/utils";
import { Circle } from "../ui/circle/circle";
import { ElementStates } from "../../types/element-states";
import { Button } from "../ui/button/button";
import { Input } from "../ui/input/input";
import { AlgorithmContainer } from "../algorithm-container/algorithm-container";
import styles from './queue-page.module.css'
import { QueueClass } from "./queue-page-class";

export const QueuePage: React.FC = () => {
  const [inputValue, setInputValue] = useState(""); 
  const [isLoading, setIsLoading] = useState(false); 
  const queueRef = useRef(new QueueClass(7));

  const [animation, setAnimation] = useState<'head' | 'tail' | null>(null);

  useEffect(() => {
    timerRef.current = setTimeout(() => {
      setAnimation(null);
    }, 500);
  }, [animation]);

  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // clear timer Timeout when unmounted to prevent memory leak

  useEffect(() => {
    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, []);
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleEnqueueClick = (event: MouseEvent<HTMLButtonElement>) => {
   queueRef.current.enqueue(inputValue);
    setInputValue("");
    setAnimation('tail');
  };

 
  const handleDequeueClick = (event: MouseEvent<HTMLButtonElement>) => {
    queueRef.current.dequeue();
    setAnimation('head');
  };

  const handleClearClick = (event: MouseEvent<HTMLButtonElement>) => {
    queueRef.current.clear()
    setAnimation('tail');
    setInputValue("");
  };


  return (
    <SolutionLayout title="Очередь">
      <form className={styles.form__container}>
        <Input
          value={inputValue}
          onChange={handleInputChange}
          disabled={isLoading}
          extraClass={styles.input}
        />
        <Button onClick={handleEnqueueClick} disabled={isLoading} text='Добавить' />
        <Button onClick={handleDequeueClick} disabled={isLoading} text='Удалить'/>
        <Button onClick={handleClearClick} disabled={isLoading} text='Очистить' />
      </form>
      <AlgorithmContainer>
      {queueRef.current.items &&
          queueRef.current.items.map((item, index) => (
          <Circle
            key={index}
            letter={item}
            isActive={index === 0}
            animationDelay={index * 0.3}
          />
        ))}
      </AlgorithmContainer> 
    </SolutionLayout>
  );
};
