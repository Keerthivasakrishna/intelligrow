import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { Users, TrendingUp, Award, Clock, BookOpen, BarChart3, Search, RefreshCw } from 'lucide-react'
import { supabase } from '../supabase'

export default function AdminDashboard() {
    const [students, setStudents] = useState([])
    const [loading, setLoading] = useState(true)
    const [filter, setFilter] = useState({ performanceRange: 'all' })
    const [searchTerm, setSearchTerm] = useState('')

    useEffect(() => {
        loadStudentData()
    }, [])

    const loadStudentData = async () => {
        setLoading(true)
        try {
            // Fetch all users from Supabase
            const { data: profiles, error } = await supabase
                .from('user_stats')
                .select('*')
                .order('created_at', { ascending: false })

            if (error) throw error

            console.log('Loaded students from Supabase:', profiles)
            setStudents(profiles || [])
        } catch (error) {
            console.error('Error loading students:', error)
            // Show error message
            setStudents([])
        } finally {
            setLoading(false)
        }
    }

    // Calculate analytics
    const analytics = students.length > 0 ? {
        totalStudents: students.length,
        avgQuizScore: (students.reduce((acc, s) => acc + (parseFloat(s.avg_quiz_score) || 0), 0) / students.length).toFixed(1),
        totalQuizzes: students.reduce((acc, s) => acc + (parseInt(s.total_quizzes) || 0), 0),
        avgTimeSpent: Math.round(students.reduce((acc, s) => acc + (parseInt(s.total_time_spent_seconds) || 0), 0) / students.length / 60),
        avgXP: Math.round(students.reduce((acc, s) => acc + (parseInt(s.xp) || 0), 0) / students.length)
    } : {
        totalStudents: 0,
        avgQuizScore: 0,
        totalQuizzes: 0,
        avgTimeSpent: 0,
        avgXP: 0
    }

    // Filter students
    const filteredStudents = students.filter(student => {
        const matchesSearch = student.full_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            student.email?.toLowerCase().includes(searchTerm.toLowerCase())

        let matchesPerformance = true
        if (filter.performanceRange !== 'all') {
            const avgScore = parseFloat(student.avg_quiz_score) || 0
            if (filter.performanceRange === 'low') matchesPerformance = avgScore < 65
            else if (filter.performanceRange === 'medium') matchesPerformance = avgScore >= 65 && avgScore < 80
            else if (filter.performanceRange === 'high') matchesPerformance = avgScore >= 80
        }

        return matchesSearch && matchesPerformance
    })

    // Generate insights
    const generateInsights = () => {
        if (students.length === 0) return ['No students registered yet. Users will appear here after signing up!']

        const insights = []

        // Total registered
        insights.push(`${students.length} total students registered in the platform`)

        // Average performance
        const avgScore = parseFloat(analytics.avgQuizScore)
        if (avgScore > 0) {
            insights.push(`Platform average quiz score is ${avgScore.toFixed(1)}%`)
        }

        // Activity level
        const activeStudents = students.filter(s => {
            const lastActive = new Date(s.last_active)
            const daysSince = (Date.now() - lastActive) / (1000 * 60 * 60 * 24)
            return daysSince < 7
        }).length

        if (activeStudents > 0) {
            const percentage = ((activeStudents / students.length) * 100).toFixed(0)
            insights.push(`${percentage}% of students (${activeStudents}/${students.length}) are active in the last 7 days`)
        }

        // Top performers
        const topPerformers = students.filter(s => parseFloat(s.avg_quiz_score) >= 80).length
        if (topPerformers > 0) {
            insights.push(`${topPerformers} students are performing excellently with 80%+ average scores`)
        }

        // Engagement
        if (analytics.totalQuizzes > 0) {
            const quizzesPerStudent = (analytics.totalQuizzes / students.length).toFixed(1)
            insights.push(`Average ${quizzesPerStudent} quizzes completed per student`)
        }

        return insights
    }

    const insights = generateInsights()

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <div className="text-center">
                    <div className="text-2xl text-blue-600 animate-pulse mb-4">Loading Student Data...</div>
                    <p className="text-gray-400">Fetching from Supabase database</p>
                </div>
            </div>
        )
    }

    return (
        <div className="max-w-7xl mx-auto p-6">
            {/* Header */}
            <div className="mb-8 flex justify-between items-center">
                <div>
                    <h1 className="text-4xl font-bold text-white mb-2">Learning Analytics Dashboard</h1>
                    <p className="text-gray-400">Real-time student performance monitoring from Supabase</p>
                </div>
                <button
                    onClick={loadStudentData}
                    className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg"
                >
                    <RefreshCw className="w-4 h-4" />
                    Refresh Data
                </button>
            </div>

            {/* Overview Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                <MetricCard
                    icon={Users}
                    label="Total Students"
                    value={analytics.totalStudents}
                    color="bg-blue-500"
                />
                <MetricCard
                    icon={Award}
                    label="Avg Quiz Score"
                    value={`${analytics.avgQuizScore}%`}
                    color="bg-purple-500"
                />
                <MetricCard
                    icon={TrendingUp}
                    label="Total Quizzes"
                    value={analytics.totalQuizzes}
                    color="bg-green-500"
                />
                <MetricCard
                    icon={Clock}
                    label="Avg Study Time"
                    value={`${analytics.avgTimeSpent} min`}
                    color="bg-indigo-500"
                />
            </div>

            {/* AI-Generated Insights */}
            <div className="glass-card p-6 bg-gradient-to-br from-purple-900/20 to-blue-900/20 border border-purple-500/30 mb-8">
                <h3 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
                    <TrendingUp className="w-6 h-6 text-purple-400" />
                    Performance Insights
                </h3>
                <div className="space-y-3">
                    {insights.map((insight, idx) => (
                        <motion.div
                            key={idx}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: idx * 0.1 }}
                            className="flex items-start gap-3 p-3 bg-white/5 rounded-lg"
                        >
                            <div className="w-2 h-2 bg-purple-400 rounded-full mt-2"></div>
                            <p className="text-gray-300">{insight}</p>
                        </motion.div>
                    ))}
                </div>
            </div>

            {/* Filters and Search */}
            <div className="glass-card p-6 bg-white/5 border border-white/10 mb-6">
                <div className="flex flex-wrap gap-4">
                    <div className="flex-1 min-w-[200px]">
                        <div className="relative">
                            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                            <input
                                type="text"
                                placeholder="Search students..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full pl-10 pr-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-blue-400"
                            />
                        </div>
                    </div>

                    <select
                        value={filter.performanceRange}
                        onChange={(e) => setFilter({ ...filter, performanceRange: e.target.value })}
                        className="px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:border-blue-400"
                    >
                        <option value="all">All Performance</option>
                        <option value="low">&lt; 65%</option>
                        <option value="medium">65-80%</option>
                        <option value="high">&gt; 80%</option>
                    </select>
                </div>
                <p className="text-sm text-gray-400 mt-3">
                    Showing {filteredStudents.length} of {students.length} students
                </p>
            </div>

            {/* Student Table */}
            <div className="glass-card p-6 bg-white/5 border border-white/10">
                <h3 className="text-2xl font-bold text-white mb-4">Registered Students</h3>

                {students.length === 0 ? (
                    <div className="text-center py-12">
                        <Users className="w-16 h-16 text-gray-500 mx-auto mb-4" />
                        <p className="text-gray-400 text-lg mb-2">No students registered yet</p>
                        <p className="text-gray-500 text-sm">Students will appear here after signing up on the platform</p>
                    </div>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead>
                                <tr className="border-b border-white/10">
                                    <th className="text-left py-3 px-4 text-gray-300 font-semibold">Name</th>
                                    <th className="text-left py-3 px-4 text-gray-300 font-semibold">Email</th>
                                    <th className="text-left py-3 px-4 text-gray-300 font-semibold">XP</th>
                                    <th className="text-left py-3 px-4 text-gray-300 font-semibold">Level</th>
                                    <th className="text-left py-3 px-4 text-gray-300 font-semibold">Quizzes</th>
                                    <th className="text-left py-3 px-4 text-gray-300 font-semibold">Avg Score</th>
                                    <th className="text-left py-3 px-4 text-gray-300 font-semibold">Joined</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredStudents.map((student, idx) => {
                                    const quizScore = parseFloat(student.avg_quiz_score) || 0
                                    const joinDate = new Date(student.created_at).toLocaleDateString()

                                    return (
                                        <tr key={student.id || idx} className="border-b border-white/5 hover:bg-white/5">
                                            <td className="py-3 px-4 text-white font-medium">{student.full_name}</td>
                                            <td className="py-3 px-4 text-gray-300">{student.email}</td>
                                            <td className="py-3 px-4 text-yellow-400 font-semibold">{student.xp || 0}</td>
                                            <td className="py-3 px-4 text-blue-400 font-semibold">{student.pet_level || 1}</td>
                                            <td className="py-3 px-4 text-gray-300">{student.total_quizzes || 0}</td>
                                            <td className="py-3 px-4">
                                                <span className={`font-semibold ${quizScore >= 80 ? 'text-green-400' : quizScore >= 65 ? 'text-yellow-400' : 'text-red-400'}`}>
                                                    {quizScore > 0 ? `${quizScore.toFixed(1)}%` : 'N/A'}
                                                </span>
                                            </td>
                                            <td className="py-3 px-4 text-gray-400 text-sm">{joinDate}</td>
                                        </tr>
                                    )
                                })}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </div>
    )
}

function MetricCard({ icon: Icon, label, value, color }) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="glass-card p-6 bg-white/5 border border-white/10"
        >
            <div className="flex items-center gap-3 mb-3">
                <div className={`w-12 h-12 ${color} rounded-lg flex items-center justify-center`}>
                    <Icon className="w-6 h-6 text-white" />
                </div>
                <div>
                    <p className="text-gray-400 text-sm">{label}</p>
                    <p className="text-2xl font-bold text-white">{value}</p>
                </div>
            </div>
        </motion.div>
    )
}
