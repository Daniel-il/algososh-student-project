import React, { ChangeEvent, useState } from "react";
import { initialString } from "../../constants/utils";
import { AlgorithmContainer } from "../algorithm-container/algorithm-container";
import { Button } from "../ui/button/button";
import { Circle } from "../ui/circle/circle";
import { ArrowIcon } from "../ui/icons/arrow-icon";
import { Input } from "../ui/input/input";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { LinkedList } from "./list-page-class";
import styles from "./list-page.module.css";
import { ElementStates } from "../../types/element-states";
import { delay } from "../../utils/utils";
import { TLinkedArr } from "../../types/utils";

export const ListPage: React.FC = () => {
  const initialLinkedArr: TLinkedArr[] = initialString.map((value) => ({
    element: value,
    state: ElementStates.Default,
  }));

  const [inputValue, setInputValue] = useState("");
  const [inputIndexValue, setInputIndexValue] = useState(0);
  const [linkedArr, setLinkedArr] = useState<TLinkedArr[]>(initialLinkedArr);
  const [isLoading, setIsLoading] = useState({
    addHead: false,
    addTail: false,
    deleteHead: false,
    deleteTail: false,
    addIndex: false,
    deleteIndex: false,
  });

  const linkedList = new LinkedList<string>(initialString);

  const addHead = async () => {
    setIsLoading({ ...isLoading, addHead: true });
    linkedList.prepend(inputValue);
    linkedArr[0] = {
      ...linkedArr[0],
      push: true,
      elementSmall: {
        element: inputValue,
      },
    };
    setLinkedArr([...linkedArr]);
    await delay(500);
    linkedArr[0] = {
      ...linkedArr[0],
      push: false,
      elementSmall: {
        element: null,
      },
    };
    linkedArr.unshift({
      element: inputValue,
      state: ElementStates.Modified,
    });

    setLinkedArr([...linkedArr]);
    await delay(500);
    linkedArr[0].state = ElementStates.Default;
    setIsLoading({ ...isLoading, addHead: false });
    setInputValue("");
  };

  const addTail = async () => {
    setIsLoading({ ...isLoading, addTail: true });
    linkedList.append(inputValue);
    const { length } = linkedArr;
    linkedArr[length - 1] = {
      ...linkedArr[length - 1],
      push: true,
      elementSmall: {
        element: inputValue,
      },
    };
    setLinkedArr([...linkedArr]);
    await delay(500);
    linkedArr[length - 1] = {
      ...linkedArr[length - 1],
      push: false,
      elementSmall: {
        element: null,
      },
    };
    linkedArr.push({
      push: false,
      element: inputValue,
      state: ElementStates.Modified,
    });
    setLinkedArr([...linkedArr]);
    await delay(500);
    linkedArr.map((element) => (element.state = ElementStates.Default));
    setIsLoading({ ...isLoading, addTail: false });
    setInputValue("");
  };

  const deleteHead = async () => {
    setIsLoading({ ...isLoading, deleteHead: true });
    linkedArr[0] = {
      ...linkedArr[0],
      element: "",
      state: ElementStates.Modified,
      remove: true,
      elementSmall: {
        element: linkedArr[0].element,
      },
    };
    setLinkedArr([...linkedArr]);
    await delay(1000);
    linkedArr.shift();

    setLinkedArr([...linkedArr]);
    setIsLoading({ ...isLoading, deleteHead: false });
  };

  const deleteTail = async () => {
    setIsLoading({ ...isLoading, deleteTail: true });
    const { length } = linkedArr;
    linkedArr[length - 1] = {
      ...linkedArr[length - 1],
      element: "",
      remove: true,
      elementSmall: {
        element: linkedArr[linkedArr.length - 1].element,
      },
    };
    setLinkedArr([...linkedArr]);
    await delay(1000);
    linkedArr.pop();
    setLinkedArr([...linkedArr]);
    setIsLoading({ ...isLoading, deleteTail: false });
  };
  const deleteIndex = async (inputIndex: number) => {
    setIsLoading({ ...isLoading, deleteIndex: true });
  
    // Проверяем, что индекс равен 0, и если да, то удаляем первый элемент
    if (inputIndex === 0) {
      deleteHead()
      setIsLoading({ ...isLoading, deleteIndex: true })
    } else {
      linkedList.deleteIndex(inputIndex);
      for (let i = 0; i <= inputIndex; i++) {
        linkedArr[i] = {
          ...linkedArr[i],
          state: ElementStates.Changing,
        };
        await delay(1000);
        setLinkedArr([...linkedArr]);
      }
      linkedArr[inputIndex] = {
        ...linkedArr[inputIndex],
        element: "",
        remove: true,
        state: ElementStates.Changing,
        elementSmall: {
          element: linkedArr[inputIndex].element,
        },
      };
      await delay(1000);
      setLinkedArr([...linkedArr]);
      linkedArr.splice(inputIndex, 1);
      linkedArr[inputIndex - 1] = {
        ...linkedArr[inputIndex - 1],
        element: linkedArr[inputIndex - 1].element,
        state: ElementStates.Default,
        elementSmall: {
          element: null,
        },
      };
      await delay(1000);
      setLinkedArr([...linkedArr]);
    }
  
    linkedArr.forEach((elem) => {
      elem.state = ElementStates.Default;
    });
    await delay(1000);
    setLinkedArr([...linkedArr]);
  
    setInputValue("");
    setInputIndexValue(0);
    setIsLoading({ ...isLoading, deleteIndex: false });
  };

  const addIndex = async () => {
    setIsLoading({ ...isLoading, addIndex: true });
    linkedList.addIndex(inputIndexValue, inputValue);
    for (let i = 0; i <= inputIndexValue; i++) {
      linkedArr[i] = {
        ...linkedArr[i],
        push: true,
        elementSmall: {
          element: inputValue,
        },
      };
      if (i > 0) {
        linkedArr[i - 1] = {
          ...linkedArr[i - 1],
          push: false,
          state: ElementStates.Changing,
          elementSmall: {
            element: null,
          },
        };
      }
      setLinkedArr([...linkedArr]);
      await delay(1000);
    }
    linkedArr[inputIndexValue] = {
      ...linkedArr[inputIndexValue],
      push: false,
      elementSmall: {
        element: null,
      },
    };
    linkedArr.splice(inputIndexValue, 0, {
      element: inputValue,
      state: ElementStates.Modified,
    });
    linkedArr.forEach((element) => (element.state = ElementStates.Default));
    setLinkedArr([...linkedArr]);
    await delay(1000);
    setIsLoading({ ...isLoading, addIndex: false });
    setInputValue("");
    setInputIndexValue(0);
  };
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
          onChange={(e: ChangeEvent<HTMLInputElement>) => {
            setInputValue(e.target.value);
          }}
        />
        <Button
          text={"Добавить в head"}
          extraClass={styles.list__button_small}
          disabled={inputValue.length === 0 ? true : false}
          onClick={addHead}
          isLoader={isLoading.addHead}
        />
        <Button
          text={"Добавить в tail"}
          extraClass={styles.list__button_small}
          disabled={inputValue.length === 0 ? true : false}
          onClick={addTail}
          isLoader={isLoading.addTail}
        />
        <Button
          text={"Удалить из head"}
          extraClass={styles.list__button_small}
          disabled={isLoading.addTail || isLoading.addHead}
          onClick={deleteHead}
          isLoader={isLoading.deleteHead}
        />
        <Button
          text={"Удалить из tail"}
          extraClass={styles.button}
          disabled={isLoading.deleteTail}
          onClick={deleteTail}
          isLoader={isLoading.deleteTail}
        />
        <Input
          value={inputIndexValue}
          name={"index"}
          placeholder={"Введите индекс"}
          isLimitText={false}
          type={"number"}
          extraClass={styles.list__input}
          onChange={(e: ChangeEvent<HTMLInputElement>) => {
            setInputIndexValue(Number(e.target.value));
          }}
        />
        <Button
          text={"Добавить по индексу"}
          extraClass={styles.list__button_large}
          disabled={
            !inputValue ||
            inputIndexValue > linkedArr.length - 1
          }
          onClick={addIndex}
          isLoader={isLoading.addIndex}
        />
        <Button
          text={"Удалить по индексу"}
          extraClass={styles.list__button_large}
          disabled={inputIndexValue > linkedArr.length - 1}
          onClick={() => deleteIndex(Number(inputIndexValue))}
          isLoader={isLoading.deleteIndex}
        />
      </div>
      <AlgorithmContainer extraClass={styles.algorithm__container}>
        {linkedArr.map((element, index) => {
          return (
            <div key={index} className={styles.circle__container}>
              {element && element.push && element.elementSmall?.element && (
                <Circle
                  isSmall={true}
                  state={ElementStates.Changing}
                  letter={element.elementSmall?.element}
                  extraClass={styles.circle_small_top}
                />
              )}
              <div className={styles.circle_big}>
                <Circle
                  index={index}
                  state={element.state}
                  letter={element.element}
                  head={
                    index === 0 && !element.push && !element.remove
                      ? "head"
                      : ""
                  }
                  tail={
                    index === linkedArr.length - 1 &&
                    !element.push &&
                    !element.remove
                      ? "tail"
                      : ""
                  }
                />
                <ArrowIcon />
              </div>
              {element.remove && element.elementSmall?.element && (
                <Circle
                  isSmall={true}
                  state={ElementStates.Changing}
                  letter={element.elementSmall?.element}
                  extraClass={styles.circle_small_bottom}
                />
              )}
            </div>
          );
        })}
      </AlgorithmContainer>
    </SolutionLayout>
  );
};
