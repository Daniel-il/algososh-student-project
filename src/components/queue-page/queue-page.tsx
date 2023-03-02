import React, { useEffect, useState } from "react";
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
  const [queue, setQueue] = useState<QueueClass>();
  const [inputValue, setInputValue] = useState(""); 
  const [isLoading, setIsLoading] = useState(false); 
  useEffect(()=>{
    setQueue(new QueueClass(7))
  },[])
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };
  const handleEnqueueClick = () => {
    if (queue)  {
      const newQueue = new QueueClass(7);
      newQueue.enqueue(inputValue);
      newQueue.items = [...queue.items]
 
      setQueue(newQueue)
      setInputValue("");
      console.log(newQueue.items)
    }
   
  };

 
  const handleDequeueClick = () => {
    if (queue) {
      const newQueue = new QueueClass(7);
      newQueue.items = [...queue.items]
      queue.dequeue();
    }
   

  };

  const handleClearClick = () => {
    if (queue) 
    queue.clear()
  };


  return (
    <SolutionLayout title="Очередь">
      <form className={styles.form__container}>
        <Input
          value={inputValue}
          onChange={handleInputChange}
          disabled={isLoading}
          extraClass={styles.input}
          maxLength={4}
        />
        <Button onClick={handleEnqueueClick} disabled={isLoading} text='Добавить' />
        <Button onClick={handleDequeueClick} disabled={isLoading} text='Удалить'/>
        <Button onClick={handleClearClick} disabled={isLoading} text='Очистить' />
      </form>
      <AlgorithmContainer>
      {queue && queue.items &&
          queue.items.map((item, index) => (
          <Circle
            key={index}
            letter={item}
            head={queue.head === index && queue.items[index] !== ''  ? 'head' : ''}
            tail={queue.tail === index && queue.size() !== 0  ? 'tail' : ''}
          />
        ))}
      </AlgorithmContainer> 
    </SolutionLayout>
  );
};
