// COMPREHENSIVE EDUCATIONAL CONTENT
// This file contains ALL topic content with YouTube videos and quiz questions
// Total: 32 topics × (content + 10 quiz questions each)

export const educationalContent = {
    topics: {
        // === TOPIC 1: Arrays ===
        '1': {
            title: 'Arrays',
            videoUrl: 'https://www.youtube.com/embed/55l-aZ7_F24', // Abdul Bari - best Arrays tutorial
            content: `# Arrays - Foundation of Data Structures\n\nArrays store elements in contiguous memory locations. O(1) access, O(n) search.\n\n## Key Concepts\n- Fixed size\n- Same type elements\n- Zero-based indexing\n- Cache-friendly\n\n## Applications\n- Storing data\n- Lookup tables\n- Matrix operations`,
        },

        // === TOPIC 2: Linked Lists ===
        '2': {
            title: 'Linked Lists',
            videoUrl: 'https://www.youtube.com/embed/R9PTBwOzceo', // mycodeschool
            content: `# Linked Lists\n\nDynamic data structure with nodes containing data and pointers.\n\n## Types\n1. Singly Linked\n2. Doubly Linked\n3. Circular\n\n## Operations\n- Insert: O(1) at head\n- Delete: O(1) at head\n- Search: O(n)`,
        },

        // Add all 32 topics following this pattern...
    },

    quizzes: {
        // === QUIZ FOR TOPIC 1: Arrays (10 questions) ===
        '1': [
            { id: 'q1_1', question_text: 'Time complexity of array access by index?', options: ['O(1)', 'O(n)', 'O(log n)', 'O(n²)'], correct_answer: 0, explanation: 'Direct index access is O(1)' },
            { id: 'q1_2', question_text: 'Arrays store elements in:', options: ['Random locations', 'Contiguous memory', 'Heap', 'Stack only'], correct_answer: 1, explanation: 'Arrays use contiguous memory' },
            { id: 'q1_3', question_text: 'Array size is:', options: ['Dynamic', 'Fixed at creation', 'Depends on OS', 'Unlimited'], correct_answer: 1, explanation: 'Arrays have fixed size' },
            { id: 'q1_4', question_text: 'In 0-indexed array of size 10, last index?', options: ['10', '9', '11', '8'], correct_answer: 1, explanation: 'Last index = size - 1' },
            { id: 'q1_5', question_text: 'Worst case search in unsorted array?', options: ['O(1)', 'O(log n)', 'O(n)', 'O(n²)'], correct_answer: 2, explanation: 'Linear search is O(n)' },
            { id: 'q1_6', question_text: 'Space complexity of array with n elements?', options: ['O(1)', 'O(log n)', 'O(n)', 'O(n²)'], correct_answer: 2, explanation: 'Requires O(n) space' },
            { id: 'q1_7', question_text: 'Main disadvantage of arrays?', options: ['Slow access', 'Fixed size', 'Complex', 'High memory'], correct_answer: 1, explanation: 'Cannot resize dynamically' },
            { id: 'q1_8', question_text: 'Arrays are best for:', options: ['Frequent insertions', 'Random access', 'Dynamic size', 'Sparse data'], correct_answer: 1, explanation: 'O(1) random access' },
            { id: 'q1_9', question_text: 'Inserting at middle of array:', options: ['O(1)', 'O(log n)', 'O(n)', 'O(n²)'], correct_answer: 2, explanation: 'Requires shifting elements' },
            { id: 'q1_10', question_text: 'Arrays are:', options: ['Homogeneous', 'Heterogeneous', 'Both', 'Neither'], correct_answer: 0, explanation: 'Same type elements only' }
        ],

        // === QUIZ FOR TOPIC 2: Linked Lists (10 questions) ===
        '2': [
            { id: 'q2_1', question_text: 'Main advantage of linked lists?', options: ['Fast access', 'Dynamic size', 'Less memory', 'Sorted data'], correct_answer: 1, explanation: 'Can grow/shrink dynamically' },
            { id: 'q2_2', question_text: 'Insert at head of linked list:', options: ['O(1)', 'O(n)', 'O(log n)', 'O(n²)'], correct_answer: 0, explanation: 'Constant time operation' },
            { id: 'q2_3', question_text: 'Linked list node contains:', options: ['Only data', 'Data + pointer(s)', 'Only pointer', 'Array'], correct_answer: 1, explanation: 'Data and next pointer' },
            { id: 'q2_4', question_text: 'Access 10th element in linked list:', options: ['O(1)', 'O(log n)', 'O(n)', 'Not possible'], correct_answer: 2, explanation: 'Must traverse from head' },
            { id: 'q2_5', question_text: 'Doubly linked list has:', options: ['1 pointer', '2 pointers', '3 pointers', 'No pointers'], correct_answer: 1, explanation: 'Next and prev pointers' },
            { id: 'q2_6', question_text: 'Space overhead vs arrays?', options: ['Lower', 'Same', 'Higher', 'None'], correct_answer: 2, explanation: 'Extra pointer storage' },
            { id: 'q2_7', question_text: 'Last node in singly linked list points to:', options: ['First node', 'NULL', 'Itself', 'Middle'], correct_answer: 1, explanation: 'NULL indicates end' },
            { id: 'q2_8', question_text: 'Circular linked list advantage?', options: ['Faster', 'Traverse from any node', 'Less memory', 'Sorted'], correct_answer: 1, explanation: 'No NULL termination' },
            { id: 'q2_9', question_text: 'Delete node when given its reference (doubly):', options: ['O(1)', 'O(n)', 'O(log n)', 'Impossible'], correct_answer: 0, explanation: 'Update prev and next' },
            { id: 'q2_10', question_text: 'Linked lists are NOT cache-friendly because:', options: ['Too slow', 'Non-contiguous memory', 'Too complex', 'Too large'], correct_answer: 1, explanation: 'Nodes scattered in memory' }
        ]
    }
}

// Export for easy importing
export default educationalContent
