// Mock data - Compact hierarchical tree layout

export const mockSubjects = [
    {
        id: '1',
        code: 'DSA',
        name: 'Data Structures & Algorithms',
        description: 'Master fundamental data structures and algorithms',
        total_topics: 12
    },
    {
        id: '2',
        code: 'CN',
        name: 'Computer Networks',
        description: 'Understanding networking protocols and architecture',
        total_topics: 10
    },
    {
        id: '3',
        code: 'OS',
        name: 'Operating Systems',
        description: 'Core concepts of operating systems',
        total_topics: 10
    }
]

// DSA - Hierarchical tree structure (fits in ~1000px width x 700px height)
const dsaTopics = [
    // Level 1 - Basics (Row 1)
    { id: '1', slug: 'arrays', title: 'Arrays', description: 'Foundation', difficulty: 'beginner', status: 'available', prerequisites: [], graph_position: { x: 50, y: 50 }, subject_id: '1' },
    { id: '2', slug: 'linked-lists', title: 'Linked Lists', description: 'Dynamic structure', difficulty: 'beginner', status: 'available', prerequisites: [], graph_position: { x: 300, y: 50 }, subject_id: '1' },
    { id: '7', slug: 'sorting', title: 'Sorting', description: 'Organizing data', difficulty: 'intermediate', status: 'locked', prerequisites: ['1'], graph_position: { x: 550, y: 50 }, subject_id: '1' },
    { id: '9', slug: 'hashing', title: 'Hashing', description: 'Fast retrieval', difficulty: 'intermediate', status: 'locked', prerequisites: ['1'], graph_position: { x: 800, y: 50 }, subject_id: '1' },

    // Level 2 - Linear structures (Row 2)
    { id: '3', slug: 'stacks', title: 'Stacks', description: 'LIFO', difficulty: 'beginner', status: 'locked', prerequisites: ['1'], graph_position: { x: 50, y: 220 }, subject_id: '1' },
    { id: '4', slug: 'queues', title: 'Queues', description: 'FIFO', difficulty: 'beginner', status: 'locked', prerequisites: ['1'], graph_position: { x: 300, y: 220 }, subject_id: '1' },
    { id: '8', slug: 'searching', title: 'Searching', description: 'Finding elements', difficulty: 'intermediate', status: 'locked', prerequisites: ['7'], graph_position: { x: 550, y: 220 }, subject_id: '1' },

    // Level 3 - Non-linear (Row 3)
    { id: '5', slug: 'trees', title: 'Binary Trees', description: 'Hierarchical', difficulty: 'intermediate', status: 'locked', prerequisites: ['2'], graph_position: { x: 175, y: 390 }, subject_id: '1' },
    { id: '11', slug: 'greedy', title: 'Greedy', description: 'Local optima', difficulty: 'intermediate', status: 'locked', prerequisites: ['7'], graph_position: { x: 550, y: 390 }, subject_id: '1' },

    // Level 4 - Advanced (Row 4)
    { id: '6', slug: 'graphs', title: 'Graphs', description: 'Networks', difficulty: 'intermediate', status: 'locked', prerequisites: ['5'], graph_position: { x: 50, y: 560 }, subject_id: '1' },
    { id: '10', slug: 'dynamic-programming', title: 'Dynamic Programming', description: 'Optimization', difficulty: 'advanced', status: 'locked', prerequisites: ['3', '4'], graph_position: { x: 300, y: 560 }, subject_id: '1' },
    { id: '12', slug: 'backtracking', title: 'Backtracking', description: 'Trial & error', difficulty: 'advanced', status: 'locked', prerequisites: ['3'], graph_position: { x: 550, y: 560 }, subject_id: '1' }
]

