import React, {
  FC,
  FormEvent,
  useState,
} from "react";
import { AlgorithmContainer } from "../algorithm-container/algorithm-container";
import { Balloon } from "../balloon/balloon";
import { Button } from "../ui/button/button";
import { Circle } from "../ui/circle/circle";
import { Input } from "../ui/input/input";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import styles from "./fibonacci-page.module.css";
export const FibonacciPage: FC = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [input, setInput] = useState<number>();
  const [fibonacciNumbers, setFibonacciNumbers] = useState<number[]>([]);

  const handleInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number(event.target.value);
    setInput(value);
  };
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setFibonacciNumbers([]);
    calculateFibonacciSequence();
  };
  const calculateFibonacciSequence = async () => {
    setLoading(true);
    setFibonacciNumbers([]);
    await new Promise((resolve) => setTimeout(resolve, 0));
    let fibonacciNumbers = [1, 1];
    if(input)
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
          maxLength={2}
          extraClass={styles.input}
          value={input}
          onChange={handleInput}
          type="number"
          min={1}
          max={19}
          isLimitText={true}
        />
        <Button
          text="Рассчитать"
          isLoader={loading}
          type='submit'
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
