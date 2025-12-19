-- Seed quiz questions for DSA topics
-- Run this after seed_topics.sql

-- Arrays Quiz
INSERT INTO public.quiz_questions (topic_id, question_text, options, correct_answer, explanation) VALUES
('a1111111-1111-1111-1111-111111111111', 'What is the time complexity of accessing an element in an array by index?', 
 '["O(1)", "O(n)", "O(log n)", "O(n²)"]', 0, 'Array elements are stored in contiguous memory, allowing direct access via index in constant time O(1).'),
('a1111111-1111-1111-1111-111111111111', 'Which of the following is true about arrays?', 
 '["Size can change dynamically", "Elements must be of the same type", "Elements are stored in random locations", "Arrays don''t support indexing"]', 1, 'In most languages, array elements must be of the same data type for memory alignment.'),
('a1111111-1111-1111-1111-111111111111', 'What is the space complexity of an array of size n?', 
 '["O(1)", "O(log n)", "O(n)", "O(n²)"]', 2, 'An array of size n requires O(n) space to store all elements.'),
('a1111111-1111-1111-1111-111111111111', 'In a 0-indexed array of size 5, what is the last valid index?', 
 '["5", "4", "6", "3"]', 1, 'In 0-indexed arrays, indices range from 0 to n-1, so for size 5, the last index is 4.'),
('a1111111-1111-1111-1111-111111111111', 'What happens when you try to access an out-of-bounds index in most languages?', 
 '["Returns null", "Returns 0", "Throws an error/exception", "Returns the first element"]', 2, 'Accessing an invalid index typically results in an IndexError, ArrayIndexOutOfBoundsException, or similar error.');

-- Linked Lists Quiz
INSERT INTO public.quiz_questions (topic_id, question_text, options, correct_answer, explanation) VALUES
('a2222222-2222-2222-2222-222222222222', 'What is the main advantage of linked lists over arrays?', 
 '["Faster access time", "Dynamic size", "Less memory usage", "Better cache performance"]', 1, 'Linked lists can grow and shrink dynamically without reallocating memory like arrays.'),
('a2222222-2222-2222-2222-222222222222', 'What is the time complexity of inserting a node at the beginning of a singly linked list?', 
 '["O(1)", "O(n)", "O(log n)", "O(n log n)"]', 0, 'Inserting at the head only requires updating pointers, which is O(1).'),
('a2222222-2222-2222-2222-222222222222', 'In a doubly linked list, each node contains:', 
 '["Only data", "Data and one pointer", "Data and two pointers", "Three pointers"]', 2, 'Doubly linked list nodes have data, a next pointer, and a previous pointer.'),
('a2222222-2222-2222-2222-222222222222', 'What is the space overhead of a linked list compared to an array?', 
 '["No overhead", "Higher (stores pointers)", "Lower (no fixed size)", "Same"]', 1, 'Each node in a linked list requires extra memory to store pointer(s) to other nodes.'),
('a2222222-2222-2222-2222-222222222222', 'To access the 5th element in a linked list, you must:', 
 '["Jump directly to index 4", "Traverse from the head", "Use binary search", "Access randomly"]', 1, 'Linked lists require sequential traversal from the head to reach any element.');

-- Recursion Quiz
INSERT INTO public.quiz_questions (topic_id, question_text, options, correct_answer, explanation) VALUES
('a3333333-3333-3333-3333-333333333333', 'What is the most critical component of a recursive function?', 
 '["Loop structure", "Base case", "Global variables", "Multiple parameters"]', 1, 'Every recursive function must have a base case to stop recursion and prevent infinite loops.'),
('a3333333-3333-3333-3333-333333333333', 'What does the call stack do during recursion?', 
 '["Stores return values only", "Tracks function calls and local variables", "Deletes old functions", "Speeds up execution"]', 1, 'The call stack maintains the state of each recursive call including local variables and return addresses.'),
('a3333333-3333-3333-3333-333333333333', 'What is tail recursion?', 
 '["Recursion with multiple base cases", "Recursive call is the last operation", "Recursion without parameters", "Infinite recursion"]', 1, 'Tail recursion occurs when the recursive call is the final operation, allowing optimization by compilers.'),
('a3333333-3333-3333-3333-333333333333', 'What problem can occur with deep recursion?', 
 '["Memory leak", "Stack overflow", "Heap corruption", "Syntax error"]', 1, 'Too many recursive calls can exceed the call stack limit, causing a stack overflow error.'),
