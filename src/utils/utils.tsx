import { ElementStates } from "../types/element-states";
import { LinkedList } from "../components/list-page/list-page-class";
import { Circle } from "../components/ui/circle/circle";
import { LettersStep } from "../types/utils";
import { TStepsOfList } from "../types/utils";
export function selectionSortAscending(
  arrToShow: Array<{ letter: number; state: ElementStates }[]>,
  arrToSort: number[]
) {
  const n = arrToSort.length;

  const tempArr = [...arrToSort];

  let unsortedStart = 0;

  while (unsortedStart < n - 1) {
    let minIndex = unsortedStart;

    for (let i = unsortedStart + 1; i < n; i++) {
      if (tempArr[i] < tempArr[minIndex]) {
        minIndex = i;
      }

      // eslint-disable-next-line no-loop-func
      arrToShow.push(
        tempArr.map((elem, key) => {
          let color;
          if (key < unsortedStart) {
            color = ElementStates.Modified;
          } else if (key === unsortedStart || key === i) {
            color = ElementStates.Changing;
          } else {
            color = ElementStates.Default;
          }
          return { letter: elem, state: color };
        })
      );
    }

    if (minIndex !== unsortedStart) {
      [tempArr[minIndex], tempArr[unsortedStart]] = [
        tempArr[unsortedStart],
        tempArr[minIndex],
      ];
    }

    unsortedStart++;

    arrToShow.push(
      tempArr.map((elem, key) => {
        let color;
        if (key < unsortedStart) {
          color = ElementStates.Modified;
        } else if (key === unsortedStart || key === unsortedStart - 1) {
          color = ElementStates.Changing;
        } else {
          color = ElementStates.Default;
        }
        return { letter: elem, state: color };
      })
    );
  }

  arrToShow.push(
    tempArr.map((elem) => {
      return { letter: elem, state: ElementStates.Modified };
    })
  );
}

export function selectionSortDescending(
  arrToShow: Array<{ letter: number; state: ElementStates }[]>,
  arrayToSort: number[]
) {
  let currentIndex = 0;
  let arrayLength = arrayToSort.length;

  let tempArray = [...arrayToSort];

  arrToShow.push(
    tempArray.map((elem, index) => {
      return {
        letter: elem,
        state: index < 2 ? ElementStates.Changing : ElementStates.Default,
      };
    })
  );

  while (currentIndex < arrayLength - 1) {
    let maxIndex = currentIndex;

    for (let i = currentIndex + 1; i <= arrayLength - 1; i++) {
      if (tempArray[i] > tempArray[maxIndex]) {
        maxIndex = i;
      }
    }

    if (maxIndex !== currentIndex) {
      [tempArray[maxIndex], tempArray[currentIndex]] = [
        tempArray[currentIndex],
        tempArray[maxIndex],
      ];
    }

    arrToShow.push(
      // eslint-disable-next-line no-loop-func
      tempArray.map((elem, index) => {
        let color;
        if (index < currentIndex) {
          color = ElementStates.Modified;
        } else if (index === currentIndex || index === maxIndex) {
          color = ElementStates.Changing;
        } else {
          color = ElementStates.Default;
        }
        return { letter: elem, state: color };
      })
    );

    currentIndex++;
  }

  arrToShow.push(
    tempArray.map((elem) => {
      return { letter: elem, state: ElementStates.Modified };
    })
  );
}

export function bubbleSortAscending(
  arrToShow: Array<{ letter: number; state: ElementStates }[]>,
  arrToSort: number[]
) {
  const arrayLength = arrToSort.length;
  const sortedArray = [...arrToSort];

  arrToShow[0] = sortedArray.map((elem, index) => {
    return {
      letter: elem,
      state: index < 2 ? ElementStates.Changing : ElementStates.Default,
    };
  });

  for (let endIndex = arrayLength - 1; endIndex > 0; endIndex--) {
    for (let currentIndex = 0; currentIndex < endIndex; currentIndex++) {
      const colors = sortedArray.map((elem, index) => {
        let color;
        if (index > endIndex) {
          color = ElementStates.Modified;
        } else if (index === currentIndex || index === currentIndex + 1) {
          color = ElementStates.Changing;
        } else {
          color = ElementStates.Default;
        }
        return { letter: elem, state: color };
      });

      arrToShow.push(colors);

      if (sortedArray[currentIndex] > sortedArray[currentIndex + 1]) {
        [sortedArray[currentIndex], sortedArray[currentIndex + 1]] = [
          sortedArray[currentIndex + 1],
          sortedArray[currentIndex],
        ];
      }
    }
  }

  arrToShow.push(
    sortedArray.map((elem) => {
      return { letter: elem, state: ElementStates.Modified };
    })
  );
}

