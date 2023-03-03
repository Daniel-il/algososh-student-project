import React, { useMemo, useRef, useState } from "react";
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
  const queueRef = useRef(new QueueClass(7))
  const [queue, setQueue] = useState<QueueClass>()
  const [inputValue, setInputValue] = useState(""); 
  const [isLoading, setIsLoading] = useState(false); 
  useMemo(() => {setQueue(new QueueClass(7))}, [])
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };
  const handleEnqueueClick = () => {
      queueRef.current.enqueue(inputValue);
      queueRef.current.items = [...queueRef.current.items]
      setInputValue("");
      console.log(queueRef.current.items)

   
  };

 
  const handleDequeueClick = () => {
    
      queueRef.current.items = [...queueRef.current.items]
      queueRef.current.dequeue();

  
  }
  const handleClearClick = () => {
    queueRef.current.clear()
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
      {queueRef.current.items && queueRef.current.items &&
          queueRef.current.items.map((item, index) => (
          <Circle
            key={index}
            letter={item}
            head={queueRef.current.head === index && queueRef.current.items[index] !== ''  ? 'head' : ''}
            tail={queueRef.current.tail === index && queueRef.current.size() !== 0  ? 'tail' : ''}
          />
        ))}
      </AlgorithmContainer> 
    </SolutionLayout>
  );
}