('a3333333-3333-3333-3333-333333333333', 'Recursion is typically more memory-intensive than iteration because:', 
 '["It uses more variables", "Each call uses stack space", "It creates arrays", "It allocates heap memory"]', 1, 'Each recursive call adds a frame to the call stack, consuming more memory than a simple loop.');

-- Stacks Quiz
INSERT INTO public.quiz_questions (topic_id, question_text, options, correct_answer, explanation) VALUES
('a4444444-4444-4444-4444-444444444444', 'What does LIFO stand for in the context of stacks?', 
 '["Last In First Out", "Last In Forever Out", "Least Important First Out", "Linear Input Fast Output"]', 0, 'LIFO means the last element added to the stack is the first one to be removed.'),
('a4444444-4444-4444-4444-444444444444', 'Which operation is NOT a standard stack operation?', 
 '["Push", "Pop", "Peek", "Dequeue"]', 3, 'Dequeue is a queue operation. Stack operations are push, pop, and peek/top.'),
('a4444444-4444-4444-4444-444444444444', 'What is the time complexity of push and pop operations in a stack?', 
 '["O(n)", "O(log n)", "O(1)", "O(n²)"]', 2, 'Both push and pop operate on the top of the stack, taking constant time O(1).'),
('a4444444-4444-4444-4444-444444444444', 'Which real-world scenario best represents a stack?', 
 '["People in a queue", "A pile of plates", "A roundabout", "A tree structure"]', 1, 'A stack of plates is LIFO: the last plate placed on top is the first one removed.'),
('a4444444-4444-4444-4444-444444444444', 'Function call management in programming languages uses:', 
 '["Queues", "Stacks", "Trees", "Graphs"]', 1, 'The call stack manages function calls in LIFO order for nested and recursive functions.');

-- Queues Quiz
INSERT INTO public.quiz_questions (topic_id, question_text, options, correct_answer, explanation) VALUES
('a5555555-5555-5555-5555-555555555555', 'What does FIFO stand for?', 
 '["First In First Out", "Fast In Fast Out", "Fixed Input Fixed Output", "Final In Final Out"]', 0, 'FIFO means the first element added is the first to be removed, like a line of people.'),
('a5555555-5555-5555-5555-555555555555', 'In a queue, where are elements added and removed?', 
 '["Both at front", "Both at rear", "Add at rear, remove from front", "Add at front, remove from rear"]', 2, 'Enqueue adds to the rear (back) and dequeue removes from the front.'),
('a5555555-5555-5555-5555-555555555555', 'What is a circular queue?', 
 '["Queue with no size limit", "Queue where rear connects to front", "Sorted queue", "Double-ended queue"]', 1, 'In a circular queue, the last position connects back to the first, efficiently using fixed space.'),
('a5555555-5555-5555-5555-555555555555', 'Which application uses a queue data structure?', 
 '["Undo functionality", "Breadth-First Search", "Function calls", "Expression evaluation"]', 1, 'BFS uses a queue to explore nodes level by level in a graph or tree.'),
('a5555555-5555-5555-5555-555555555555', 'What is the time complexity of enqueue and dequeue operations?', 
 '["O(n)", "O(1)", "O(log n)", "O(n log n)"]', 1, 'Both enqueue and dequeue operate at the ends of the queue in constant time O(1).');

-- Binary Trees Quiz
INSERT INTO public.quiz_questions (topic_id, question_text, options, correct_answer, explanation) VALUES
('a6666666-6666-6666-6666-666666666666', 'What is the maximum number of children a node can have in a binary tree?', 
 '["1", "2", "3", "Unlimited"]', 1, 'By definition, binary trees allow at most two children per node: left and right.'),
('a6666666-6666-6666-6666-666666666666', 'In which traversal is the root visited first?', 
 '["Inorder", "Preorder", "Postorder", "Level-order"]', 1, 'Preorder traversal visits the root before the left and right subtrees.'),
('a6666666-6666-6666-6666-666666666666', 'Inorder traversal of a binary tree visits nodes in which sequence?', 
 '["Root, Left, Right", "Left, Root, Right", "Left, Right, Root", "Right, Root, Left"]', 1, 'Inorder: Left subtree → Root → Right subtree.'),
('a6666666-6666-6666-6666-666666666666', 'What is a leaf node?', 
 '["Root node", "Node with no children", "Node with one child", "Node with two children"]', 1, 'A leaf node has no left or right children, making it a terminal node in the tree.'),
