// Comprehensive quiz questions - 10 questions per topic

export const quizQuestions = {
    '1': [ // Arrays
        { id: '1', question_text: 'What is the time complexity of accessing an element in an array by index?', options: ['O(1)', 'O(n)', 'O(log n)', 'O(n²)'], correct_answer: 0, explanation: 'Arrays provide constant time O(1) access via index due to contiguous memory.' },
        { id: '2', question_text: 'Which of the following is true about arrays?', options: ['Size can change dynamically', 'Elements must be of same type', 'Random storage in memory', 'No indexing possible'], correct_answer: 1, explanation: 'Array elements must be of the same data type.' },
        { id: '3', question_text: 'What is the space complexity of an array of size n?', options: ['O(1)', 'O(log n)', 'O(n)', 'O(n²)'], correct_answer: 2, explanation: 'An array requires O(n) space for n elements.' },
        { id: '4', question_text: 'In a 0-indexed array of size 5, what is the last valid index?', options: ['5', '4', '6', '3'], correct_answer: 1, explanation: 'In 0-indexed arrays, last index = size - 1 = 4.' },
        { id: '5', question_text: 'What happens when accessing an out-of-bounds index?', options: ['Returns null', 'Returns 0', 'Throws error', 'Returns first element'], correct_answer: 2, explanation: 'Accessing invalid index typically throws an error or undefined behavior.' },
        { id: '6', question_text: 'Which operation is most efficient in arrays?', options: ['Insertion at middle', 'Deletion at middle', 'Access by index', 'Dynamic resizing'], correct_answer: 2, explanation: 'Index-based access is O(1), most efficient operation.' },
        { id: '7', question_text: 'Arrays are stored in which type of memory allocation?', options: ['Random', 'Contiguous', 'Scattered', 'Linked'], correct_answer: 1, explanation: 'Arrays use contiguous memory allocation.' },
        { id: '8', question_text: 'What is the time complexity of linear search in an unsorted array?', options: ['O(1)', 'O(log n)', 'O(n)', 'O(n log n)'], correct_answer: 2, explanation: 'Linear search requires O(n) time in worst case.' },
        { id: '9', question_text: 'Which is a disadvantage of arrays?', options: ['Fast access', 'Fixed size', 'Simple implementation', 'Cache friendly'], correct_answer: 1, explanation: 'Fixed size is a major limitation of arrays.' },
        { id: '10', question_text: 'What is the best case for inserting at the end of an array?', options: ['O(1)', 'O(n)', 'O(log n)', 'O(n²)'], correct_answer: 0, explanation: 'If space available, insertion at end is O(1).' }
    ],
    '2': [ // Linked Lists
        { id: '11', question_text: 'Main advantage of linked lists over arrays?', options: ['Faster access', 'Dynamic size', 'Less memory', 'Better cache'], correct_answer: 1, explanation: 'Linked lists can grow/shrink dynamically.' },
        { id: '12', question_text: 'Time complexity of inserting at the beginning of a linked list?', options: ['O(1)', 'O(n)', 'O(log n)', 'O(n log n)'], correct_answer: 0, explanation: 'Inserting at head is O(1) operation.' },
        { id: '13', question_text: 'In a doubly linked list, each node contains:', options: ['Only data', 'Data and one pointer', 'Data and two pointers', 'Three pointers'], correct_answer: 2, explanation: 'Doubly linked lists have next and previous pointers.' },
        { id: '14', question_text: 'Space overhead of linked lists compared to arrays?', options: ['No overhead', 'Higher due to pointers', 'Lower', 'Same'], correct_answer: 1, explanation: 'Extra memory needed for storing pointers.' },
        { id: '15', question_text: 'To access the 5th element in a linked list:', options: ['Direct access via index', 'Sequential traversal needed', 'Binary search', 'Random access'], correct_answer: 1, explanation: 'Linked lists require sequential traversal from head.' },
        { id: '16', question_text: 'Which pointer does the last node of a singly linked list contain?', options: ['Points to first', 'Points to NULL', 'Points to itself', 'Points to middle'], correct_answer: 1, explanation: 'Last node\'s next pointer is NULL.' },
        { id: '17', question_text: 'Time complexity to delete the last node in singly linked list?', options: ['O(1)', 'O(n)', 'O(log n)', 'O(n²)'], correct_answer: 1, explanation: 'Need to traverse to second-last node, taking O(n).' },
        { id: '18', question_text: 'Which is NOT a type of linked list?', options: ['Singly', 'Doubly', 'Circular', 'Binary'], correct_answer: 3, explanation: 'Binary refers to trees, not linked lists.' },
        { id: '19', question_text: 'Advantage of circular linked list?', options: ['Faster search', 'Can traverse from any node', 'Less memory', 'Direct access'], correct_answer: 1, explanation: 'Circular lists allow traversal from any starting point.' },
        { id: '20', question_text: 'In doubly linked list, deleting a node given its reference:', options: ['O(1)', 'O(n)', 'O(log n)', 'Not possible'], correct_answer: 0, explanation: 'With reference and prev pointer, deletion is O(1).' }
    ]
}
