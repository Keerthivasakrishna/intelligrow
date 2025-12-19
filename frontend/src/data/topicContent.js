// Topic content with YouTube videos and detailed written content

export const topicContent = {
    // DSA Topics
    '1': {
        id: '1',
        title: 'Arrays',
        videoUrl: 'https://www.youtube.com/embed/55l-aZ7_F24',
        content: `# Arrays - Foundation of Data Structures

## What is an Array?
An array is a collection of elements stored at contiguous memory locations. It's the simplest and most widely used data structure.

## Key Characteristics
- **Fixed Size**: Once created, size cannot change
- **Same Type**: All elements must be of the same data type
- **Index-Based**: Access elements using zero-based indexing
- **Contiguous Memory**: Elements stored in adjacent memory locations

## Time Complexity
- **Access**: O(1) - Direct index access
- **Search**: O(n) - Linear search
- **Insertion**: O(n) - May require shifting
- **Deletion**: O(n) - May require shifting

## Common Operations
1. Traversing elements
2. Inserting elements
3. Deleting elements
4. Searching for elements
5. Sorting elements

## Advantages
✓ Fast access time
✓ Cache friendly
✓ Simple to implement
✓ Efficient for small datasets

## Disadvantages
✗ Fixed size
✗ Expensive insertions/deletions
✗ Memory waste if not fully used
`
    },
    '2': {
        id: '2',
        title: 'Linked Lists',
        videoUrl: 'https://www.youtube.com/embed/R9PTBwOzceo',
        content: `# Linked Lists - Dynamic Data Structure

## What is a Linked List?
A linked list is a linear data structure where elements (nodes) are connected using pointers.

## Types of Linked Lists
1. **Singly Linked List**: One pointer (next)
2. **Doubly Linked List**: Two pointers (next, prev)
3. **Circular Linked List**: Last node points to first

## Node Structure
Each node contains:
- Data field
- Pointer to next node (and previous in doubly)

## Time Complexity
- **Access**: O(n)
- **Search**: O(n)
- **Insertion at head**: O(1)
- **Deletion at head**: O(1)

## Advantages
✓ Dynamic size
✓ Efficient insertions/deletions
✓ No memory waste
✓ Easy to implement stacks/queues

## Disadvantages
✗ No random access
✗ Extra memory for pointers
✗ Not cache friendly
`
    },
    '3': {
        id: '3',
        title: 'Stacks',
        videoUrl: 'https://www.youtube.com/embed/F1F2imiOJfk',
        content: `# Stacks - LIFO Data Structure

## What is a Stack?
A stack is a linear data structure that follows Last-In-First-Out (LIFO) principle.

## Core Operations
1. **Push**: Add element to top - O(1)
2. **Pop**: Remove element from top - O(1)
3. **Peek/Top**: View top element - O(1)
4. **isEmpty**: Check if empty - O(1)

## Implementation Methods
- Using Arrays (fixed size)
- Using Linked Lists (dynamic)

## Real-World Applications
- Function call stack
- Undo/Redo operations
- Browser history
- Expression evaluation
- Backtracking algorithms

## Example Use Cases
- Balanced parentheses checking
- Infix to postfix conversion
- Tower of Hanoi
- Depth-First Search (DFS)
`
    },
    '4': {
        id: '4',
        title: 'Queues',
        videoUrl: 'https://www.youtube.com/embed/zp6pBNbUB2U',
        content: `# Queues - FIFO Data Structure

## What is a Queue?
A queue follows First-In-First-Out (FIFO) principle - first element added is first removed.

## Types of Queues
1. **Simple Queue**: Basic FIFO
2. **Circular Queue**: Last position connects to first
3. **Priority Queue**: Elements have priorities
4. **Deque**: Double-ended queue

## Core Operations
- **Enqueue**: Add to rear - O(1)
- **Dequeue**: Remove from front - O(1)
- **Front**: View front element - O(1)
- **Rear**: View rear element - O(1)

## Applications
- CPU scheduling
- Disk scheduling
- Print spooling
- Breadth-First Search (BFS)
- Handling interrupts
`
    },
    '5': {
        id: '5',
        title: 'Binary Trees',
        videoUrl: 'https://www.youtube.com/embed/H5JubkIy_p8',
        content: `# Binary Trees - Hierarchical Structure

## What is a Binary Tree?
A tree where each node has at most two children (left and right).

## Types
1. **Full Binary Tree**: Every node has 0 or 2 children
2. **Complete Binary Tree**: All levels filled except last
3. **Perfect Binary Tree**: All internal nodes have 2 children
4. **Balanced Binary Tree**: Height difference ≤ 1

## Traversals
1. **Inorder** (Left-Root-Right): Gives sorted order in BST
2. **Preorder** (Root-Left-Right): Copy tree
3. **Postorder** (Left-Right-Root): Delete tree
4. **Level Order**: BFS traversal

## Applications
- Binary Search Trees (BST)
- Expression trees
- Huffman coding
- File system hierarchy
`
    }
}
