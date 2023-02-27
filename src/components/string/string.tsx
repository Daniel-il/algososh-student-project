import React, { ChangeEvent, FormEvent, useEffect } from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { Input } from "../ui/input/input";
import { Button } from "../ui/button/button";
import styles from "./string.module.css";
import { useState } from "react";
import { Circle } from "../ui/circle/circle";
import { ElementStates } from "../../types/element-states";
import { DELAY_IN_MS } from "../../constants/delays";
import { Balloon } from "../balloon/balloon";
import { LettersStep } from "../../types/utils";
import { getSteps } from "../../utils/utils";
export const StringComponent: React.FC = () => {
  const [steps, setSteps] = useState<LettersStep[]>([]);
  const [currentStep, setCurrentStep] = useState<LettersStep | null>(null);
  const [stepsIndex, setStepsIndex] = useState<number>(0);

  useEffect(() => {
    if (steps.length === 0 || stepsIndex >= steps.length) {
      return;
    }

    setCurrentStep(steps[stepsIndex]);

    setTimeout(() => {
      setStepsIndex(stepsIndex + 1);
    }, 2000);
  }, [steps, stepsIndex]);

  const onLettersSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    const formElements = form.elements as typeof form.elements & {
      lettersInput: HTMLInputElement;
    };
    const letters = formElements.lettersInput.value.toUpperCase();

    setCurrentStep(null);
    setStepsIndex(0);
    setSteps(getSteps(letters));
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
        <Button text="Развернуть" type="submit" />
      </form>

      <div className={styles.balloons}>
        {currentStep &&
          currentStep.letters.map((letter, index) => {
            let stateClass = "";
            const stepIndex = currentStep.index;
            if (stepIndex !== undefined) {
              if (
                index === stepIndex ||
                index === currentStep.letters.length - stepIndex - 1
              ) {
                stateClass = currentStep.state ?? "";
                console.log(stateClass);
              }
            }

            return (
              <Circle key={index} state={!currentStep ? 'default' : stateClass } letter={letter}></Circle>
            );
          })}
      </div>
    </SolutionLayout>
  );
};
