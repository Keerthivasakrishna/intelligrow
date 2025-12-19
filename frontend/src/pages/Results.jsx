import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Trophy, TrendingUp, Target, Award, ArrowLeft, Brain, Sparkles, Lightbulb, Focus } from 'lucide-react'
import { generateLearningInsights } from '../services/geminiAI'
import { mockTopics } from '../mockData'

export default function Results() {
    const navigate = useNavigate()
    const [stats, setStats] = useState({
        totalQuizzes: 0,
        totalXP: 150,
        petLevel: 2,
        avgScore: 0,
        strengths: [],
        weaknesses: [],
        recentQuizzes: []
    })
    const [aiInsights, setAiInsights] = useState(null)
    const [loadingAI, setLoadingAI] = useState(true)

    useEffect(() => {
        loadStats()
        loadAIInsights()
    }, [])

    const loadStats = () => {
        const isGuest = localStorage.getItem('guestMode') === 'true'

        if (isGuest) {
            const xp = parseInt(localStorage.getItem('guestXP') || '150')
            const level = parseInt(localStorage.getItem('guestLevel') || '2')
            const quizHistory = JSON.parse(localStorage.getItem('quizHistory') || '[]')

            // Calculate stats from quiz history
            const totalQuizzes = quizHistory.length
            const avgScore = totalQuizzes > 0
                ? quizHistory.reduce((sum, quiz) => sum + quiz.percentage, 0) / totalQuizzes
                : 0

            // Format recent quizzes
            const recentQuizzes = quizHistory.slice(-5).reverse().map(quiz => ({
                topic: quiz.topicTitle,
                score: Math.round(quiz.percentage),
                passed: quiz.passed,
                date: new Date(quiz.timestamp).toLocaleDateString()
            }))

            setStats({
                totalQuizzes,
                totalXP: xp,
                petLevel: level,
                avgScore: Math.round(avgScore),
                strengths: [],
                weaknesses: [],
                recentQuizzes
            })
        }
    }

    const loadAIInsights = async () => {
        try {
            const quizHistory = JSON.parse(localStorage.getItem('quizHistory') || '[]')

            if (quizHistory.length === 0) {
                setAiInsights({
                    strengths: ['Complete your first quiz to get personalized insights!'],
                    weaknesses: ['No data available yet'],
                    recommendations: ['Start with fundamental topics like Arrays or Network Fundamentals'],
                    overallPerformance: '🚀 Ready to begin your learning journey!',
                    focusAreas: []
                })
                setLoadingAI(false)
                return
            }

            const insights = await generateLearningInsights(quizHistory)
            setAiInsights(insights)
        } catch (error) {
            console.error('Error loading AI insights:', error)
            setAiInsights({
                strengths: ['Keep practicing to build your skills!'],
                weaknesses: ['More data needed for analysis'],
                recommendations: ['Continue taking quizzes to track your progress'],
                overallPerformance: 'Great start! Keep learning! 💪',
                focusAreas: []
            })
        } finally {
            setLoadingAI(false)
        }
    }

    return (
        <div className="max-w-7xl mx-auto">
            <div className="flex items-center gap-4 mb-8">
                <button
                    onClick={() => navigate('/dashboard')}
                    className="glass-button flex items-center gap-2"
                >
                    <ArrowLeft className="w-4 h-4" />
                    Back to Dashboard
                </button>
                <h1 className="text-4xl font-bold gradient-text">Your Learning Journey</h1>
            </div>

            {/* Stats Cards */}
            <div className="grid md:grid-cols-4 gap-6 mb-8">
                <motion.div
                    className="glass-card p-6"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                >
                    <Trophy className="w-10 h-10 text-primary-500 mb-3" />
                    <div className="text-3xl font-bold text-gray-800">{stats.totalQuizzes}</div>
                    <div className="text-gray-600">Quizzes Completed</div>
                </motion.div>

                <motion.div
                    className="glass-card p-6"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                >
                    <Target className="w-10 h-10 text-pink mb-3" />
                    <div className="text-3xl font-bold text-gray-800">{stats.totalXP} XP</div>
                    <div className="text-gray-600">Total Experience</div>
                </motion.div>

                <motion.div
                    className="glass-card p-6"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                >
                    <Award className="w-10 h-10 text-softblue mb-3" />
                    <div className="text-3xl font-bold text-gray-800">Level {stats.petLevel}</div>
                    <div className="text-gray-600">Pet Level</div>
                </motion.div>

                <motion.div
                    className="glass-card p-6"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                >
                    <TrendingUp className="w-10 h-10 text-primary-600 mb-3" />
                    <div className="text-3xl font-bold text-gray-800">{stats.avgScore}%</div>
                    <div className="text-gray-600">Average Score</div>
                </motion.div>
            </div>

            {/* AI-Powered Insights - THE CORE HEART */}
            <motion.div
                className="glass-card p-8 mb-8 bg-gradient-to-br from-purple-500/10 to-pink-500/10 border-2 border-purple-400/30"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.5 }}
            >
                <div className="flex items-center gap-3 mb-6">
                    <Brain className="w-8 h-8 text-purple-500" />
                    <h2 className="text-3xl font-bold gradient-text">AI-Powered Learning Insights</h2>
                    <Sparkles className="w-6 h-6 text-yellow-400 animate-pulse" />
                </div>

                {loadingAI ? (
                    <div className="text-center py-12">
                        <div className="text-2xl text-gray-500 animate-pulse">🤖 Analyzing your performance...</div>
                    </div>
                ) : aiInsights ? (
                    <div className="space-y-6">
                        {/* Overall Performance */}
                        <div className="glass-card p-6 bg-white/50">
                            <div className="text-xl font-bold mb-2 text-gray-800">Overall Performance</div>
                            <p className="text-2xl text-gray-700">{aiInsights.overallPerformance}</p>
                        </div>

                        {/* Strengths, Weaknesses, Recommendations Grid */}
                        <div className="grid md:grid-cols-2 gap-6">
                            {/* Strengths */}
                            <div className="glass-card p-6 bg-green-50/50">
                                <h3 className="text-xl font-bold mb-4 text-green-700 flex items-center gap-2">
                                    <TrendingUp className="w-5 h-5" />
                                    Your Strengths
                                </h3>
                                <ul className="space-y-2">
                                    {aiInsights.strengths.map((strength, index) => (
                                        <li key={index} className="flex items-start gap-2">
                                            <span className="text-green-600 font-bold">✓</span>
                                            <span className="text-gray-700">{strength}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            {/* Weaknesses */}
                            <div className="glass-card p-6 bg-yellow-50/50">
                                <h3 className="text-xl font-bold mb-4 text-yellow-700 flex items-center gap-2">
                                    <Target className="w-5 h-5" />
                                    Areas to Improve
                                </h3>
                                <ul className="space-y-2">
                                    {aiInsights.weaknesses.map((weakness, index) => (
                                        <li key={index} className="flex items-start gap-2">
                                            <span className="text-yellow-600 font-bold">⚠</span>
                                            <span className="text-gray-700">{weakness}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>

                        {/* Personalized Recommendations */}
                        <div className="glass-card p-6 bg-blue-50/50">
                            <h3 className="text-xl font-bold mb-4 text-blue-700 flex items-center gap-2">
                                <Lightbulb className="w-5 h-5" />
                                Personalized Recommendations
                            </h3>
                            <ul className="space-y-3">
                                {aiInsights.recommendations.map((recommendation, index) => (
                                    <li key={index} className="flex items-start gap-3">
                                        <span className="text-blue-600 font-bold text-xl">→</span>
                                        <span className="text-gray-700 text-lg">{recommendation}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Focus Areas */}
                        {aiInsights.focusAreas && aiInsights.focusAreas.length > 0 && (
                            <div className="glass-card p-6 bg-purple-50/50">
                                <h3 className="text-xl font-bold mb-4 text-purple-700 flex items-center gap-2">
                                    <Focus className="w-5 h-5" />
                                    What to Focus On Next
                                </h3>
                                <div className="flex flex-wrap gap-3">
                                    {aiInsights.focusAreas.map((area, index) => (
                                        <span
                                            key={index}
                                            className="px-4 py-2 bg-purple-500/20 border border-purple-400/50 rounded-full text-gray-700 font-semibold"
                                        >
                                            {area}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                ) : null}
            </motion.div>

            {/* Progress Chart */}
            <div className="glass-card p-8 mb-8">
                <h2 className="text-2xl font-bold mb-6 text-gray-800">Learning Progress</h2>
                <div className="space-y-4">
                    <div>
                        <div className="flex justify-between mb-2">
                            <span className="text-gray-700 font-semibold">Overall Progress</span>
                            <span className="text-gray-600">{Math.min((stats.totalXP / 1000) * 100, 100).toFixed(1)}%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-4">
                            <div
                                className="bg-gradient-to-r from-primary-500 to-primary-600 h-4 rounded-full transition-all duration-500"
                                style={{ width: `${Math.min((stats.totalXP / 1000) * 100, 100)}%` }}
                            />
                        </div>
                    </div>

                    <div>
                        <div className="flex justify-between mb-2">
                            <span className="text-gray-700 font-semibold">Current Level Progress</span>
                            <span className="text-gray-600">{stats.totalXP % 100}/100 XP</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-4">
                            <div
                                className="bg-gradient-to-r from-pink to-softblue h-4 rounded-full transition-all duration-500"
                                style={{ width: `${(stats.totalXP % 100)}%` }}
                            />
                        </div>
                    </div>
                </div>
            </div>

            {/* Recent Activity */}
            <div className="glass-card p-8">
                <h2 className="text-2xl font-bold mb-6 text-gray-800">Recent Quiz Activity</h2>
                {stats.recentQuizzes.length > 0 ? (
                    <div className="space-y-4">
                        {stats.recentQuizzes.map((quiz, index) => (
                            <div key={index} className="flex justify-between items-center p-4 bg-gray-50 rounded-lg">
                                <div>
                                    <div className="font-semibold text-gray-800">{quiz.topic}</div>
                                    <div className="text-sm text-gray-600">{quiz.date}</div>
                                </div>
                                <div className={`text-2xl font-bold ${quiz.passed ? 'text-green-600' : 'text-red-600'}`}>
                                    {quiz.score}%
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-12">
                        <Trophy className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                        <p className="text-gray-500 text-lg">No quiz history yet</p>
                        <p className="text-gray-400">Start taking quizzes to track your progress!</p>
                    </div>
                )}
            </div>
        </div>
    )
}
