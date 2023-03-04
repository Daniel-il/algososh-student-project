import React, { ChangeEvent, FormEvent, useEffect } from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { Input } from "../ui/input/input";
import { Button } from "../ui/button/button";
import styles from "./string.module.css";
import { useState } from "react";
import { Circle } from "../ui/circle/circle";

import { LettersStep } from "../../types/utils";
import { getSteps } from "../../utils/utils";
import { ElementStates } from "../../types/element-states";
import { AlgorithmContainer } from "../algorithm-container/algorithm-container";

export const StringComponent: React.FC = () => {
  const [steps, setSteps] = useState<LettersStep[]>([]);
  const [currentStep, setCurrentStep] = useState<LettersStep | null>({
    letters: [],
    state: ElementStates.Default,
  });
  const [isLoading, setIsLoading] = useState(false);
  const [stepsIndex, setStepsIndex] = useState<number>(0);

  useEffect(() => {
    if (steps.length === 0 || stepsIndex >= steps.length) {
      return;
    }
    setCurrentStep(steps[stepsIndex]);

    setTimeout(() => {
      setStepsIndex((stepsIndex) => stepsIndex + 1);
    }, 1000);
    
  }, [steps, stepsIndex]);


 
  const onLettersSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
  
    const form = event.currentTarget;
    const formElements = form.elements as typeof form.elements & {
      lettersInput: HTMLInputElement;
    };
    const letters = formElements.lettersInput.value.toUpperCase();
  
    setCurrentStep(null);
    setStepsIndex(0);
    console.log(isLoading)
    setIsLoading(true);

    const steps = await getSteps(letters);
    setSteps(steps);
    setIsLoading(false)
  
  };

  return (
    <SolutionLayout title="Строка">
      <form onSubmit={onLettersSubmit} className={styles.container}>
        <Input
          isLimitText={true}
          maxLength={11}
          extraClass={styles.input}
          name="lettersInput"
          type="text"
        />
        <Button text="Развернуть" type="submit" isLoader={isLoading}/>
      </form>

      <AlgorithmContainer extraClass={styles.balloons}>
        {currentStep &&
          currentStep.letters.map((letter, index) => {
            let stateClass = "";

            if (currentStep.state[index] === ElementStates.Modified) {
              stateClass = ElementStates.Modified;
            } else if (currentStep.index !== undefined) {
              if (
                index === currentStep.index ||
                index === currentStep.letters.length - currentStep.index - 1
              ) {
                stateClass = ElementStates.Changing;
              } else {
                stateClass = ElementStates.Default;
              }
            } else {
              stateClass = ElementStates.Default;
            }
            return <Circle key={index} state={stateClass} letter={letter} />;
          })}
      </AlgorithmContainer>
    </SolutionLayout>
  );
};
