import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowLeft, Brain, TrendingUp, Target, Lightbulb, BookOpen, CheckCircle, XCircle, BarChart3, Clock, Star, Zap, Award, AlertTriangle } from 'lucide-react'
import { generateSubjectAnalysis } from '../services/geminiAI'

export default function SubjectAnalytics() {
    const { subjectCode } = useParams()
    const navigate = useNavigate()
    const [analysis, setAnalysis] = useState(null)
    const [loading, setLoading] = useState(true)
    const [stats, setStats] = useState({
        totalQuizzes: 0,
        avgScore: 0,
        topicsAttempted: 0
    })

    useEffect(() => {
        loadSubjectAnalysis()
    }, [subjectCode])

    const loadSubjectAnalysis = async () => {
        try {
            const quizHistory = JSON.parse(localStorage.getItem('quizHistory') || '[]')

            // Filter by subject
            const subjectQuizzes = quizHistory.filter(quiz => {
                const topicId = quiz.topicId
                if (subjectCode === 'DSA') return topicId >= 1 && topicId <= 12
                if (subjectCode === 'CN') return topicId >= 13 && topicId <= 22
                if (subjectCode === 'OS') return topicId >= 23 && topicId <= 32
                return false
            })

            // Calculate stats
            const totalQuizzes = subjectQuizzes.length
            const avgScore = totalQuizzes > 0
                ? Math.round(subjectQuizzes.reduce((sum, q) => sum + q.percentage, 0) / totalQuizzes)
                : 0
            const topicsAttempted = new Set(subjectQuizzes.map(q => q.topicId)).size

            setStats({ totalQuizzes, avgScore, topicsAttempted })

            // Get AI analysis
            const insights = await generateSubjectAnalysis(quizHistory, subjectCode)
            console.log('AI Analysis:', insights) // Debug log
            setAnalysis(insights)
        } catch (error) {
            console.error('Error loading subject analysis:', error)
        } finally {
            setLoading(false)
        }
    }

    const getSubjectName = () => {
        const names = {
            'DSA': 'Data Structures & Algorithms',
            'CN': 'Computer Networks',
            'OS': 'Operating Systems'
        }
        return names[subjectCode] || subjectCode
    }

    const getSubjectColor = () => {
        const colors = {
            'DSA': 'from-purple-500 to-pink-500',
            'CN': 'from-blue-500 to-cyan-500',
            'OS': 'from-green-500 to-emerald-500'
        }
        return colors[subjectCode] || 'from-purple-500 to-pink-500'
    }

    return (
        <div className="max-w-7xl mx-auto">
            {/* Header */}
            <div className="flex items-center gap-4 mb-8">
                <button
                    onClick={() => navigate(`/subjects/${subjectCode}`)}
                    className="glass-button flex items-center gap-2"
                >
                    <ArrowLeft className="w-4 h-4" />
                    Back to {subjectCode}
                </button>
                <h1 className="text-4xl font-bold gradient-text">
                    {getSubjectName()} - Extensive AI Analysis
                </h1>
            </div>

            {/* Stats Overview */}
            <div className="grid md:grid-cols-3 gap-6 mb-8">
                <motion.div
                    className="glass-card p-6"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                >
                    <BarChart3 className="w-10 h-10 text-primary-500 mb-3" />
                    <div className="text-3xl font-bold text-gray-800">{stats.totalQuizzes}</div>
                    <div className="text-gray-600">Quizzes Taken</div>
                </motion.div>

                <motion.div
                    className="glass-card p-6"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                >
                    <Target className="w-10 h-10 text-pink mb-3" />
                    <div className="text-3xl font-bold text-gray-800">{stats.avgScore}%</div>
                    <div className="text-gray-600">Average Score</div>
                </motion.div>

                <motion.div
                    className="glass-card p-6"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                >
                    <BookOpen className="w-10 h-10 text-softblue mb-3" />
                    <div className="text-3xl font-bold text-gray-800">{stats.topicsAttempted}</div>
                    <div className="text-gray-600">Topics Explored</div>
                </motion.div>
            </div>

            {/* AI Analysis Section */}
            {loading ? (
                <div className="glass-card p-12 text-center">
                    <Brain className="w-16 h-16 text-purple-500 mx-auto mb-4 animate-pulse" />
                    <p className="text-2xl text-gray-600">🤖 AI is performing deep analysis...</p>
                    <p className="text-gray-500 mt-2">Analyzing every question, identifying patterns, creating personalized plan</p>
                </div>
            ) : analysis ? (
                <div className="space-y-6">
                    {/* Overall Performance */}
                    <motion.div
                        className={`glass-card p-8 bg-gradient-to-br ${getSubjectColor()}/10 border-2`}
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                    >
                        <div className="flex items-center gap-3 mb-4">
                            <Brain className="w-8 h-8 text-purple-600" />
                            <h2 className="text-2xl font-bold text-gray-800">AI Performance Assessment</h2>
                        </div>
                        <p className="text-xl text-gray-700 leading-relaxed">{analysis.overallPerformance}</p>
                    </motion.div>

                    {/* Progress Metrics (NEW!) */}
                    {analysis.progressMetrics && (
                        <div className="glass-card p-8 bg-indigo-50/50">
                            <h3 className="text-2xl font-bold mb-6 text-indigo-700 flex items-center gap-2">
                                <BarChart3 className="w-6 h-6" />
                                Progress Metrics & Mastery Level
                            </h3>
                            <div className="grid md:grid-cols-2 gap-6">
                                <div>
                                    <p className="text-lg font-semibold text-gray-800 mb-2">Current Mastery:</p>
                                    <p className="text-gray-700">{analysis.progressMetrics.currentMastery}</p>
                                </div>
                                <div>
                                    <p className="text-lg font-semibold text-gray-800 mb-2">Projected Improvement:</p>
                                    <p className="text-gray-700">{analysis.progressMetrics.projectedImprovement}</p>
                                </div>
                            </div>
                            {analysis.progressMetrics.milestones && analysis.progressMetrics.milestones.length > 0 && (
                                <div className="mt-4">
                                    <p className="text-lg font-semibold text-gray-800 mb-2">Milestones to Hit:</p>
                                    <ul className="space-y-2">
                                        {analysis.progressMetrics.milestones.map((milestone, idx) => (
                                            <li key={idx} className="flex items-start gap-2">
                                                <Star className="w-5 h-5 text-yellow-500 flex-shrink-0 mt-0.5" />
                                                <span className="text-gray-700">{milestone}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            )}
                        </div>
                    )}

                    {/* Learning Patterns (NEW!) */}
                    {analysis.learningPatterns && (
                        <div className="glass-card p-8 bg-purple-50/50">
                            <h3 className="text-2xl font-bold mb-6 text-purple-700 flex items-center gap-2">
                                <Zap className="w-6 h-6" />
                                Your Learning Patterns
                            </h3>
                            <div className="grid md:grid-cols-2 gap-6">
                                <div>
                                    <p className="text-lg font-semibold text-gray-800 mb-3">Learning Strengths:</p>
                                    <ul className="space-y-2">
                                        {analysis.learningPatterns.strengths?.map((strength, idx) => (
                                            <li key={idx} className="flex items-start gap-2">
                                                <CheckCircle className="w-5 h-5 text-purple-600 flex-shrink-0 mt-0.5" />
                                                <span className="text-gray-700">{strength}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                                <div>
                                    <p className="text-lg font-semibold text-gray-800 mb-3">Challenges:</p>
                                    <ul className="space-y-2">
                                        {analysis.learningPatterns.challenges?.map((challenge, idx) => (
                                            <li key={idx} className="flex items-start gap-2">
                                                <AlertTriangle className="w-5 h-5 text-orange-600 flex-shrink-0 mt-0.5" />
                                                <span className="text-gray-700">{challenge}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                            <div className="mt-6 p-4 bg-white/50 rounded-lg">
                                <p className="text-lg font-semibold text-gray-800 mb-2">Optimal Learning Approach:</p>
                                <p className="text-gray-700">{analysis.learningPatterns.optimalApproach}</p>
                            </div>
                        </div>
                    )}

                    {/* Detailed Topic Breakdown */}
                    {analysis.topicBreakdown && analysis.topicBreakdown.length > 0 && (
                        <div className="glass-card p-8">
                            <h3 className="text-2xl font-bold mb-6 text-gray-800 flex items-center gap-2">
                                <BarChart3 className="w-6 h-6 text-primary-600" />
                                Extremely Detailed Topic Analysis
                            </h3>
                            <div className="space-y-6">
                                {analysis.topicBreakdown.map((topic, index) => (
                                    <div key={index} className="border-2 border-primary-300 rounded-lg p-6 bg-white/50">
                                        <div className="flex justify-between items-start mb-4">
                                            <div>
                                                <h4 className="text-2xl font-bold text-gray-800">{topic.topic}</h4>
                                                <p className="text-gray-600 mt-1">{topic.details}</p>
                                            </div>
                                            <div className="flex items-center gap-3">
                                                <span className={`px-4 py-2 rounded-full text-sm font-bold ${topic.status === 'mastered' || topic.status === 'strong' ? 'bg-green-100 text-green-700' :
                                                        topic.status === 'proficient' || topic.status === 'moderate' ? 'bg-yellow-100 text-yellow-700' :
                                                            'bg-red-100 text-red-700'
                                                    }`}>
                                                    {topic.status?.toUpperCase()}
                                                </span>
                                                <span className="text-3xl font-bold text-gray-800">{topic.score}%</span>
                                            </div>
                                        </div>

                                        {/* New detailed fields */}
                                        {topic.specificConcepts && topic.specificConcepts.length > 0 && (
                                            <div className="mb-4">
                                                <p className="font-semibold text-gray-800 mb-2">Concepts Tested:</p>
                                                <div className="flex flex-wrap gap-2">
                                                    {topic.specificConcepts.map((concept, idx) => (
                                                        <span key={idx} className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm">
                                                            {concept}
                                                        </span>
                                                    ))}
                                                </div>
                                            </div>
                                        )}

                                        {topic.masteredAspects && topic.masteredAspects.length > 0 && (
                                            <div className="mb-4">
                                                <p className="font-semibold text-green-700 mb-2">✓ What You Mastered:</p>
                                                <ul className="space-y-1">
                                                    {topic.masteredAspects.map((aspect, idx) => (
                                                        <li key={idx} className="text-gray-700 ml-4">• {aspect}</li>
                                                    ))}
                                                </ul>
                                            </div>
                                        )}

                                        {topic.needsWork && topic.needsWork.length > 0 && (
                                            <div className="mb-4">
                                                <p className="font-semibold text-orange-700 mb-2">⚠ Needs More Work:</p>
                                                <ul className="space-y-1">
                                                    {topic.needsWork.map((need, idx) => (
                                                        <li key={idx} className="text-gray-700 ml-4">• {need}</li>
                                                    ))}
                                                </ul>
                                            </div>
                                        )}

                                        {topic.nextSteps && (
                                            <div className="mt-4 p-3 bg-blue-50 rounded-lg">
                                                <p className="font-semibold text-blue-800 mb-1">→ Next Steps:</p>
                                                <p className="text-gray-700">{topic.nextSteps}</p>
                                            </div>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Detailed Strengths (NEW!) */}
                    {analysis.detailedStrengths && analysis.detailedStrengths.length > 0 && (
                        <div className="glass-card p-8 bg-green-50/50">
                            <h3 className="text-2xl font-bold mb-6 text-green-700 flex items-center gap-2">
                                <Award className="w-6 h-6" />
                                Detailed Strength Analysis
                            </h3>
                            <div className="space-y-4">
                                {analysis.detailedStrengths.map((strength, idx) => (
                                    <div key={idx} className="p-4 bg-white rounded-lg border-l-4 border-green-500">
                                        <div className="flex justify-between items-start mb-2">
                                            <h4 className="text-lg font-bold text-gray-800">{strength.topic}</h4>
                                            <span className="text-2xl font-bold text-green-600">{strength.score}%</span>
                                        </div>
                                        <p className="text-gray-700 mb-2"><strong>Insight:</strong> {strength.insight}</p>
                                        <p className="text-gray-700"><strong>Cognitive Strength:</strong> {strength.cognitiveStrength}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Detailed Weaknesses (NEW!) */}
                    {analysis.detailedWeaknesses && analysis.detailedWeaknesses.length > 0 && (
                        <div className="glass-card p-8 bg-red-50/50">
                            <h3 className="text-2xl font-bold mb-6 text-red-700 flex items-center gap-2">
                                <AlertTriangle className="w-6 h-6" />
                                Root-Cause Weakness Analysis
                            </h3>
                            <div className="space-y-4">
                                {analysis.detailedWeaknesses.map((weakness, idx) => (
                                    <div key={idx} className="p-4 bg-white rounded-lg border-l-4 border-red-500">
                                        <div className="flex justify-between items-start mb-2">
                                            <h4 className="text-lg font-bold text-gray-800">{weakness.topic}</h4>
                                            <div className="flex items-center gap-2">
                                                <span className={`px-3 py-1 rounded-full text-xs font-bold ${weakness.priority === 'high' ? 'bg-red-600 text-white' :
                                                        weakness.priority === 'medium' ? 'bg-orange-500 text-white' :
                                                            'bg-yellow-500 text-white'
                                                    }`}>
                                                    {weakness.priority?.toUpperCase()} PRIORITY
                                                </span>
                                                <span className="text-2xl font-bold text-red-600">{weakness.score}%</span>
                                            </div>
                                        </div>
                                        <p className="text-gray-700 mb-2"><strong>Root Cause:</strong> {weakness.rootCause}</p>
                                        <p className="text-gray-700"><strong>Impact:</strong> {weakness.impact}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Conceptual Gaps - Enhanced */}
                    {analysis.conceptualGaps && analysis.conceptualGaps.length > 0 && (
                        <div className="glass-card p-8 bg-orange-50/50">
                            <h3 className="text-2xl font-bold mb-6 text-orange-700 flex items-center gap-2">
                                <Lightbulb className="w-6 h-6" />
                                Conceptual Gaps - Deep Analysis
                            </h3>
                            <div className="space-y-4">
                                {analysis.conceptualGaps.map((gap, idx) => (
                                    typeof gap === 'object' ? (
                                        <div key={idx} className="p-4 bg-white rounded-lg border-l-4 border-orange-500">
                                            <div className="flex justify-between items-start mb-2">
                                                <h4 className="text-lg font-bold text-gray-800">{gap.concept}</h4>
                                                <span className={`px-3 py-1 rounded-full text-xs font-bold ${gap.severity === 'critical' ? 'bg-red-600 text-white' :
                                                        gap.severity === 'important' ? 'bg-orange-500 text-white' :
                                                            'bg-yellow-500 text-white'
                                                    }`}>
                                                    {gap.severity?.toUpperCase()}
                                                </span>
                                            </div>
                                            <p className="text-gray-700 mb-2"><strong>Why it matters:</strong> {gap.explanation}</p>
                                            <p className="text-gray-700 mb-2"><strong>Fill Strategy:</strong> {gap.fillStrategy}</p>
                                            {gap.relatedTopics && gap.relatedTopics.length > 0 && (
                                                <div className="mt-2">
                                                    <p className="text-sm text-gray-600">Affects: {gap.relatedTopics.join(', ')}</p>
                                                </div>
                                            )}
                                        </div>
                                    ) : (
                                        <div key={idx} className="flex items-start gap-2">
                                            <span className="text-orange-600 font-bold">•</span>
                                            <span className="text-gray-700">{gap}</span>
                                        </div>
                                    )
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Detailed Recommendations (NEW!) */}
                    {analysis.detailedRecommendations && analysis.detailedRecommendations.length > 0 && (
                        <div className="glass-card p-8 bg-blue-50/50">
                            <h3 className="text-2xl font-bold mb-6 text-blue-700 flex items-center gap-2">
                                <Lightbulb className="w-6 h-6" />
                                Detailed Action Plan - Prioritized
                            </h3>
                            <div className="space-y-6">
                                {analysis.detailedRecommendations.map((rec, idx) => (
                                    <div key={idx} className="p-6 bg-white rounded-lg border-2 border-blue-300">
                                        <div className="flex items-start gap-4 mb-4">
                                            <span className="text-3xl font-bold text-blue-600">#{rec.priority}</span>
                                            <div className="flex-1">
                                                <h4 className="text-xl font-bold text-gray-800 mb-2">{rec.action}</h4>
                                                <p className="text-gray-700 mb-2"><strong>Why:</strong> {rec.why}</p>
                                                <p className="text-gray-700 mb-2"><strong>How:</strong> {rec.how}</p>
                                                {rec.resources && (
                                                    <p className="text-gray-700 mb-2"><strong>Resources:</strong> {rec.resources}</p>
                                                )}
                                                {rec.timeEstimate && (
                                                    <p className="text-gray-600 flex items-center gap-2">
                                                        <Clock className="w-4 h-4" />
                                                        <strong>Time:</strong> {rec.timeEstimate}
                                                    </p>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Comprehensive Study Plan (NEW!) */}
                    {analysis.comprehensiveStudyPlan && (
                        <div className="glass-card p-8 bg-purple-50/50">
                            <h3 className="text-2xl font-bold mb-6 text-purple-700 flex items-center gap-2">
                                <BookOpen className="w-6 h-6" />
                                Comprehensive 4-Week Study Plan
                            </h3>

                            {/* Immediate Actions */}
                            {analysis.comprehensiveStudyPlan.immediate && (
                                <div className="mb-6 p-6 bg-yellow-50 rounded-lg border-2 border-yellow-400">
                                    <h4 className="text-xl font-bold text-yellow-800 mb-4">⚡ IMMEDIATE ACTIONS</h4>
                                    {analysis.comprehensiveStudyPlan.immediate.today && (
                                        <div className="mb-4">
                                            <p className="font-semibold text-gray-800 mb-2">📍 Do This TODAY (Next 2 Hours):</p>
                                            <p className="text-gray-700">{analysis.comprehensiveStudyPlan.immediate.today}</p>
                                        </div>
                                    )}
                                    {analysis.comprehensiveStudyPlan.immediate.thisWeek && analysis.comprehensiveStudyPlan.immediate.thisWeek.length > 0 && (
                                        <div>
                                            <p className="font-semibold text-gray-800 mb-2">📅 This Week:</p>
                                            <ul className="space-y-1">
                                                {analysis.comprehensiveStudyPlan.immediate.thisWeek.map((day, idx) => (
                                                    <li key={idx} className="text-gray-700 ml-4">• {day}</li>
                                                ))}
                                            </ul>
                                        </div>
                                    )}
                                </div>
                            )}

                            {/* Short-term Plan */}
                            {analysis.comprehensiveStudyPlan.shortTerm && (
                                <div className="grid md:grid-cols-2 gap-4 mb-6">
                                    {['week1', 'week2', 'week3', 'week4'].map((week, idx) => {
                                        const weekData = analysis.comprehensiveStudyPlan.shortTerm[week]
                                        if (!weekData) return null
                                        return (
                                            <div key={week} className="p-4 bg-white rounded-lg border border-purple-300">
                                                <h5 className="font-bold text-purple-800 mb-2">Week {idx + 1}</h5>
                                                {weekData.topics && <p className="text-sm text-gray-700 mb-1"><strong>Topics:</strong> {weekData.topics.join(', ')}</p>}
                                                {weekData.goals && <p className="text-sm text-gray-700 mb-1"><strong>Goals:</strong> {weekData.goals}</p>}
                                                {weekData.practice && <p className="text-sm text-gray-700"><strong>Practice:</strong> {weekData.practice}</p>}
                                                {weekData.review && <p className="text-sm text-gray-700 mb-1"><strong>Review:</strong> {weekData.review}</p>}
                                                {weekData.assessment && <p className="text-sm text-gray-700"><strong>Assessment:</strong> {weekData.assessment}</p>}
                                            </div>
                                        )
                                    })}
                                </div>
                            )}

                            {/* Learning Techniques */}
                            {analysis.comprehensiveStudyPlan.learningTechniques && analysis.comprehensiveStudyPlan.learningTechniques.length > 0 && (
                                <div className="mb-4 p-4 bg-white rounded-lg">
                                    <h5 className="font-bold text-gray-800 mb-2">🎯 Recommended Learning Techniques:</h5>
                                    <ul className="space-y-1">
                                        {analysis.comprehensiveStudyPlan.learningTechniques.map((technique, idx) => (
                                            <li key={idx} className="text-gray-700 ml-4">• {technique}</li>
                                        ))}
                                    </ul>
                                </div>
                            )}

                            {/* Memory Strategies */}
                            {analysis.comprehensiveStudyPlan.memoryStrategies && analysis.comprehensiveStudyPlan.memoryStrategies.length > 0 && (
                                <div className="p-4 bg-white rounded-lg">
                                    <h5 className="font-bold text-gray-800 mb-2">🧠 Memory Techniques & Mnemonics:</h5>
                                    <ul className="space-y-1">
                                        {analysis.comprehensiveStudyPlan.memoryStrategies.map((strategy, idx) => (
                                            <li key={idx} className="text-gray-700 ml-4">• {strategy}</li>
                                        ))}
                                    </ul>
                                </div>
                            )}
                        </div>
                    )}

                    {/* Motivational Insights (NEW!) */}
                    {analysis.motivationalInsights && (
                        <div className="glass-card p-8 bg-gradient-to-r from-pink-50 to-purple-50">
                            <h3 className="text-2xl font-bold mb-6 text-purple-700 flex items-center gap-2">
                                <Star className="w-6 h-6" />
                                Motivation & Growth Potential
                            </h3>
                            {analysis.motivationalInsights.wins && analysis.motivationalInsights.wins.length > 0 && (
                                <div className="mb-4">
                                    <p className="font-semibold text-gray-800 mb-2">🎉 Celebrate These Wins:</p>
                                    <ul className="space-y-1">
                                        {analysis.motivationalInsights.wins.map((win, idx) => (
                                            <li key={idx} className="text-gray-700 ml-4">• {win}</li>
                                        ))}
                                    </ul>
                                </div>
                            )}
                            {analysis.motivationalInsights.growthPotential && (
                                <div className="mb-4">
                                    <p className="font-semibold text-gray-800 mb-2">📈 Growth Potential:</p>
                                    <p className="text-gray-700">{analysis.motivationalInsights.growthPotential}</p>
                                </div>
                            )}
                            {analysis.motivationalInsights.encouragement && (
                                <div className="p-4 bg-white rounded-lg border-2 border-purple-300">
                                    <p className="text-lg text-gray-700 italic">"{analysis.motivationalInsights.encouragement}"</p>
                                </div>
                            )}
                        </div>
                    )}

                    {/* Priority Focus Areas */}
                    {analysis.priorityFocusAreas && analysis.priorityFocusAreas.length > 0 && (
                        <div className="glass-card p-8 bg-gradient-to-r from-orange-50 to-red-50">
                            <h3 className="text-2xl font-bold mb-6 text-orange-700 flex items-center gap-2">
                                <Target className="w-6 h-6" />
                                Priority Focus Areas - Start Here!
                            </h3>
                            <div className="space-y-4">
                                {analysis.priorityFocusAreas.map((area, idx) => (
                                    <div key={idx} className="p-6 bg-white rounded-lg border-2 border-orange-400">
                                        <h4 className="text-xl font-bold text-gray-800 mb-2">🎯 Priority #{idx + 1}: {area.topic}</h4>
                                        <p className="text-gray-700 mb-3"><strong>Why Priority:</strong> {area.reason}</p>
                                        {area.quickWins && area.quickWins.length > 0 && (
                                            <div className="mb-3">
                                                <p className="font-semibold text-green-700 mb-1">Quick Wins:</p>
                                                <ul className="space-y-1">
                                                    {area.quickWins.map((win, widx) => (
                                                        <li key={widx} className="text-gray-700 ml-4">• {win}</li>
                                                    ))}
                                                </ul>
                                            </div>
                                        )}
                                        {area.studyApproach && (
                                            <p className="text-gray-700"><strong>Study Approach:</strong> {area.studyApproach}</p>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            ) : null}
        </div>
    )
}
