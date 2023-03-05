export class Stack<T> {
  stack: T[];

  constructor() {
    this.stack = [];
  }

  push(value: T) {
    this.stack.push(value);
    return this.stack;
  }

  pop() {
    this.stack.pop();
    return this.stack;
  }

  clear() {
    this.stack = [];
    return this.stack;
  }
}
