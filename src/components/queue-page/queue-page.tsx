import React, { useState } from "react";
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
  const queueClass = new QueueClass(setInputValue, setIsLoading);
  const [queue, setQueue] = useState<TQueueItem[]>(queueClass.getQueue());

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value.slice(0, 4)); // Limit the input value to four characters
  };

  const enqueue = () => {
    if (queue.length >= 7) return; // Limit the queue size to 7 elements
    const newItem: TQueueItem = {
      value: inputValue,
      color: ElementStates.Changing,
    };
    queueClass.enqueue(newItem);
    setQueue(queueClass.getQueue());
    setInputValue("");
  };

  const dequeue = () => {
    queueClass.dequeue();
    setQueue(queueClass.getQueue());
  };

  const clearQueue = () => {
    queueClass.clearQueue();
    setQueue(queueClass.getQueue());
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
        <Button onClick={enqueue} disabled={isLoading} text='Добавить' />
        <Button onClick={dequeue} disabled={isLoading} text='Удалить'/>
        <Button onClick={clearQueue} disabled={isLoading} text='Очистить' />
      </form>
      <AlgorithmContainer>
      {queue.length === 0 && <Circle letter="-" />}
        {queue.map((item, index) => (
          <Circle
            key={index}
            letter={item.value}
            state={item.color}
            isActive={index === 0}
          />
        ))}
      </AlgorithmContainer> 
    </SolutionLayout>
  );
};
