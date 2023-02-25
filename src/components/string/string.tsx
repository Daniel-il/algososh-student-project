import React, { ChangeEvent, useEffect } from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { Input } from "../ui/input/input";
import { Button } from "../ui/button/button";
import styles from "./string.module.css";
import { useState } from "react";
import { Circle } from "../ui/circle/circle";
import { ElementStates } from "../../types/element-states";
import { DELAY_IN_MS } from "../../constants/delays";
import { Balloon } from "../balloon/balloon";
export const StringComponent: React.FC = () => {
  const [string, setString] = useState('');
  const [balloons, setBalloons] = useState([]);
  const [animationIndex, setAnimationIndex] = useState(-1);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setString(event.target.value);
  };

  const handleReverse = () => {
    setString()
    const reversedString = string.split('').reverse().join('');
    setString(reversedString);

    const newBalloons = Array.from(reversedString);
    setBalloons(newBalloons);

    setAnimationIndex(0);
    setTimeout(() => {
      setAnimationIndex(-1);
    }, newBalloons.length * 1000);
  };

  const getBalloonState = (index: number) => {
    if (animationIndex < 0) {
      return ElementStates.Modified;
    } else if (index === animationIndex || index === animationIndex + 1) {
      return ElementStates.Changing;
    } else {
      return ElementStates.Default;
    }
  };
  return (
    <SolutionLayout title="Строка">
      <div className={styles.container}>
        <Input
          maxLength={11}
          extraClass={styles.input}
          value={string}
          onChange={handleInputChange}
        />
        <Button text="Развернуть" onClick={handleReverse} />
        <p className={styles.container__caption}>Максимум — 11 символов</p>
      </div>
      <div className={styles.balloons}>
      {balloons.map((letter, index) => (
          <Balloon key={index} state={getBalloonState(index)} letter={letter} index = {index} timeoutValue ={1000}>
            
          </Balloon>
        ))}
      </div>
    </SolutionLayout>
  );
};
