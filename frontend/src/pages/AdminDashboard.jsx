import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { Users, TrendingUp, Award, Clock, BookOpen, BarChart3, Filter, Search } from 'lucide-react'

export default function AdminDashboard() {
    const [students, setStudents] = useState([])
    const [loading, setLoading] = useState(true)
    const [filter, setFilter] = useState({ year: 'all', subject: 'all', performanceRange: 'all' })
    const [searchTerm, setSearchTerm] = useState('')

    useEffect(() => {
        loadStudentData()
    }, [])

    const loadStudentData = async () => {
        try {
            const response = await fetch('/data/students.csv')
            const csvText = await response.text()
            const parsed = parseCSV(csvText)
            setStudents(parsed)
            setLoading(false)
        } catch (error) {
            console.error('Error loading student data:', error)
            setLoading(false)
        }
    }

    const parseCSV = (csvText) => {
        const lines = csvText.trim().split('\n')
        const headers = lines[0].split(',')

        return lines.slice(1).map(line => {
            const values = line.split(',')
            const student = {}
            headers.forEach((header, index) => {
                student[header.trim()] = values[index] ? values[index].trim().replace(/"/g, '') : ''
            })
            return student
        })
    }

    // Calculate analytics
    const analytics = {
        totalStudents: students.length,
        avgCompletion: (students.reduce((acc, s) => {
            const dsa = parseInt(s.subject_progress_dsa) || 0
            const cn = parseInt(s.subject_progress_cn) || 0
            const os = parseInt(s.subject_progress_os) || 0
            const enrolled = s.subjects_enrolled.split(',').length
            return acc + (dsa + cn + os) / enrolled
        }, 0) / students.length).toFixed(1),
        avgQuizScore: (students.reduce((acc, s) => acc + (parseFloat(s.average_quiz_score) || 0), 0) / students.length).toFixed(1),
        totalQuizzes: students.reduce((acc, s) => acc + parseInt(s.topics_completed_count || 0), 0),
        avgTimeSpent: Math.round(students.reduce((acc, s) => acc + parseInt(s.total_time_spent_minutes || 0), 0) / students.length),
        mostEngagedSubject: (() => {
            const subjectCounts = { DSA: 0, CN: 0, OS: 0 }
            students.forEach(s => {
                if (s.subjects_enrolled.includes('DSA')) subjectCounts.DSA++
                if (s.subjects_enrolled.includes('CN')) subjectCounts.CN++
                if (s.subjects_enrolled.includes('OS')) subjectCounts.OS++
            })
            return Object.keys(subjectCounts).reduce((a, b) => subjectCounts[a] > subjectCounts[b] ? a : b)
        })(),
        leastCompletedSubject: (() => {
            const avgProgress = {
                DSA: students.reduce((acc, s) => acc + (parseInt(s.subject_progress_dsa) || 0), 0) / students.filter(s => s.subjects_enrolled.includes('DSA')).length,
                CN: students.reduce((acc, s) => acc + (parseInt(s.subject_progress_cn) || 0), 0) / students.filter(s => s.subjects_enrolled.includes('CN')).length,
                OS: students.reduce((acc, s) => acc + (parseInt(s.subject_progress_os) || 0), 0) / students.filter(s => s.subjects_enrolled.includes('OS')).length,
            }
            return Object.keys(avgProgress).reduce((a, b) => avgProgress[a] < avgProgress[b] ? a : b)
        })()
    }

    // Filter students
    const filteredStudents = students.filter(student => {
        const matchesSearch = student.name.toLowerCase().includes(searchTerm.toLowerCase())
        const matchesYear = filter.year === 'all' || student.year === filter.year
        const matchesSubject = filter.subject === 'all' || student.subjects_enrolled.includes(filter.subject)

        let matchesPerformance = true
        if (filter.performanceRange !== 'all') {
            const avgScore = parseFloat(student.average_quiz_score) || 0
            if (filter.performanceRange === 'low') matchesPerformance = avgScore < 65
            else if (filter.performanceRange === 'medium') matchesPerformance = avgScore >= 65 && avgScore < 80
            else if (filter.performanceRange === 'high') matchesPerformance = avgScore >= 80
        }

        return matchesSearch && matchesYear && matchesSubject && matchesPerformance
    })

    // Generate insights
    const generateInsights = () => {
        const insights = []

        // Struggling students on specific topics
        const topicCounts = {}
        students.forEach(s => {
            const topic = s.current_learning_node
            topicCounts[topic] = (topicCounts[topic] || 0) + 1
        })
        const mostCommonTopic = Object.keys(topicCounts).sort((a, b) => topicCounts[b] - topicCounts[a])[0]
        const count = topicCounts[mostCommonTopic] || 0
        const percentage = ((count / students.length) * 100).toFixed(0)
        insights.push(`${percentage}% of students are currently on "${mostCommonTopic}" topic`)

        // Subject performance comparison
        const dsaAvg = students.filter(s => s.subjects_enrolled.includes('DSA')).reduce((acc, s) => acc + (parseFloat(s.average_quiz_score) || 0), 0) / students.filter(s => s.subjects_enrolled.includes('DSA')).length
        const cnAvg = students.filter(s => s.subjects_enrolled.includes('CN')).reduce((acc, s) => acc + (parseFloat(s.average_quiz_score) || 0), 0) / students.filter(s => s.subjects_enrolled.includes('CN')).length
        const osAvg = students.filter(s => s.subjects_enrolled.includes('OS')).reduce((acc, s) => acc + (parseFloat(s.average_quiz_score) || 0), 0) / students.filter(s => s.subjects_enrolled.includes('OS')).length

        const scores = [
            { name: 'DSA', avg: dsaAvg },
            { name: 'CN', avg: cnAvg },
            { name: 'OS', avg: osAvg }
        ].sort((a, b) => a.avg - b.avg)

        const diff = ((scores[2].avg - scores[0].avg) / scores[0].avg * 100).toFixed(1)
        insights.push(`${scores[0].name} has ${diff}% lower average quiz score than ${scores[2].name}`)

        // Year-wise performance
        const yearPerformance = {}
        students.forEach(s => {
            if (!yearPerformance[s.year]) yearPerformance[s.year] = { total: 0, count: 0 }
            yearPerformance[s.year].total += parseFloat(s.average_quiz_score) || 0
            yearPerformance[s.year].count++
        })
        Object.keys(yearPerformance).forEach(year => {
            yearPerformance[year].avg = yearPerformance[year].total / yearPerformance[year].count
        })

        // Low completion topics
        const lowCompletion = students.filter(s => {
            const avg = (parseInt(s.subject_progress_dsa) + parseInt(s.subject_progress_cn) + parseInt(s.subject_progress_os)) / 3
            return avg < 50
        })
        if (lowCompletion.length > 0) {
            insights.push(`${lowCompletion.length} students (${((lowCompletion.length / students.length) * 100).toFixed(0)}%) have below 50% completion rate`)
        }

        // Most engaged subject
        insights.push(`${analytics.mostEngagedSubject} shows the highest engagement with ${students.filter(s => s.subjects_enrolled.includes(analytics.mostEngagedSubject)).length} enrolled students`)

        return insights
    }

    const insights = students.length > 0 ? generateInsights() : []

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <div className="text-2xl text-blue-600 animate-pulse">Loading Analytics...</div>
            </div>
        )
    }

    return (
        <div className="max-w-7xl mx-auto p-6">
            {/* Header */}
            <div className="mb-8">
                <h1 className="text-4xl font-bold text-white mb-2">Learning Analytics Dashboard</h1>
                <p className="text-gray-400">Institutional insights and student performance monitoring</p>
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
                    icon={TrendingUp}
                    label="Avg Completion"
                    value={`${analytics.avgCompletion}%`}
                    color="bg-green-500"
                />
                <MetricCard
                    icon={Award}
                    label="Avg Quiz Score"
                    value={`${analytics.avgQuizScore}%`}
                    color="bg-purple-500"
                />
                <MetricCard
                    icon={Clock}
                    label="Avg Time Spent"
                    value={`${Math.floor(analytics.avgTimeSpent / 60)}h ${analytics.avgTimeSpent % 60}m`}
                    color="bg-indigo-500"
                />
            </div>

            {/* Additional Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div className="glass-card p-6 bg-white/5 border border-white/10">
                    <div className="flex items-center gap-3 mb-2">
                        <BookOpen className="w-6 h-6 text-green-400" />
                        <h3 className="font-semibold text-white">Most Engaged</h3>
                    </div>
                    <p className="text-3xl font-bold text-green-400">{analytics.mostEngagedSubject}</p>
                    <p className="text-sm text-gray-400 mt-1">Highest enrollment</p>
                </div>

                <div className="glass-card p-6 bg-white/5 border border-white/10">
                    <div className="flex items-center gap-3 mb-2">
                        <BarChart3 className="w-6 h-6 text-orange-400" />
                        <h3 className="font-semibold text-white">Needs Attention</h3>
                    </div>
                    <p className="text-3xl font-bold text-orange-400">{analytics.leastCompletedSubject}</p>
                    <p className="text-sm text-gray-400 mt-1">Lowest avg progress</p>
                </div>

                <div className="glass-card p-6 bg-white/5 border border-white/10">
                    <div className="flex items-center gap-3 mb-2">
                        <Award className="w-6 h-6 text-blue-400" />
                        <h3 className="font-semibold text-white">Total Quizzes</h3>
                    </div>
                    <p className="text-3xl font-bold text-blue-400">{analytics.totalQuizzes}</p>
                    <p className="text-sm text-gray-400 mt-1">Topics completed</p>
                </div>
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
                        value={filter.year}
                        onChange={(e) => setFilter({ ...filter, year: e.target.value })}
                        className="px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:border-blue-400"
                    >
                        <option value="all">All Years</option>
                        <option value="1st">1st Year</option>
                        <option value="2nd">2nd Year</option>
                        <option value="3rd">3rd Year</option>
                        <option value="4th">4th Year</option>
                    </select>

                    <select
                        value={filter.subject}
                        onChange={(e) => setFilter({ ...filter, subject: e.target.value })}
                        className="px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:border-blue-400"
                    >
                        <option value="all">All Subjects</option>
                        <option value="DSA">DSA</option>
                        <option value="CN">Computer Networks</option>
                        <option value="OS">Operating Systems</option>
                    </select>

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
                <h3 className="text-2xl font-bold text-white mb-4">Student Performance</h3>
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead>
                            <tr className="border-b border-white/10">
                                <th className="text-left py-3 px-4 text-gray-300 font-semibold">Name</th>
                                <th className="text-left py-3 px-4 text-gray-300 font-semibold">Year</th>
                                <th className="text-left py-3 px-4 text-gray-300 font-semibold">Dept</th>
                                <th className="text-left py-3 px-4 text-gray-300 font-semibold">Subjects</th>
                                <th className="text-left py-3 px-4 text-gray-300 font-semibold">Avg Progress</th>
                                <th className="text-left py-3 px-4 text-gray-300 font-semibold">Quiz Score</th>
                                <th className="text-left py-3 px-4 text-gray-300 font-semibold">Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredStudents.map((student, idx) => {
                                const avgProgress = ((parseInt(student.subject_progress_dsa) || 0) +
                                    (parseInt(student.subject_progress_cn) || 0) +
                                    (parseInt(student.subject_progress_os) || 0)) / 3
                                const quizScore = parseFloat(student.average_quiz_score) || 0
                                const isActive = new Date(student.last_active_date) > new Date(Date.now() - 5 * 24 * 60 * 60 * 1000)

                                return (
                                    <tr key={idx} className="border-b border-white/5 hover:bg-white/5">
                                        <td className="py-3 px-4 text-white font-medium">{student.name}</td>
                                        <td className="py-3 px-4 text-gray-300">{student.year}</td>
                                        <td className="py-3 px-4 text-gray-300">{student.department}</td>
                                        <td className="py-3 px-4">
                                            <div className="flex gap-1">
                                                {student.subjects_enrolled.split(',').map((subj, i) => (
                                                    <span key={i} className="px-2 py-1 bg-blue-500/20 text-blue-300 text-xs rounded">
                                                        {subj.trim()}
                                                    </span>
                                                ))}
                                            </div>
                                        </td>
                                        <td className="py-3 px-4">
                                            <div className="flex items-center gap-2">
                                                <div className="w-24 h-2 bg-white/10 rounded-full overflow-hidden">
                                                    <div
                                                        className={`h-full ${avgProgress >= 75 ? 'bg-green-500' : avgProgress >= 50 ? 'bg-yellow-500' : 'bg-red-500'}`}
                                                        style={{ width: `${avgProgress}%` }}
                                                    ></div>
                                                </div>
                                                <span className="text-gray-300 text-sm">{avgProgress.toFixed(0)}%</span>
                                            </div>
                                        </td>
                                        <td className="py-3 px-4">
                                            <span className={`font-semibold ${quizScore >= 80 ? 'text-green-400' : quizScore >= 65 ? 'text-yellow-400' : 'text-red-400'}`}>
                                                {quizScore.toFixed(1)}%
                                            </span>
                                        </td>
                                        <td className="py-3 px-4">
                                            <span className={`px-2 py-1 rounded text-xs font-semibold ${isActive ? 'bg-green-500/20 text-green-300' : 'bg-gray-500/20 text-gray-400'}`}>
                                                {isActive ? 'Active' : 'Inactive'}
                                            </span>
                                        </td>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </table>
                </div>
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