// CN - Hierarchical tree (fits in ~1000px x 700px)
const cnTopics = [
    // Level 1
    { id: '13', slug: 'network-basics', title: 'Network Fundamentals', description: 'Intro to networking', difficulty: 'beginner', status: 'available', prerequisites: [], graph_position: { x: 300, y: 50 }, subject_id: '2' },

    // Level 2
    { id: '14', slug: 'osi-model', title: 'OSI Model', description: '7-layer architecture', difficulty: 'beginner', status: 'locked', prerequisites: ['13'], graph_position: { x: 50, y: 220 }, subject_id: '2' },
    { id: '20', slug: 'subnetting', title: 'IP & Subnetting', description: 'Address allocation', difficulty: 'intermediate', status: 'locked', prerequisites: ['14'], graph_position: { x: 550, y: 220 }, subject_id: '2' },
    { id: '21', slug: 'wireless', title: 'Wireless Networks', description: 'WiFi & mobile', difficulty: 'intermediate', status: 'locked', prerequisites: ['13'], graph_position: { x: 800, y: 220 }, subject_id: '2' },

    // Level 3
    { id: '15', slug: 'tcp-ip', title: 'TCP/IP', description: 'Protocol stack', difficulty: 'intermediate', status: 'locked', prerequisites: ['14'], graph_position: { x: 175, y: 390 }, subject_id: '2' },
    { id: '18', slug: 'routing', title: 'Routing', description: 'Path selection', difficulty: 'intermediate', status: 'locked', prerequisites: ['15'], graph_position: { x: 425, y: 390 }, subject_id: '2' },
    { id: '22', slug: 'network-devices', title: 'Network Devices', description: 'Routers & switches', difficulty: 'beginner', status: 'locked', prerequisites: ['13'], graph_position: { x: 800, y: 390 }, subject_id: '2' },

    // Level 4
    { id: '16', slug: 'http-https', title: 'HTTP & HTTPS', description: 'Web protocols', difficulty: 'beginner', status: 'locked', prerequisites: ['15'], graph_position: { x: 50, y: 560 }, subject_id: '2' },
    { id: '17', slug: 'dns', title: 'DNS', description: 'Domain names', difficulty: 'intermediate', status: 'locked', prerequisites: ['15'], graph_position: { x: 300, y: 560 }, subject_id: '2' },
    { id: '19', slug: 'network-security', title: 'Security', description: 'Secure communications', difficulty: 'advanced', status: 'locked', prerequisites: ['16'], graph_position: { x: 175, y: 730 }, subject_id: '2' }
]

// OS - Hierarchical tree (fits in ~1000px x 700px)
const osTopics = [
    // Level 1
    { id: '23', slug: 'os-intro', title: 'OS Fundamentals', description: 'Intro to OS', difficulty: 'beginner', status: 'available', prerequisites: [], graph_position: { x: 300, y: 50 }, subject_id: '3' },

    // Level 2
    { id: '24', slug: 'processes', title: 'Processes & Threads', description: 'Execution basics', difficulty: 'beginner', status: 'locked', prerequisites: ['23'], graph_position: { x: 50, y: 220 }, subject_id: '3' },
    { id: '28', slug: 'file-systems', title: 'File Systems', description: 'File organization', difficulty: 'intermediate', status: 'locked', prerequisites: ['23'], graph_position: { x: 550, y: 220 }, subject_id: '3' },
    { id: '32', slug: 'security', title: 'OS Security', description: 'Protection', difficulty: 'advanced', status: 'locked', prerequisites: ['23'], graph_position: { x: 800, y: 220 }, subject_id: '3' },

    // Level 3
    { id: '25', slug: 'cpu-scheduling', title: 'CPU Scheduling', description: 'Process scheduling', difficulty: 'intermediate', status: 'locked', prerequisites: ['24'], graph_position: { x: 50, y: 390 }, subject_id: '3' },
    { id: '26', slug: 'memory-management', title: 'Memory Mgmt', description: 'RAM allocation', difficulty: 'intermediate', status: 'locked', prerequisites: ['24'], graph_position: { x: 300, y: 390 }, subject_id: '3' },
    { id: '29', slug: 'deadlocks', title: 'Deadlocks', description: 'Prevention', difficulty: 'advanced', status: 'locked', prerequisites: ['24'], graph_position: { x: 550, y: 390 }, subject_id: '3' },
    { id: '30', slug: 'synchronization', title: 'Synchronization', description: 'Mutexes', difficulty: 'intermediate', status: 'locked', prerequisites: ['24'], graph_position: { x: 800, y: 390 }, subject_id: '3' },

    // Level 4
    { id: '27', slug: 'virtual-memory', title: 'Virtual Memory', description: 'Paging', difficulty: 'intermediate', status: 'locked', prerequisites: ['26'], graph_position: { x: 175, y: 560 }, subject_id: '3' },
    { id: '31', slug: 'disk-management', title: 'Disk Scheduling', description: 'I/O optimization', difficulty: 'intermediate', status: 'locked', prerequisites: ['28'], graph_position: { x: 550, y: 560 }, subject_id: '3' }
]