export function bubbleSortDescending(
  arrToShow: Array<{ letter: number; state: ElementStates }[]>,
  arrToSort: number[]
) {
  let length = arrToSort.length;
  let array = [...arrToSort];

  arrToShow[0] = array.map((elem, index) => {
    return {
      letter: elem,
      state: index < 2 ? ElementStates.Changing : ElementStates.Default,
    };
  });

  for (let i = length - 1; i > 0; i--) {
    for (let j = 0; j < i; j++) {
      arrToShow.push(
        array.map((elem, index) => {
          let color;
          if (index > i) {
            color = ElementStates.Modified;
          } else if (index === j || index === j + 1) {
            color = ElementStates.Changing;
          } else {
            color = ElementStates.Default;
          }
          return { letter: elem, state: color };
        })
      );

      if (array[j] < array[j + 1]) {
        [array[j], array[j + 1]] = [array[j + 1], array[j]];
      }
    }
  }

  arrToShow.push(
    array.map((elem) => {
      return { letter: elem, state: ElementStates.Modified };
    })
  );
}
export const getSteps = (source: string): LettersStep[] => {
  const letters = source.split("");
  const steps: LettersStep[] = [];
  const len = letters.length;

  const elementStates = new Array<ElementStates>(len).fill(
    ElementStates.Default
  );

  for (let i = 0; i < Math.ceil(len / 2); i++) {
    const leftIndex = i;
    const rightIndex = len - 1 - i;

    elementStates[leftIndex] = ElementStates.Changing;
    elementStates[rightIndex] = ElementStates.Changing;

    [letters[leftIndex], letters[rightIndex]] = [
      letters[rightIndex],
      letters[leftIndex],
    ];

    steps.push({
      letters: [...letters],
      index: i,
      state: [...elementStates],
    });

    elementStates[leftIndex] = ElementStates.Modified;
    elementStates[rightIndex] = ElementStates.Modified;

    steps.push({
      letters: [...letters],
      index: i,
      state: [...elementStates],
    });
  }

  return steps;
};

export function add(
  value: string,
  atStart: boolean,
  list: LinkedList<string>
): TStepsOfList[] {
  const steps: TStepsOfList[] = [];
  const initialList = list.toArray();
  const index = atStart ? 0 : initialList.length;

  steps.push({ index, value, step: initialList, operation: "add" });

  if (atStart) {
    list.prepend(value);
  } else {
    list.append(value);
  }

  steps.push({ index, step: list.toArray(), operation: "add" });
  steps.push({ index, step: list.toArray() });

  return steps;
}

export function remove(fromStart: boolean, list: LinkedList<string>): TStepsOfList[] {
  const steps: TStepsOfList[] = [];
  const initialList = list.toArray();
  const index = fromStart ? 0 : initialList.length - 1;
  const elementToDelete = fromStart
    ? list.deleteFirst()?._value
    : list.deleteLast()?._value;

  steps.push({
    index,
    value: elementToDelete,
    step: initialList,
    operation: "delete",
  });
  steps.push({ step: list.toArray() });

  return steps;
}

export function pushByIndex(
  index: number,
  value: string,
  list: LinkedList<string>
): TStepsOfList[] {
  const steps: TStepsOfList[] = [];
  const initialList = list.toArray();

  steps.push({ index, value, step: initialList, operation: "add" });

  list.addIndex(index, value);

  steps.push({ index, step: list.toArray(), operation: "add" });
  steps.push({ index, step: list.toArray() });

  return steps;
}

export function removeByIndex(
  index: number,
  list: LinkedList<string>
): TStepsOfList[] {
  const steps: TStepsOfList[] = [];
  const initialList = list.toArray();
  const elementToDelete = list.deleteIndex(index)?._value;

  steps.push({
    index,
    value: elementToDelete,
    step: initialList,
    operation: "delete",
  });
  steps.push({ step: list.toArray() });

  return steps;
}

export function calculateElementState(index: number, step: TStepsOfList) {
  const { index: stepIndex, value: stepValue, operation } = step;

  if (!operation || !stepIndex) {
    return ElementStates.Default;
  } else if (index < stepIndex) {
    return ElementStates.Changing;
  } else if (index === stepIndex) {
    return stepValue ? ElementStates.Changing : ElementStates.Modified;
  }

  return ElementStates.Default;
}

export function calculateElementHead(index: number, step: TStepsOfList) {
  const { operation, index: stepIndex, value: stepValue } = step;

  if (operation === "add" && index === stepIndex) {
    return (
      <Circle
        letter={stepValue}
        state={ElementStates.Changing}
        isSmall={true}
      />
    );
  }

  return index === 0 ? "head" : "";
}

export function calculateElementTail(index: number, step: TStepsOfList) {
  const { operation, index: stepIndex, step: stepList } = step;
  if (stepList) {
    const lastIndex = stepList.length - 1;
    if (operation === "delete" && index === stepIndex) {
      return (
        <Circle
          letter={stepList[lastIndex]._value}
          state={ElementStates.Changing}
          isSmall={true}
        />
      );
    }
    return index === lastIndex ? "tail" : "";
  }


}
