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
  const [input, setInput] = useState('');
  const [fibonacciNumbers, setFibonacciNumbers] = useState<number[]>([]);
  const [number, setNumber] = useState<number>()
  const handleInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setInput(value);
    setNumber(Number(value))
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
    if (input && number) {
      for (let i = 2; i < number; i++) {
        fibonacciNumbers.push(fibonacciNumbers[i - 1] + fibonacciNumbers[i - 2]);
      }
    }
    await new Promise((resolve) => setTimeout(resolve, 2000)); // Дополнительная задержка
    setLoading(false);
    setFibonacciNumbers(fibonacciNumbers);
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
          data-testid='input'
        />
        <Button
          text="Рассчитать"
          isLoader={loading}
          type='submit'
          disabled={input && number && number > 19 ? true : false ||  input.length === 0 ? true : false}
          data-testid='button'
        />
      </form>
      <AlgorithmContainer>
        {fibonacciNumbers.map((number, index) => (
          <Balloon
            key={index}
            letter={`${number}`}
            timeoutValue={500}
            index={index}
          />
        ))}
      </AlgorithmContainer>
    </SolutionLayout>
  );
};
