import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Plus, Trash2, Edit2, BookOpen, Code, Network, Cpu, Save, X } from 'lucide-react'

const iconMap = {
    'DSA': Code,
    'CN': Network,
    'OS': Cpu,
    'default': BookOpen
}

export default function ManageCourses() {
    const [courses, setCourses] = useState([])
    const [isAddingCourse, setIsAddingCourse] = useState(false)
    const [editingCourse, setEditingCourse] = useState(null)
    const [newCourse, setNewCourse] = useState({
        code: '',
        name: '',
        description: '',
        total_topics: 0
    })

    useEffect(() => {
        loadCourses()
    }, [])

    const loadCourses = () => {
        const savedCourses = localStorage.getItem('courses')
        if (savedCourses) {
            setCourses(JSON.parse(savedCourses))
        } else {
            // Default courses
            const defaultCourses = [
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
            localStorage.setItem('courses', JSON.stringify(defaultCourses))
            setCourses(defaultCourses)
        }
    }

    const handleAddCourse = () => {
        if (!newCourse.code || !newCourse.name) {
            alert('Please fill in at least Course Code and Name')
            return
        }

        const course = {
            id: Date.now().toString(),
            ...newCourse,
            total_topics: parseInt(newCourse.total_topics) || 0
        }

        const updated = [...courses, course]
        setCourses(updated)
        localStorage.setItem('courses', JSON.stringify(updated))
        setNewCourse({ code: '', name: '', description: '', total_topics: 0 })
        setIsAddingCourse(false)
    }

    const handleDeleteCourse = (id) => {
        if (confirm('Are you sure you want to delete this course?')) {
            const updated = courses.filter(c => c.id !== id)
            setCourses(updated)
            localStorage.setItem('courses', JSON.stringify(updated))
        }
    }

    const handleEditCourse = (course) => {
        setEditingCourse({ ...course })
    }

    const handleSaveEdit = () => {
        const updated = courses.map(c => c.id === editingCourse.id ? editingCourse : c)
        setCourses(updated)
        localStorage.setItem('courses', JSON.stringify(updated))
        setEditingCourse(null)
    }

    return (
        <div className="max-w-6xl mx-auto p-6">
            {/* Header */}
            <div className="mb-8 flex justify-between items-center">
                <div>
                    <h1 className="text-4xl font-bold text-white mb-2">Manage Courses</h1>
                    <p className="text-gray-400">Add, edit, or remove courses from the platform</p>
                </div>
                <motion.button
                    onClick={() => setIsAddingCourse(true)}
                    className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white font-semibold rounded-lg shadow-lg"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                >
                    <Plus className="w-5 h-5" />
                    Add New Course
                </motion.button>
            </div>

            {/* Add Course Form */}
            {isAddingCourse && (
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="glass-card p-6 bg-white/10 border border-white/20 mb-6"
                >
                    <div className="flex justify-between items-center mb-4">
                        <h3 className="text-xl font-bold text-white">Add New Course</h3>
                        <button
                            onClick={() => setIsAddingCourse(false)}
                            className="text-gray-400 hover:text-white"
                        >
                            <X className="w-6 h-6" />
                        </button>
                    </div>

                    <div className="grid grid-cols-2 gap-4 mb-4">
                        <div>
                            <label className="block text-sm font-semibold text-gray-300 mb-2">
                                Course Code *
                            </label>
                            <input
                                type="text"
                                value={newCourse.code}
                                onChange={(e) => setNewCourse({ ...newCourse, code: e.target.value.toUpperCase() })}
                                className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-blue-400"
                                placeholder="e.g., DBMS"
                                maxLength={10}
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-semibold text-gray-300 mb-2">
                                Course Name *
                            </label>
                            <input
                                type="text"
                                value={newCourse.name}
                                onChange={(e) => setNewCourse({ ...newCourse, name: e.target.value })}
                                className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-blue-400"
                                placeholder="e.g., Database Management Systems"
                            />
                        </div>
                    </div>

                    <div className="mb-4">
                        <label className="block text-sm font-semibold text-gray-300 mb-2">
                            Description
                        </label>
                        <textarea
                            value={newCourse.description}
                            onChange={(e) => setNewCourse({ ...newCourse, description: e.target.value })}
                            className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-blue-400"
                            placeholder="Brief description of the course"
                            rows={3}
                        />
                    </div>

                    <div className="mb-4">
                        <label className="block text-sm font-semibold text-gray-300 mb-2">
                            Total Topics
                        </label>
                        <input
                            type="number"
                            value={newCourse.total_topics}
                            onChange={(e) => setNewCourse({ ...newCourse, total_topics: e.target.value })}
                            className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-blue-400"
                            placeholder="0"
                            min="0"
                        />
                    </div>

                    <div className="flex gap-3">
                        <button
                            onClick={handleAddCourse}
                            className="px-6 py-2 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-lg"
                        >
                            Add Course
                        </button>
                        <button
                            onClick={() => setIsAddingCourse(false)}
                            className="px-6 py-2 bg-gray-600 hover:bg-gray-700 text-white font-semibold rounded-lg"
                        >
                            Cancel
                        </button>
                    </div>
                </motion.div>
            )}

            {/* Courses Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {courses.map((course, index) => {
                    const Icon = iconMap[course.code] || iconMap.default
                    const isEditing = editingCourse?.id === course.id

                    return (
                        <motion.div
                            key={course.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                            className="glass-card p-6 bg-white/5 border border-white/10"
                        >
                            {isEditing ? (
                                // Edit Mode
                                <div className="space-y-3">
                                    <input
                                        type="text"
                                        value={editingCourse.code}
                                        onChange={(e) => setEditingCourse({ ...editingCourse, code: e.target.value.toUpperCase() })}
                                        className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded text-white font-bold text-lg"
                                    />
                                    <input
                                        type="text"
                                        value={editingCourse.name}
                                        onChange={(e) => setEditingCourse({ ...editingCourse, name: e.target.value })}
                                        className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded text-white text-sm"
                                    />
                                    <textarea
                                        value={editingCourse.description}
                                        onChange={(e) => setEditingCourse({ ...editingCourse, description: e.target.value })}
                                        className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded text-gray-300 text-sm"
                                        rows={2}
                                    />
                                    <input
                                        type="number"
                                        value={editingCourse.total_topics}
                                        onChange={(e) => setEditingCourse({ ...editingCourse, total_topics: parseInt(e.target.value) })}
                                        className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded text-white text-sm"
                                    />
                                    <div className="flex gap-2">
                                        <button
                                            onClick={handleSaveEdit}
                                            className="flex-1 px-3 py-2 bg-green-600 hover:bg-green-700 text-white rounded flex items-center justify-center gap-1"
                                        >
                                            <Save className="w-4 h-4" />
                                            Save
                                        </button>
                                        <button
                                            onClick={() => setEditingCourse(null)}
                                            className="flex-1 px-3 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded"
                                        >
                                            Cancel
                                        </button>
                                    </div>
                                </div>
                            ) : (
                                // View Mode
                                <>
                                    <div className="flex items-center gap-3 mb-4">
                                        <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
                                            <Icon className="w-6 h-6 text-white" />
                                        </div>
                                        <div>
                                            <h3 className="text-xl font-bold text-white">{course.code}</h3>
                                            <p className="text-xs text-gray-400">{course.total_topics} Topics</p>
                                        </div>
                                    </div>

                                    <h4 className="font-semibold text-white mb-2">{course.name}</h4>
                                    <p className="text-gray-300 text-sm mb-4">{course.description}</p>

                                    <div className="flex gap-2">
                                        <button
                                            onClick={() => handleEditCourse(course)}
                                            className="flex-1 px-3 py-2 bg-blue-600/20 hover:bg-blue-600/30 text-blue-300 rounded flex items-center justify-center gap-1"
                                        >
                                            <Edit2 className="w-4 h-4" />
                                            Edit
                                        </button>
                                        <button
                                            onClick={() => handleDeleteCourse(course.id)}
                                            className="flex-1 px-3 py-2 bg-red-600/20 hover:bg-red-600/30 text-red-300 rounded flex items-center justify-center gap-1"
                                        >
                                            <Trash2 className="w-4 h-4" />
                                            Delete
                                        </button>
                                    </div>
                                </>
                            )}
                        </motion.div>
                    )
                })}
            </div>

            {courses.length === 0 && (
                <div className="text-center py-12">
                    <BookOpen className="w-16 h-16 text-gray-500 mx-auto mb-4" />
                    <p className="text-gray-400 text-lg">No courses yet. Add your first course!</p>
                </div>
            )}
        </div>
    )
}
