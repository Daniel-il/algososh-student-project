import { FC, useEffect, useState } from "react";
import { ElementStates } from "../../types/element-states";
import { Circle } from "../ui/circle/circle";
import styles from './balloon.module.css';
type TBalloonProps = {
    letter: string;
    timeoutValue: number;
    index: number;
    state?: ElementStates | undefined;
}
export const Balloon: FC<TBalloonProps> = ({ letter, timeoutValue, index, state}) => {
    const [showBalloon, setShowBalloon] = useState(false);
  
    useEffect(() => {
      const timeout = setTimeout(() => setShowBalloon(true), index * timeoutValue);
      return () => clearTimeout(timeout);
    }, []);
  
    return (
      <Circle extraClass={`${showBalloon ? styles.show : styles.balloon}`} letter = {letter} state = {state}>
      </Circle>
    );
  };