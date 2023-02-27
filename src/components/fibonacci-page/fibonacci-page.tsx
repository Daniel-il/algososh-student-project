import React, { FC, FormEvent, FormEventHandler, useState } from "react";
import { AlgorithmContainer } from "../algorithm-container/algorithm-container";
import { Balloon } from "../balloon/balloon";
import { Button } from "../ui/button/button";
import { Circle } from "../ui/circle/circle";
import { Input } from "../ui/input/input";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import styles from "./fibonacci-page.module.css";
export const FibonacciPage: FC = () => {
  const MAX_FIBONACCI_INDEX = 19;
  const [loading, setLoading] = useState<boolean>();
  const [input, setInput] = useState(0);
  const [fibonacciNumbers, setFibonacciNumbers] = useState<number[]>([]);

  const handleInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number(event.target.value);
    setInput(value);
  };
  const handleSubmit = (e: FormEvent) => {
    setFibonacciNumbers([]);
    e.preventDefault();
    calculateFibonacciSequence();
  };
  const calculateFibonacciSequence = () => {
    console.log(loading);
    let fibonacciNumbers = [1, 1];
    for (let i = 2; i < input; i++) {
      fibonacciNumbers.push(fibonacciNumbers[i - 1] + fibonacciNumbers[i - 2]);
    }
    setFibonacciNumbers(fibonacciNumbers);
    setLoading(false);
  };
  return (
    <SolutionLayout title="Последовательность Фибоначчи">
      <form onSubmit={handleSubmit} className={styles.container}>
        <Input
          maxLength={11}
          extraClass={styles.input}
          value={input}
          onChange={handleInput}
          min={1}
          max={19}
          isLimitText={true}
        />
        <Button
          text="Рассчитать"
          onClick={calculateFibonacciSequence}
          isLoader={loading}
        />
      </form>
      <AlgorithmContainer>
        {fibonacciNumbers.map((number, index) => (
          <Balloon
            key={index}
            letter={`${number}`}
            timeoutValue={500}
            index={index}
          ></Balloon>
        ))}
        {() => {
          if (fibonacciNumbers.length === 0) {
            return null;
          }
        }}
      </AlgorithmContainer>
    </SolutionLayout>
  );
};
