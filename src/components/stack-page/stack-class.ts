export class Stack {
  stack: string[];

  constructor() {
    this.stack = [];
  }

  push(value: string) {
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