('a6666666-6666-6666-6666-666666666666', 'The height of a tree with only one node (the root) is:', 
 '["0", "1", "-1", "Undefined"]', 0, 'By convention, the height of a single-node tree is 0 (some definitions use 1).');

-- BST Quiz
INSERT INTO public.quiz_questions (topic_id, question_text, options, correct_answer, explanation) VALUES
('a7777777-7777-7777-7777-777777777777', 'In a BST, all values in the left subtree are:', 
 '["Greater than the root", "Less than the root", "Equal to the root", "Random"]', 1, 'BST property: left subtree values < root < right subtree values.'),
('a7777777-7777-7777-7777-777777777777', 'What traversal of a BST gives elements in sorted order?', 
 '["Preorder", "Inorder", "Postorder", "Level-order"]', 1, 'Inorder traversal of a BST produces a sorted sequence.'),
('a7777777-7777-7777-7777-777777777777', 'Average time complexity of search in a balanced BST:', 
 '["O(1)", "O(log n)", "O(n)", "O(n log n)"]', 1, 'In a balanced BST, search eliminates half the tree each step, giving O(log n).'),
('a7777777-7777-7777-7777-777777777777', 'Worst-case time complexity of search in an unbalanced BST:', 
 '["O(1)", "O(log n)", "O(n)", "O(n²)"]', 2, 'If the BST degenerates into a linked list (all left or right), search becomes O(n).'),
('a7777777-7777-7777-7777-777777777777', 'Which is NOT a self-balancing BST?', 
 '["AVL Tree", "Red-Black Tree", "Binary Search Tree", "B-Tree"]', 2, 'Standard BST doesn''t self-balance. AVL, Red-Black, and B-Trees do.');

-- Graphs Quiz
INSERT INTO public.quiz_questions (topic_id, question_text, options, correct_answer, explanation) VALUES
('a8888888-8888-8888-8888-888888888888', 'A graph with edges having direction is called:', 
 '["Undirected graph", "Directed graph (Digraph)", "Weighted graph", "Cyclic graph"]', 1, 'Directed graphs have edges with a specific direction from one vertex to another.'),
('a8888888-8888-8888-8888-888888888888', 'Which traversal uses a queue?', 
 '["DFS", "BFS", "Both", "Neither"]', 1, 'Breadth-First Search (BFS) uses a queue to explore level by level.'),
('a8888888-8888-8888-8888-888888888888', 'Which traversal uses a stack?', 
 '["BFS", "DFS", "Both", "Neither"]', 1, 'Depth-First Search (DFS) uses a stack (or recursion which uses the call stack).'),
('a8888888-8888-8888-8888-888888888888', 'An adjacency matrix for a graph with V vertices requires how much space?', 
 '["O(V)", "O(V²)", "O(V log V)", "O(E)"]', 1, 'An adjacency matrix is a V×V 2D array, requiring O(V²) space.'),
('a8888888-8888-8888-8888-888888888888', 'A graph with no cycles is called:', 
 '["Connected graph", "Acyclic graph", "Complete graph", "Sparse graph"]', 1, 'An acyclic graph has no cycles. A DAG is a Directed Acyclic Graph.');

-- Sorting Quiz
INSERT INTO public.quiz_questions (topic_id, question_text, options, correct_answer, explanation) VALUES
('a9999999-9999-9999-9999-999999999999', 'Which sorting algorithm has O(n²) worst-case complexity?', 
 '["Merge Sort", "Quick Sort", "Bubble Sort", "Heap Sort"]', 2, 'Bubble Sort has O(n²) time complexity in average and worst cases.'),
('a9999999-9999-9999-9999-999999999999', 'Which sorting algorithm is most efficient for nearly sorted data?', 
 '["Bubble Sort", "Quick Sort", "Merge Sort", "Insertion Sort"]', 3, 'Insertion Sort performs very well (close to O(n)) on nearly sorted arrays.'),
('a9999999-9999-9999-9999-999999999999', 'Merge Sort has a time complexity of:', 
 '["O(n)", "O(n log n)", "O(n²)", "O(log n)"]', 1, 'Merge Sort consistently runs in O(n log n) time by dividing and merging.'),
('a9999999-9999-9999-9999-999999999999', 'Which sorting algorithm is NOT stable?', 
 '["Merge Sort", "Insertion Sort", "Quick Sort (standard)", "Bubble Sort"]', 2, 'Standard Quick Sort is not stable; equal elements may change relative order.'),
