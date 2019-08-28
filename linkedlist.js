class _Node {
  constructor(value, next = null) {
    this.value = value;
    this.next = next;
  }
}

class LinkedList {
  constructor() {
    this.head = null;
  }

  insertAfter(item, key) {
    if (!this.head) {
      return null;
    }

    if (this.head.value === key) {
      this.head.next = new _Node(item, this.head.next);
      return;
    }

    let node = this.head.next;
    while (node !== null && node.value !== key) {
      node = node.next;
    }
    if (node === null) {
      console.log(`${key} not found`);
      return;
    }
    node.next = new _Node(item, node.next);
  }

  insertAt(item, index) {
    if (index === 0) {
      this.insertFirst(item);
    } else {
      let counter = 1;
      let currentNode = this.head.next,
        previousNode = this.head;

      while (currentNode !== null && counter !== index) {
        previousNode = currentNode;
        currentNode = currentNode.next;
        counter++;
      }
      if (currentNode === null) {
        console.log("Please choose another index");
        return;
      }
      previousNode.next = new _Node(item, currentNode);
    }
  }

  insertBefore(item, key) {
    if (!this.head) {
      return null;
    }

    if (this.head.value === key) {
      this.head = new _Node(item, this.head);
      return;
    }

    let currentNode = this.head.next,
      previousNode = this.head;
    while (currentNode !== null && currentNode.value !== key) {
      previousNode = currentNode;
      currentNode = currentNode.next;
    }
    if (currentNode === null) {
      console.log(`${key} not found`);
      return;
    }
    previousNode.next = new _Node(item, currentNode);
  }

  insertFirst(item) {
    this.head = new _Node(item, this.head);
  }

  insertLast(item) {
    if (this.head === null) {
      this.insertFirst(item);
    } else {
      let tempNode = this.head;
      while (tempNode.next !== null) {
        tempNode = tempNode.next;
      }
      tempNode.next = new _Node(item, null);
    }
  }

  find(item) {
    let currNode = this.head;
    if (!this.head) {
      return null;
    }
    while (currNode.value !== item) {
      if (currNode.next === null) {
        return null;
      } else {
        currNode = currNode.next;
      }
    }
    return currNode;
  }

  remove(item) {
    if (!this.head) {
      return null;
    }
    if (this.head.value === item) {
      this.head = this.head.next;
      return;
    }
    let currNode = this.head;
    let previousNode = this.head;

    while (currNode !== null && currNode.value !== item) {
      previousNode = currNode;
      currNode = currNode.next;
    }
    if (currNode === null) {
      console.log("Item not found");
      return;
    }
    previousNode.next = currNode.next;
  }
}

module.exports = LinkedList;