export const mockTopics = [...dsaTopics, ...cnTopics, ...osTopics]

// ENHANCED TOPIC CONTENT WITH YOUTUBE VIDEOS
export const mockTopicContent = {
    '1': {
        id: '1',
        title: 'Arrays',
        description: 'Foundation of data structures',
        difficulty: 'beginner',
        videoUrl: 'https://www.youtube.com/embed/55l-aZ7_F24',
        content: `# Arrays - Foundation of Data Structures

## Introduction
An array is a collection of elements of the same type stored in contiguous memory locations.

## Key Properties
- **Fixed Size**: Cannot grow or shrink after creation
- **Index-Based Access**: Elements accessed via zero-based indices  
- **Homogeneous**: All elements same data type
- **Contiguous Memory**: Elements stored adjacently

## Time Complexity
| Operation | Complexity |
|-----------|-----------|
| Access    | O(1)      |
| Search    | O(n)      |
| Insert    | O(n)      |
| Delete    | O(n)      |

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
- Kadane's Algorithm (Maximum Subarray)
- Dutch National Flag Problem`
    },
    '2': {
        id: '2',
        title: 'Linked Lists',
        description: 'Dynamic linear data structure',
        difficulty: 'beginner',
        videoUrl: 'https://www.youtube.com/embed/R9PTBwOzceo',
        content: `# Linked Lists - Dynamic Structure

## Introduction
Linear collection of nodes where each node contains data and a reference to the next node.

## Types
1. **Singly Linked**: next pointer only
2. **Doubly Linked**: next + prev pointers
3. **Circular**: last node points to first

## Node Structure
Each node contains:
- Data field
- Pointer to next node

## Time Complexity
| Operation | Complexity |
|-----------|-----------|
| Insert at head | O(1) |
| Insert at tail | O(n) |
| Delete head | O(1) |
| Search | O(n) |

## Advantages
✓ Dynamic size
✓ Efficient insertions/deletions at known positions
✓ No wasted memory
✓ Easy to implement stacks/queues

## Disadvantages
✗ No random access
✗ Extra memory for pointers
✗ Not cache-friendly

## Applications
- Implement stacks and queues
- Browser history (back/forward)
- Image viewer (previous/next)
- Music playlists`
    },
    '13': {  // Computer Networks - Network Fundamentals
        id: '13',
        title: 'Network Fundamentals',
        description: 'Introduction to computer networking',
        difficulty: 'beginner',
        videoUrl: 'https://www.youtube.com/embed/IPvYjXCsTg8',
        content: `# Network Fundamentals - Introduction to Networking

## Introduction
Computer networks enable communication between devices, allowing data exchange and resource sharing.

## Types of Networks
1. **LAN** (Local Area Network): Small geographic area
2. **WAN** (Wide Area Network): Large geographic area  
3. **MAN** (Metropolitan Area Network): City-wide
4. **PAN** (Personal Area Network): Very small range

## Network Topologies
- **Star**: Central hub
- **Bus**: Single cable
- **Ring**: Circular connection
- **Mesh**: Every device connected

## Key Concepts
- **Protocol**: Rules for communication
- **Bandwidth**: Data transfer capacity
- **Latency**: Communication delay
- **Packet**: Unit of data

## Network Models
| Model | Layers |
|-------|--------|
| OSI   | 7      |
| TCP/IP| 4      |

## Advantages
✓ Resource sharing
✓ Data communication
✓ Centralized data
✓ Cost effective

## Disadvantages
✗ Security risks
✗ Requires maintenance
✗ Initial setup cost

## Real-World Applications
- Internet
- Email systems
- Cloud computing
- Video conferencing`
    },
    '23': {  // Operating Systems - OS Fundamentals
        id: '23',
        title: 'OS Fundamentals',
        description: 'Introduction to Operating Systems',
        difficulty: 'beginner',
        videoUrl: 'https://www.youtube.com/embed/vBURTt97EkA',
        content: `# OS Fundamentals - Introduction to Operating Systems

## Introduction
An Operating System is system software that manages computer hardware and software resources.

## Functions of OS
1. **Process Management**: Handle multiple processes
2. **Memory Management**: Allocate RAM
3. **File Management**: Organize files
4. **Device Management**: Control I/O devices
5. **Security**: Protect system

## Types of OS
- **Batch OS**: Groups similar jobs
- **Time-Sharing OS**: Multiple users
- **Distributed OS**: Multiple machines
- **Real-Time OS**: Time-critical tasks
- **Mobile OS**: Smartphones/tablets

## Components
| Component | Purpose |
|-----------|--------|
| Kernel    | Core functions |
| Shell     | User interface |
| File System | Data organization |

## OS Services
✓ Program execution
✓ I/O operations
✓ File system manipulation
✓ Error detection
✓ Resource allocation

## Popular Operating Systems
- **Windows**: User-friendly GUI
- **Linux**: Open source
- **macOS**: Apple ecosystem
- **Android**: Mobile devices
- **iOS**: Apple mobile

## Key Concepts
- **Multitasking**: Multiple programs run simultaneously
- **Multiprocessing**: Multiple CPUs
- **Virtualization**: Virtual machines
- **Scheduling**: Decide which process runs when`
    }
}

