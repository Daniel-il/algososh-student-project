export class LinkedListNode<T> {
  value: T;
  next: LinkedListNode<T> | null;

  constructor(value: T, next: LinkedListNode<T> | null = null) {
    this.value = value;
    this.next = next;
  }
}

export class LinkedList<T> {
  head: LinkedListNode<T> | null;
  tail: LinkedListNode<T> | null;

  constructor(initialValues?: T[]) {
    this.head = null;
    this.tail = null;

    initialValues?.forEach((elem) => this.append(elem));
  }

  append(value: T) {
    const node = new LinkedListNode(value);
    if (!this.head || !this.tail) {
      this.head = node;
      this.tail = node;
      return this;
    }
    this.tail.next = node;
    this.tail = node;
    return this;
  }

  prepend(value: T) {
    const node = new LinkedListNode(value);
    node.next = this.head;
    this.head = node;
    if (!this.tail) {
      this.tail = node;
    }
    return this;
  }

  deleteFirst(): LinkedListNode<T> | null {
    if (!this.head) {
      return null;
    }
    const nodeToDelete = this.head;

    if (!!this.head.next) {
      this.head = this.head.next;
    } else {
      this.head = null;
      this.tail = null;
    }
    return nodeToDelete;
  }

  deleteLast(): LinkedListNode<T> | null {
    if (!this.tail) {
      return null;
    }
    const nodeToDelete = this.tail;

    if (this.head === this.tail) {
      this.head = null;
      this.tail = null;

      return nodeToDelete;
    }

    let temporalNode = this.head;

    while (!!temporalNode?.next) {
      if (!temporalNode.next.next) {
        this.tail = temporalNode;
        temporalNode.next = null;
      } else {
        temporalNode = temporalNode.next;
      }
    }
    return nodeToDelete;
  }

  addIndex(index: number, value: T) {
    const node = new LinkedListNode(value);
    if (!this.head || !this.tail) {
      this.head = node;
      this.tail = node;
      return this;
    }
    if (index === 0) {
      this.prepend(value);
      return this;
    }

    let temporalNode: LinkedListNode<T> | null = this.head;
    let prevNode: LinkedListNode<T> | null = null;
    for (let i = 0; i < index; i++) {
      if (!!temporalNode.next) {
        prevNode = temporalNode;
        temporalNode = temporalNode.next;
      } else {
        alert("Такого элемента не существует");
        return null;
      }
    }
    node.next = temporalNode;
    if (prevNode) {
      prevNode.next = node;
    } else {
      this.head = node;
    }

    return this;
  }

  deleteIndex(index: number) {
    if (!this.tail) {
      return null;
    }
    let nodeToDelete;

    if (index === 0) {
      nodeToDelete = this.deleteFirst();
      return nodeToDelete;
    }

    let temporalNode: LinkedListNode<T> | null = this.head;

    for (let i = 0; i < index - 1; i++) {
      if (!!temporalNode?.next) {
        temporalNode = temporalNode.next;
      } else {
        alert("Такого элемента не существует");
        return null;
      }
    }

    if (!temporalNode?.next?.next) {
      nodeToDelete = this.deleteLast();
      return nodeToDelete;
    }

    nodeToDelete = temporalNode?.next;
    if (temporalNode?.next?.next) {
      temporalNode.next = temporalNode.next.next;
    }

    return nodeToDelete;
  }

  toArray() {
    const nodeArray = [];
    let temporalNode = this.head;

    while (!!temporalNode) {
      nodeArray.push(temporalNode);
      temporalNode = temporalNode.next;
    }

    return nodeArray;
  }
}
