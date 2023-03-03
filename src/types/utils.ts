import { ElementStates } from "./element-states";

export interface LettersStep {
  // Текущий порядок символов
  letters: string[];
  // Индекс изменяемого символа слева
  // Символ справа вычисляется на его основе, поэтому его хранить отдельно нет нужды
  // Если нет индекса, значит, сейчас ничего не меняется
  index?: number;
  // Состояние: changing - символ будет меняться, modified - символ изменился
  state: ElementStates[];
  swappedIndexes?: number[];
}
export type TQueueItem = {
  value: string;
  color: ElementStates;
};
export interface QueueState {
  items: string[];
}
