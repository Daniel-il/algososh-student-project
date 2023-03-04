import React, { ChangeEvent, useEffect, useMemo, useRef, useState } from "react";
import { initialString } from "../../constants/utils";
import {
  pushByIndex,
  findElementHead,
  findElementState,
  findElementTail,
  remove,
  add,
  removeByIndex,
} from "../../utils/utils";
import { AlgorithmContainer } from "../algorithm-container/algorithm-container";
import { Button } from "../ui/button/button";
import { Circle } from "../ui/circle/circle";
import { ArrowIcon } from "../ui/icons/arrow-icon";
import { Input } from "../ui/input/input";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { LinkedList} from "./list-page-class";
import styles from "./list-page.module.css";
import { TStepsOfList } from "../../types/utils";




export const ListPage: React.FC = () => {
  const list = useMemo(() => new LinkedList(initialString), []);
  const delay = useRef<ReturnType<typeof setInterval> | null>(
    null
  );
  const [inputValue, setInputValue] = useState('')
  const [inputIndexValue, setInputIndexValue] = useState('')

  useEffect(() => {
    return () => {
      if (delay.current) {
        clearInterval(delay.current);
      }
    };
  }, []);

  const [stepsToRender, setStepsToRender] = useState<TStepsOfList[]>([
    { step: list.toArray() },
  ]);

  const [stepToRender, setStepToRender] = useState(0);

  const [operationToRender, setOperationToRender] = useState<
    | "addFirst"
    | "addLast"
    | "deleteFirst"
    | "deleteLast"
    | "pushByIndex"
    | "removeByIndex"
    | null
  >(null);

  useEffect(() => {
    if (operationToRender) {
      let temporalArray: TStepsOfList[] = [];

      switch (operationToRender) {
        case "addFirst":
          temporalArray = add(inputValue, true, list);
          break;
        case "addLast":
          temporalArray = add(inputValue, false, list);
          break;
        case "deleteFirst":
          temporalArray = remove(true, list);
          break;
        case "deleteLast":
          temporalArray = remove(false, list);
          break;
        case "pushByIndex":
          temporalArray = pushByIndex(
            Number(inputIndexValue),
            inputValue,
            list
          );
          break;
        case "removeByIndex":
          temporalArray = removeByIndex(Number(inputIndexValue), list);
          break;
        default:
          break;
      }
      if (temporalArray.length > 1) {
        setStepsToRender(temporalArray);
        setStepToRender(0);
        delay.current = setInterval(() => {
          setStepToRender((stepToRender) => {
            if (stepToRender === stepsToRender.length - 1) {
              if (delay.current !== null) {
                clearInterval(delay.current);
              }
              setStepsToRender([{ step: list.toArray() }]);

              setOperationToRender(null);

              return 0;
            }
            return stepToRender + 1;
          });
        }, 1000);
      }
    }
  }, [operationToRender]);

  return (
    <SolutionLayout title="Связный список">
      <div className={styles.list__controls}>
        <Input
          value={inputValue}
          name={"value"}
          isLimitText={true}
          type={"text"}
          maxLength={4}
          extraClass={styles.list__input}
          onChange={(e: ChangeEvent<HTMLInputElement> ) => {setInputValue(e.target.value)}}
        />
        <Button
          text={"Добавить в head"}
          extraClass={styles.list__button_small}
          disabled={
            !inputValue.length ||
            (operationToRender !== "addFirst" && !!operationToRender)
          }
          onClick={() => setOperationToRender("addFirst")}
          isLoader={operationToRender === "addFirst"}
        />
        <Button
          text={"Добавить в tail"}
          extraClass={styles.list__button_small}
          disabled={
            !inputValue.length ||
            (operationToRender !== "addLast" && !!operationToRender)
          }
          onClick={() => setOperationToRender("addLast")}
          isLoader={operationToRender === "addLast"}
        />
        <Button
          text={"Удалить из head"}
          extraClass={styles.list__button_small}
          disabled={operationToRender !== "deleteFirst" && !!operationToRender}
          onClick={() => setOperationToRender("deleteFirst")}
          isLoader={operationToRender === "deleteFirst"}
        />
        <Button
          text={"Удалить из tail"}
          extraClass={styles.button}
          disabled={operationToRender !== "deleteLast" && !!operationToRender}
          onClick={() => setOperationToRender("deleteLast")}
          isLoader={operationToRender === "deleteLast"}
        />
        <Input
          value={inputIndexValue}
          name={"index"}
          placeholder={"Введите индекс"}
          isLimitText={false}
          type={"number"}
          extraClass={styles.list__input}
          onChange={(e: ChangeEvent<HTMLInputElement>) => {
            setInputIndexValue(e.target.value)
          }}
        />
        <Button
          text={"Добавить по индексу"}
          extraClass={styles.list__button_large}
          disabled={
            Number(inputIndexValue) > list.toArray().length - 1 ||
            Number(inputIndexValue) < 0 ||
            !inputIndexValue.length ||
            !inputValue.length ||
            (operationToRender !== "pushByIndex" && !!operationToRender)
          }
          onClick={() => setOperationToRender("pushByIndex")}
          isLoader={operationToRender === "pushByIndex"}
        />
        <Button
          text={"Удалить по индексу"}
          extraClass={styles.list__button_large}
          disabled={
            Number(inputIndexValue) > list.toArray().length - 1 ||
            Number(inputIndexValue) < 0 ||
            !inputIndexValue.length ||
            (operationToRender !== "removeByIndex" && !!operationToRender)
          }
          onClick={() => setOperationToRender("removeByIndex")}
          isLoader={operationToRender === "removeByIndex"}
        />
      </div>
      <AlgorithmContainer extraClass={styles.algortitm__container}>
        {stepsToRender[stepToRender].step.map((elem, index, array) => {
          return (
            <div key={index} className={styles.element__container}>
              <Circle
                letter={String(elem.value)}
                head={findElementHead(index, stepsToRender[stepToRender])}
                tail={findElementTail(index, stepsToRender[stepToRender])}
                index={index}
                state={findElementState(
                  index,
                  stepsToRender[stepToRender]
                )}
              />
              {index < array.length - 1 ? <ArrowIcon /> : null}
            </div>
          );
        })}
      </AlgorithmContainer>
    </SolutionLayout>
  );
};
