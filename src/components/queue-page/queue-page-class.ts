import { ElementStates } from "../../types/element-states";
import { TQueueItem } from "../../types/utils";

export class QueueClass {
  items: string[];

  constructor(private capacity: number) {
    this.items = new Array(capacity).fill("");
  }

  head = 0;
  tail = 0;

  enqueue(input: string) {
    if (this.size() === this.capacity || input === "") {
      return;
    }
  
    this.items[this.tail] = input;
    this.tail = (this.tail + 1)
  }

  dequeue() {
    if (this.size() === 0) {
      return null;
    }

    const value = this.items[this.head];
    this.items[this.head] = "";
    this.head = (this.head + 1) 
    return value;
  }

  clear() {
    this.items = new Array(this.capacity).fill("");
    this.head = 0;
    this.tail = 0;
  }

  size() {
    if (this.head <= this.tail) {
      return this.tail - this.head;
    } else {
      return this.capacity - this.head + this.tail;
    }
  }

  isEmpty() {
    return this.size() === 0;
  }

  isFull() {
    return this.size() === this.capacity;
  }

  peek() {
    if (this.size() === 0) {
      return null;
    }
    return this.items[this.head];
  }
}
