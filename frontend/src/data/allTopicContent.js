// Complete topic content with videos and text - PART 1 (DSA Topics 1-6)

export const topicContentData = {
    // ========== DATA STRUCTURES & ALGORITHMS ==========

    '1': { // Arrays
        videoUrl: 'https://www.youtube.com/embed/55l-aZ7_F24',
        content: `# Arrays - Foundation of Data Structures

## Introduction
An array is a collection of elements of the same type stored in contiguous memory locations.

## Key Properties
- **Fixed Size**: Cannot grow or shrink after creation
- **Index-Based Access**: Elements accessed via zero-based indices
- **Homogeneous**: All elements same data type
- **Contiguous Memory**: Elements stored adjacently

## Operations & Complexity
| Operation | Time Complexity |
|-----------|----------------|
| Access    | O(1)           |
| Search    | O(n)           |
| Insert    | O(n)           |
| Delete    | O(n)           |

## Advantages
✓ Fast random access
✓ Cache-friendly
✓ Simple implementation
✓ Memory efficient (no pointers)

## Disadvantages
✗ Fixed size
✗ Expensive insertions/deletions
✗ Wasted memory if not full

## Common Algorithms
- Two Pointer Technique
- Sliding Window
- Kadane's Algorithm
- Dutch National Flag
`
    },

    '2': { // Linked Lists
        videoUrl: 'https://www.youtube.com/embed/R9PTBwOzceo',
        content: `# Linked Lists - Dynamic Linear Structure

## Introduction
A linked list is a linear collection of nodes where each node contains data and a reference to the next node.

## Types
1. **Singly Linked**: next pointer only
2. **Doubly Linked**: next + prev pointers
3. **Circular**: last node points to first

## Node Structure
\`\`\`
class Node {
    data: value
    next: Node*
}
\`\`\`

## Operations
| Operation | Time | Space |
|-----------|------|-------|
| Insert at head | O(1) | O(1) |
| Insert at tail | O(n) | O(1) |
| Delete head | O(1) | O(1) |
| Search | O(n) | O(1) |

## Advantages
✓ Dynamic size
✓ Efficient insertions/deletions at known positions
✓ No wasted memory

## Disadvantages
✗ No random access
✗ Extra memory for pointers
✗ Not cache-friendly

## Applications
- Implement stacks/queues
- Browser history
- Image viewer
- Music playlists
`
    },

    '3': { // Stacks
        videoUrl: 'https://www.youtube.com/embed/F1F2imiOJfk',
        content: `# Stacks - LIFO Data Structure

## Introduction
Stack follows Last-In-First-Out (LIFO) principle - last element added is first removed.

## Core Operations
- **Push**: Add to top - O(1)
- **Pop**: Remove from top - O(1)
- **Peek/Top**: View top - O(1)
- **isEmpty**: Check empty - O(1)

## Implementation
Can be implemented using:
- Arrays (fixed size)
- Linked Lists (dynamic)

## Applications
🔹 Function call stack (recursion)
🔹 Undo/Redo operations
🔹 Browser back/forward
🔹 Expression evaluation
🔹 Backtracking algorithms
🔹 Syntax parsing

## Classic Problems
- Balanced Parentheses
- Infix to Postfix conversion
- Next Greater Element
- Stock Span Problem
- Min Stack design
`
    },

    '4': { // Queues
        videoUrl: 'https://www.youtube.com/embed/zp6pBNbUB2U',
        content: `# Queues - FIFO Data Structure

## Introduction
Queue follows First-In-First-Out (FIFO) - first element added is first removed.

## Types
1. **Simple Queue**: Basic FIFO
2. **Circular Queue**: Efficient space usage
3. **Priority Queue**: Ordered by priority
4. **Deque**: Double-ended queue

## Operations
- **Enqueue**: Add to rear - O(1)
- **Dequeue**: Remove from front - O(1)
- **Front**: View front - O(1)
- **isEmpty**: Check empty - O(1)

## Applications
🔹 CPU scheduling
🔹 Disk scheduling  
🔹 Print job management
🔹 Breadth-First Search (BFS)
🔹 Asynchronous data transfer
🔹 Call center systems

## Problems
- Implement Queue using Stacks
- Sliding Window Maximum
- Level Order Traversal
`
    },

    '5': { // Binary Trees
        videoUrl: 'https://www.youtube.com/embed/H5JubkIy_p8',
        content: `# Binary Trees - Hierarchical Structure

## Introduction
A tree where each node has at most two children (left and right child).

## Types
1. **Full**: Each node has 0 or 2 children
2. **Complete**: All levels filled except possibly last
3. **Perfect**: All internal nodes have 2 children, all leaves at same level
4. **Balanced**: Height difference ≤ 1

## Traversals
**DFS Traversals:**
- **Inorder** (L-Root-R): BST gives sorted order
- **Preorder** (Root-L-R): Copy tree structure
- **Postorder** (L-R-Root): Delete tree

**BFS Traversal:**
- **Level Order**: Process level by level

## Properties
- Maximum nodes at level i: 2^i
- Maximum nodes in tree of height h: 2^(h+1) - 1

## Applications
🌳 Binary Search Trees
🌳 Expression trees
🌳 Huffman coding
🌳 File system hierarchy
`
    },

    '6': { // Graphs
        videoUrl: 'https://www.youtube.com/embed/tWVWeAqZ0WU',
        content: `# Graphs - Network Structures

## Introduction
A graph G = (V, E) consists of vertices (nodes) and edges (connections).

## Types
**By Direction:**
- Directed (Digraph)
- Undirected

**By Weight:**
- Weighted
- Unweighted

**By Connectivity:**
- Connected
- Disconnected

## Representation
1. **Adjacency Matrix**: O(V²) space
2. **Adjacency List**: O(V+E) space

## Traversals
**DFS (Depth-First Search):**
- Uses stack/recursion
- Time: O(V+E)

**BFS (Breadth-First Search):**
- Uses queue
- Time: O(V+E)

## Applications
🌐 Social networks
🌐 Maps & navigation
🌐 Web page linking
🌐 Network routing
🌐 Recommendation systems

## Classic Algorithms
- Dijkstra's shortest path
- Prim's MST
- Kruskal's MST
- Topological Sort
- Strongly Connected Components
`
    }
}