('a9999999-9999-9999-9999-999999999999', 'Quick Sort uses which technique?', 
 '["Dynamic Programming", "Greedy", "Divide and Conquer", "Backtracking"]', 2, 'Quick Sort uses divide and conquer by partitioning around a pivot.');

-- Searching Quiz
INSERT INTO public.quiz_questions (topic_id, question_text, options, correct_answer, explanation) VALUES
('aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', 'Binary Search requires the array to be:', 
 '["Sorted", "Unsorted", "Of fixed size", "In a linked list"]', 0, 'Binary Search only works on sorted arrays to eliminate half the search space each iteration.'),
('aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', 'Time complexity of Linear Search:', 
 '["O(1)", "O(log n)", "O(n)", "O(n log n)"]', 2, 'Linear Search checks each element sequentially, resulting in O(n) time.'),
('aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', 'Time complexity of Binary Search:', 
 '["O(1)", "O(log n)", "O(n)", "O(n²)"]', 1, 'Binary Search halves the search space each step, achieving O(log n).'),
('aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', 'Binary Search is an example of which technique?', 
 '["Brute Force", "Divide and Conquer", "Dynamic Programming", "Greedy"]', 1, 'Binary Search divides the problem in half at each step (divide and conquer).'),
('aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', 'Which search works on unsorted arrays?', 
 '["Binary Search", "Linear Search", "Both", "Neither"]', 1, 'Only Linear Search can be used on unsorted arrays; Binary Search requires sorting.');

-- Hashing Quiz
INSERT INTO public.quiz_questions (topic_id, question_text, options, correct_answer, explanation) VALUES
('abbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb', 'Average time complexity for hash table lookup:', 
 '["O(1)", "O(log n)", "O(n)", "O(n²)"]', 0, 'Hash tables provide average O(1) lookup time with a good hash function.'),
('abbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb', 'What is a hash collision?', 
 '["Two keys with different hash values", "Two keys with the same hash value", "Invalid hash function", "Empty hash table"]', 1, 'A collision occurs when different keys produce the same hash value.'),
('abbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb', 'Which collision resolution uses linked lists?', 
 '["Open Addressing", "Chaining", "Double Hashing", "Rehashing"]', 1, 'Chaining stores colliding elements in a linked list at each hash table index.'),
('abbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb', 'Load factor in a hash table is:', 
 '["Number of buckets", "Number of elements / Number of buckets", "Hash function output", "Collision count"]', 1, 'Load factor = n/m where n is number of elements and m is number of buckets.'),
('abbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb', 'What makes a good hash function?', 
 '["Always returns 0", "Distributes keys uniformly", "Takes O(n) time", "Creates many collisions"]', 1, 'A good hash function distributes keys uniformly across buckets to minimize collisions.');

-- Dynamic Programming Quiz
INSERT INTO public.quiz_questions (topic_id, question_text, options, correct_answer, explanation) VALUES
('acccccccc-cccc-cccc-cccc-cccccccccccc', 'What is the main principle of Dynamic Programming?', 
 '["Divide and Conquer", "Store and reuse subproblem solutions", "Random selection", "Greedy choice"]', 1, 'DP stores solutions to subproblems to avoid recomputing them (optimal substructure).'),
('acccccccc-cccc-cccc-cccc-cccccccccccc', 'Memoization is a:', 
 '["Bottom-up approach", "Top-down approach", "Greedy approach", "Brute force approach"]', 1, 'Memoization is top-down: solve recursively and cache results.'),
('acccccccc-cccc-cccc-cccc-cccccccccccc', 'Tabulation is a:', 
 '["Top-down approach", "Bottom-up approach", "Recursive approach", "Backtracking approach"]', 1, 'Tabulation is bottom-up: iteratively fill a table from base cases.'),
('acccccccc-cccc-cccc-cccc-cccccccccccc', 'The Fibonacci sequence using DP reduces time complexity from O(2^n) to:', 
 '["O(n)", "O(log n)", "O(n²)", "O(n log n)"]', 0, 'DP reduces redundant calculations, making Fibonacci run in O(n) time.'),
('acccccccc-cccc-cccc-cccc-cccccccccccc', 'Which problem is NOT typically solved with DP?', 
 '["Longest Common Subsequence", "Knapsack Problem", "Sorting an array", "Matrix Chain Multiplication"]', 2, 'Sorting uses comparison-based or divide-and-conquer algorithms, not DP.');
