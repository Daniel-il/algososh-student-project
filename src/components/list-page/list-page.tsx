import React, { useEffect, useMemo, useRef, useState } from "react";
import { useForm } from "../../hooks/useForm";
import {
  addWithIndex,
  calculateElementHead,
  calculateElementState,
  calculateElementTail,
  remove,
  add,
  deleteWithIndex,
} from "../../utils/utils";
import { AlgorithmContainer } from "../algorithm-container/algorithm-container";
import { Button } from "../ui/button/button";
import { Circle } from "../ui/circle/circle";
import { ArrowIcon } from "../ui/icons/arrow-icon";
import { Input } from "../ui/input/input";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { LinkedList, LinkedListNode } from "./list-page-class";
import styles from "./list-page.module.css";



export type TStages = {
  stage: LinkedListNode<string>[];
  index?: number;
  value?: string;
  operation?: string;
};

export const ListPage: React.FC = () => {
  const list = useMemo(() => new LinkedList(listForFirstRender), []);
  const intervalAnimationRef = useRef<ReturnType<typeof setInterval> | null>(
    null
  );
  const listForFirstRender = ["1", "2", "3", "19", "44", "81", "77"];
  const { values, handleChange, setValues } = useForm({ value: "", index: "" });

  useEffect(() => {
    return () => {
      if (intervalAnimationRef.current) {
        clearInterval(intervalAnimationRef.current);
      }
    };
  }, []);

  const [stagesToRender, setStagesToRender] = useState<TStages[]>([
    { stage: list.toArray() },
  ]);

  const [renderingStage, setRenderingStage] = useState(0);

  const [operationToRender, setOperationToRender] = useState<
    | "addFirst"
    | "addLast"
    | "deleteFirst"
    | "deleteLast"
    | "addWithIndex"
    | "deleteWithIndex"
    | null
  >(null);

  useEffect(() => {
    if (operationToRender) {
      let temporalArray: TStages[] = [];

      switch (operationToRender) {
        case "addFirst":
          temporalArray = add(values.value, true, list);
          break;
        case "addLast":
          temporalArray = add(values.value, false, list);
          break;
        case "deleteFirst":
          temporalArray = remove(true, list);
          break;
        case "deleteLast":
          temporalArray = remove(false, list);
          break;
        case "addWithIndex":
          temporalArray = addWithIndex(
            Number(values.index),
            values.value,
            list
          );
          break;
        case "deleteWithIndex":
          temporalArray = deleteWithIndex(Number(values.index), list);
          break;
        default:
          break;
      }
      if (temporalArray.length > 1) {
        setStagesToRender(temporalArray);
        setRenderingStage(0);
        intervalAnimationRef.current = setInterval(() => {
          setRenderingStage((renderingStage) => {
            if (renderingStage === stagesToRender.length - 1) {
              if (!!intervalAnimationRef.current) {
                clearInterval(intervalAnimationRef.current);
              }
              setValues({ value: "", index: "" });
              setStagesToRender([{ stage: list.toArray() }]);

              setOperationToRender(null);

              return 0;
            }
            return renderingStage + 1;
          });
        }, 1000);
      }
    }
  }, [
    list,
    operationToRender,
    setValues,
    stagesToRender.length,
    values.index,
    values.value,
  ]);

  return (
    <SolutionLayout title="Связный список">
      <div className={styles.list__controls}>
        <Input
          value={values.value}
          name={"value"}
          isLimitText={true}
          type={"text"}
          maxLength={4}
          extraClass={styles.list__input}
          onChange={handleChange}
        />
        <Button
          text={"Добавить в head"}
          extraClass={styles.button}
          disabled={
            !values.value.length ||
            (operationToRender !== "addFirst" && !!operationToRender)
          }
          onClick={() => setOperationToRender("addFirst")}
          isLoader={operationToRender === "addFirst"}
        />
        <Button
          text={"Добавить в tail"}
          extraClass={styles.button}
          disabled={
            !values.value.length ||
            (operationToRender !== "addLast" && !!operationToRender)
          }
          onClick={() => setOperationToRender("addLast")}
          isLoader={operationToRender === "addLast"}
        />
        <Button
          text={"Удалить из head"}
          extraClass={styles.button}
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
          value={values.index}
          name={"index"}
          placeholder={"Введите индекс"}
          isLimitText={false}
          type={"number"}
          extraClass={styles.list__input}
          onChange={handleChange}
        />
        <Button
          text={"Добавить по индексу"}
          extraClass={styles.button}
          disabled={
            Number(values.index) > list.toArray().length - 1 ||
            Number(values.index) < 0 ||
            !values.index.length ||
            !values.value.length ||
            (operationToRender !== "addWithIndex" && !!operationToRender)
          }
          onClick={() => setOperationToRender("addWithIndex")}
          isLoader={operationToRender === "addWithIndex"}
        />
        <Button
          text={"Удалить по индексу"}
          extraClass={styles.button}
          disabled={
            Number(values.index) > list.toArray().length - 1 ||
            Number(values.index) < 0 ||
            !values.index.length ||
            (operationToRender !== "deleteWithIndex" && !!operationToRender)
          }
          onClick={() => setOperationToRender("deleteWithIndex")}
          isLoader={operationToRender === "deleteWithIndex"}
        />
      </div>
      <AlgorithmContainer>
        {stagesToRender[renderingStage].stage.map((elem, key, array) => {
          return (
            <div key={key}>
              <Circle
                letter={String(elem)}
                head={calculateElementHead(key, stagesToRender[renderingStage])}
                tail={calculateElementTail(key, stagesToRender[renderingStage])}
                index={key}
                state={calculateElementState(
                  key,
                  stagesToRender[renderingStage]
                )}
              />
              {key < array.length - 1 ? <ArrowIcon /> : null}
            </div>
          );
        })}
      </AlgorithmContainer>
    </SolutionLayout>
  );
};