// COMPREHENSIVE QUIZ QUESTIONS - 10 per topic
export const mockQuizQuestions = {
    '1': [
        { id: '1', question_text: 'Time complexity of accessing an element in an array by index?', options: ['O(1)', 'O(n)', 'O(log n)', 'O(n²)'], correct_answer: 0, explanation: 'Arrays provide constant time O(1) access via index.' },
        { id: '2', question_text: 'Arrays store elements in:', options: ['Random locations', 'Contiguous memory', 'Heap', 'Stack only'], correct_answer: 1, explanation: 'Arrays use contiguous memory allocation.' },
        { id: '3', question_text: 'Array size is:', options: ['Dynamic', 'Fixed at creation', 'Depends on OS', 'Unlimited'], correct_answer: 1, explanation: 'Arrays have fixed size once created.' },
        { id: '4', question_text: 'In 0-indexed array of size 10, last index is:', options: ['10', '9', '11', '8'], correct_answer: 1, explanation: 'Last index = size - 1 = 9.' },
        { id: '5', question_text: 'Worst case search in unsorted array:', options: ['O(1)', 'O(log n)', 'O(n)', 'O(n²)'], correct_answer: 2, explanation: 'Linear search takes O(n) time.' },
        { id: '6', question_text: 'Space complexity of array with n elements:', options: ['O(1)', 'O(log n)', 'O(n)', 'O(n²)'], correct_answer: 2, explanation: 'Requires O(n) space for n elements.' },
        { id: '7', question_text: 'Main disadvantage of arrays:', options: ['Slow access', 'Fixed size', 'Complex', 'High memory'], correct_answer: 1, explanation: 'Cannot resize dynamically.' },
        { id: '8', question_text: 'Arrays are best for:', options: ['Frequent insertions', 'Random access', 'Dynamic size', 'Sparse data'], correct_answer: 1, explanation: 'O(1) random access is the strength.' },
        { id: '9', question_text: 'Inserting at middle of array:', options: ['O(1)', 'O(log n)', 'O(n)', 'O(n²)'], correct_answer: 2, explanation: 'Requires shifting all subsequent elements.' },
        { id: '10', question_text: 'Arrays are:', options: ['Homogeneous', 'Heterogeneous', 'Both', 'Neither'], correct_answer: 0, explanation: 'All elements must be same type.' }
    ],
    '2': [
        { id: '11', question_text: 'Main advantage of linked lists over arrays?', options: ['Faster access', 'Dynamic size', 'Less memory', 'Sorted data'], correct_answer: 1, explanation: 'Can grow/shrink dynamically.' },
        { id: '12', question_text: 'Insert at head of linked list:', options: ['O(1)', 'O(n)', 'O(log n)', 'O(n²)'], correct_answer: 0, explanation: 'Constant time operation.' },
        { id: '13', question_text: 'Linked list node contains:', options: ['Only data', 'Data + pointer(s)', 'Only pointer', 'Array'], correct_answer: 1, explanation: 'Data and next pointer minimum.' },
        { id: '14', question_text: 'Access 10th element in linked list:', options: ['O(1)', 'O(log n)', 'O(n)', 'Not possible'], correct_answer: 2, explanation: 'Must traverse from head.' },
        { id: '15', question_text: 'Doubly linked list has:', options: ['1 pointer per node', '2 pointers per node', '3 pointers', 'No pointers'], correct_answer: 1, explanation: 'Next and prev pointers.' },
        { id: '16', question_text: 'Space overhead vs arrays?', options: ['Lower', 'Same', 'Higher', 'None'], correct_answer: 2, explanation: 'Extra pointer storage needed.' },
        { id: '17', question_text: 'Last node in singly linked list points to:', options: ['First node', 'NULL', 'Itself', 'Middle'], correct_answer: 1, explanation: 'NULL indicates end of list.' },
        { id: '18', question_text: 'Circular linked list advantage?', options: ['Faster', 'Traverse from any node', 'Less memory', 'Sorted'], correct_answer: 1, explanation: 'No NULL termination needed.' },
        { id: '19', question_text: 'Delete node when given reference (doubly):', options: ['O(1)', 'O(n)', 'O(log n)', 'Impossible'], correct_answer: 0, explanation: 'Update prev and next directly.' },
        { id: '20', question_text: 'Linked lists are NOT cache-friendly because:', options: ['Too slow', 'Non-contiguous memory', 'Too complex', 'Too large'], correct_answer: 1, explanation: 'Nodes scattered in memory.' }
    ],
    '13': [  // Network Fundamentals
        { id: '121', question_text: 'What does LAN stand for?', options: ['Local Area Network', 'Large Area Network', 'Long Access Network', 'Limited Area Node'], correct_answer: 0, explanation: 'LAN is Local Area Network covering small geographic area.' },
        { id: '122', question_text: 'Which topology has a central hub?', options: ['Bus', 'Ring', 'Star', 'Mesh'], correct_answer: 2, explanation: 'Star topology connects all devices to a central hub.' },
        { id: '123', question_text: 'How many layers in OSI model?', options: ['4', '5', '7', '10'], correct_answer: 2, explanation: 'OSI model has 7 layers.' },
        { id: '124', question_text: 'What is a protocol?', options: ['Hardware device', 'Rules for communication', 'Software program', 'Network cable'], correct_answer: 1, explanation: 'Protocol defines rules for data communication.' },
        { id: '125', question_text: 'WAN covers:', options: ['Small area', 'Large geographic area', 'Single room', 'One building'], correct_answer: 1, explanation: 'WAN (Wide Area Network) spans large areas.' },
        { id: '126', question_text: 'Unit of data transmitted over network:', options: ['Byte', 'Packet', 'Frame', 'Segment'], correct_answer: 1, explanation: 'Data is transmitted in packets.' },
        { id: '127', question_text: 'Bandwidth refers to:', options: ['Wire thickness', 'Data transfer capacity', 'Network speed only', 'Cable length'], correct_answer: 1, explanation: 'Bandwidth is the capacity for data transfer.' },
        { id: '128', question_text: 'Which is NOT a network type?', options: ['LAN', 'WAN', 'MAN', 'CAN'], correct_answer: 3, explanation: 'CAN is not a standard network type.' },
        { id: '129', question_text: 'Latency in networking means:', options: ['Bandwidth', 'Communication delay', 'Data size', 'Network name'], correct_answer: 1, explanation: 'Latency is the time delay in communication.' },
        { id: '130', question_text: 'Mesh topology advantage:', options: ['Cheapest', 'High redundancy', 'Simple setup', 'Least wiring'], correct_answer: 1, explanation: 'Mesh provides high redundancy with multiple paths.' }
    ],
    '23': [  // OS Fundamentals  
        { id: '221', question_text: 'What is the core part of an OS?', options: ['Shell', 'Kernel', 'File system', 'GUI'], correct_answer: 1, explanation: 'Kernel is the core component managing resources.' },
        { id: '222', question_text: 'Which OS is open source?', options: ['Windows', 'macOS', 'Linux', 'iOS'], correct_answer: 2, explanation: 'Linux is open source and free.' },
        { id: '223', question_text: 'Process management involves:', options: ['Only creating processes', 'Handling multiple processes', 'Deleting files', 'Network config'], correct_answer: 1, explanation: 'Process management handles creation, scheduling, and termination.' },
        { id: '224', question_text: 'Which is NOT an OS function?', options: ['Memory management', 'File management', 'Compiling code', 'Device management'], correct_answer: 2, explanation: 'Compiling is done by compilers, not OS core function.' },
        { id: '225', question_text: 'Time-sharing OS allows:', options: ['One user', 'Multiple users simultaneously', 'No multitasking', 'Batch processing only'], correct_answer: 1, explanation: 'Time-sharing enables multiple concurrent users.' },
        { id: '226', question_text: 'Real-time OS is used for:', options: ['Gaming', 'Time-critical tasks', 'Web browsing', 'Social media'], correct_answer: 1, explanation: 'Real-time OS handles time-sensitive operations.' },
        { id: '227', question_text: 'Which manages RAM allocation?', options: ['File system', 'Memory management', 'Process scheduler', 'Device driver'], correct_answer: 1, explanation: 'Memory management allocates and deallocates RAM.' },
        { id: '228', question_text: 'Mobile OS example:', options: ['Windows Server', 'Android', 'Ubuntu Server', 'DOS'], correct_answer: 1, explanation: 'Android is designed for mobile devices.' },
        { id: '229', question_text: 'Multitasking means:', options: ['Multiple CPUs', 'Multiple programs run together', 'Fast processor', 'Large storage'], correct_answer: 1, explanation: 'Multitasking runs multiple programs simultaneously.' },
        { id: '230', question_text: 'Shell provides:', options: ['Memory', 'User interface', 'Storage', 'Network'], correct_answer: 1, explanation: 'Shell is the user interface to interact with OS.' }
    ]
}

export const mockStats = {
    xp: 150,
    pet_level: 2,
    xp_to_next_level: 50,
    total_completed: 0,
    strengths: [],
    weaknesses: []
}
