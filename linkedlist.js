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
    // Start at the head
    let currNode = this.head;
    // If the list is empty
    if (!this.head) {
      return null;
    }
    // Check for the item
    while (currNode.value !== item) {
      /* Return null if it's the end of the list 
                 and the item is not on the list */
      if (currNode.next === null) {
        return null;
      } else {
        // Otherwise, keep looking
        currNode = currNode.next;
      }
    }
    // Found it
    return currNode;
  }

  remove(item) {
    // If the list is empty
    if (!this.head) {
      return null;
    }
    // If the node to be removed is head, make the next node head
    if (this.head.value === item) {
      this.head = this.head.next;
      return;
    }
    // Start at the head
    let currNode = this.head;
    // Keep track of previous
    let previousNode = this.head;

    while (currNode !== null && currNode.value !== item) {
      // Save the previous node
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
