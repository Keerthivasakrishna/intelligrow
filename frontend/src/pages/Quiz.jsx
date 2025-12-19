import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { supabase } from '../supabase'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowLeft, CheckCircle, XCircle, Trophy, Sparkles, PartyPopper } from 'lucide-react'
import useStore from '../store/useStore'
import { mockQuizQuestions } from '../mockData'

export default function Quiz() {
    const { topicId } = useParams()
    const navigate = useNavigate()
    const { setUserProfile } = useStore()

    const [questions, setQuestions] = useState([])
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
    const [answers, setAnswers] = useState([])
    const [showResults, setShowResults] = useState(false)
    const [result, setResult] = useState(null)
    const [loading, setLoading] = useState(true)
    const [submitting, setSubmitting] = useState(false)
    const [subjectCode, setSubjectCode] = useState(null)

    useEffect(() => {
        fetchQuizQuestions()
    }, [topicId])

    const fetchQuizQuestions = async () => {
        try {
            // Check for guest mode first
            const isGuest = localStorage.getItem('guestMode') === 'true'

            if (isGuest) {
                // Use mock quiz questions
                const mockQuestions = mockQuizQuestions[topicId]
                if (mockQuestions) {
                    setQuestions(mockQuestions)
                    setAnswers(new Array(mockQuestions.length).fill(null))
                    setSubjectCode('DSA')
                }
                setLoading(false)
                return
            }

            // Regular Supabase mode
            const session = await supabase.auth.getSession()
            const token = session.data.session?.access_token

            if (!token) {
                navigate('/')
                return
            }

            // Fetch topic to get subject code
            const topicResponse = await fetch(`http://localhost:8000/api/topics/${topicId}`, {
                headers: { 'Authorization': `Bearer ${token}` }
            })

            if (topicResponse.ok) {
                const topicData = await topicResponse.json()
                // Fetch subject to get code
                const subjectResponse = await fetch('http://localhost:8000/api/subjects', {
                    headers: { 'Authorization': `Bearer ${token}` }
                })
                if (subjectResponse.ok) {
                    const subjects = await subjectResponse.json()
                    const subject = subjects.find(s => s.id === topicData.subject_id)
                    if (subject) {
                        setSubjectCode(subject.code)
                    }
                }
            }

            const response = await fetch(`http://localhost:8000/api/topics/${topicId}/quiz`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })

            if (response.ok) {
                const data = await response.json()
                setQuestions(data)
                setAnswers(new Array(data.length).fill(null))
            }
        } catch (error) {
            console.error('Error fetching quiz:', error)
        } finally {
            setLoading(false)
        }
    }

    const handleAnswerSelect = (optionIndex) => {
        const newAnswers = [...answers]
        newAnswers[currentQuestionIndex] = optionIndex
        setAnswers(newAnswers)
    }

    const handleNext = () => {
        if (currentQuestionIndex < questions.length - 1) {
            setCurrentQuestionIndex(currentQuestionIndex + 1)
        }
    }

    const handlePrevious = () => {
        if (currentQuestionIndex > 0) {
            setCurrentQuestionIndex(currentQuestionIndex - 1)
        }
    }

    const handleSubmit = async () => {
        // Check if all questions are answered
        if (answers.includes(null)) {
            alert('Please answer all questions before submitting!')
            return
        }

        setSubmitting(true)

        try {
            const isGuest = localStorage.getItem('guestMode') === 'true'

            if (isGuest) {
                // Guest mode: calculate score locally
                let correctCount = 0
                for (let i = 0; i < questions.length; i++) {
                    if (answers[i] === questions[i].correct_answer) {
                        correctCount++
                    }
                }

                const scorePercentage = (correctCount / questions.length) * 100
                const passed = scorePercentage >= 80

                // Get current guest XP and level
                const currentXP = parseInt(localStorage.getItem('guestXP') || '150')
                const currentLevel = parseInt(localStorage.getItem('guestLevel') || '2')

                let xpGained = 0
                let newXP = currentXP
                let newLevel = currentLevel
                let levelUp = false

                if (passed) {
                    xpGained = 50
                    newXP = currentXP + xpGained
                    newLevel = Math.floor(newXP / 100) + 1
                    levelUp = newLevel > currentLevel

                    // Save to localStorage
                    localStorage.setItem('guestXP', newXP.toString())
                    localStorage.setItem('guestLevel', newLevel.toString())

                    // Update user profile in store
                    const guestUser = JSON.parse(localStorage.getItem('guestUser'))
                    setUserProfile({
                        id: guestUser.id,
                        email: guestUser.email,
                        full_name: guestUser.user_metadata.full_name,
                        avatar_url: guestUser.user_metadata.avatar_url,
                        xp: newXP,
                        pet_level: newLevel
                    })
                }

                const guestResult = {
                    score: scorePercentage,
                    correct_count: correctCount,
                    total_count: questions.length,
                    passed: passed,
                    xp_gained: xpGained,
                    new_xp: newXP,
                    new_level: newLevel,
                    level_up: levelUp,
                    questions: questions,
                    unlocked_topics: []
                }

                // Store quiz history for AI analysis
                const quizHistory = JSON.parse(localStorage.getItem('quizHistory') || '[]')
                const quizEntry = {
                    topicId: topicId,
                    topicTitle: questions[0]?.topic_title || `Topic ${topicId}`,
                    score: correctCount,
                    totalQuestions: questions.length,
                    percentage: scorePercentage,
                    passed: passed,
                    timestamp: new Date().toISOString(),
                    answers: answers,
                    correctAnswers: questions.map(q => q.correct_answer),
                    questionsData: questions.map((q, i) => ({
                        question: q.question_text,
                        isCorrect: answers[i] === q.correct_answer,
                        topic: q.topic || 'General'
                    }))
                }
                quizHistory.push(quizEntry)
                localStorage.setItem('quizHistory', JSON.stringify(quizHistory))

                setResult(guestResult)
                setShowResults(true)
                setSubmitting(false)
                return
            }

            // Regular Supabase mode
            const session = await supabase.auth.getSession()
            const token = session.data.session?.access_token

            if (!token) {
                navigate('/')
                return
            }

            const response = await fetch('http://localhost:8000/api/quiz/submit', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({
                    topic_id: topicId,
                    answers: answers
                })
            })

            if (response.ok) {
                const resultData = await response.json()
                setResult(resultData)
                setShowResults(true)

                // Update user profile in store
                const profileResponse = await fetch('http://localhost:8000/api/users/me', {
                    headers: { 'Authorization': `Bearer ${token}` }
                })
                if (profileResponse.ok) {
                    const profile = await profileResponse.json()
                    setUserProfile(profile)
                }
            } else {
                alert('Failed to submit quiz. Please try again.')
            }
        } catch (error) {
            console.error('Error submitting quiz:', error)
            alert('An error occurred. Please try again.')
        } finally {
            setSubmitting(false)
        }
    }

    const handleContinueLearning = () => {
        if (subjectCode) {
            navigate(`/subjects/${subjectCode}`)
        } else {
            navigate('/dashboard')
        }
    }

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-[60vh]">
                <div className="text-2xl gradient-text animate-pulse">Loading quiz...</div>
            </div>
        )
    }

    if (showResults && result) {
        return (
            <div className="max-w-4xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5 }}
                    className="glass-card p-12 text-center"
                >
                    {/* Celebration Animation */}
                    {result.passed && (
                        <motion.div
                            className="text-8xl mb-6"
                            animate={{
                                rotate: [0, 10, -10, 10, 0],
                                scale: [1, 1.2, 1.2, 1.2, 1]
                            }}
                            transition={{ duration: 1 }}
                        >
                            {result.level_up ? '🎉' : '🏆'}
                        </motion.div>
                    )}

                    {!result.passed && (
                        <div className="text-6xl mb-6">😔</div>
                    )}

                    <h2 className="text-4xl font-bold mb-4">
                        {result.passed ? (
                            <span className="gradient-text">Congratulations! 🎊</span>
                        ) : (
                            <span className="text-yellow-400">Keep Practicing!</span>
                        )}
                    </h2>

                    <div className="mb-8">
                        <div className="text-6xl font-bold mb-2">
                            {Math.round(result.score)}%
                        </div>
                        <p className="text-gray-300 text-lg">
                            {result.correct_count} out of {result.total_count} correct
                        </p>
                    </div>

                    {result.passed && (
                        <div className="space-y-4 mb-8">
                            <motion.div
                                className="glass-card p-6 inline-block"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.3 }}
                            >
                                <Sparkles className="w-8 h-8 text-yellow-400 mx-auto mb-2" />
                                <p className="text-2xl font-bold">+{result.xp_gained} XP</p>
                                <p className="text-gray-400 text-sm">Total XP: {result.new_xp}</p>
                            </motion.div>

                            {result.level_up && (
                                <motion.div
                                    className="glass-card p-6 bg-purple-500/20 border-purple-400/50"
                                    initial={{ opacity: 0, scale: 0 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    transition={{ delay: 0.6, type: 'spring' }}
                                >
                                    <PartyPopper className="w-8 h-8 text-purple-400 mx-auto mb-2" />
                                    <p className="text-2xl font-bold">Level Up!</p>
                                    <p className="text-gray-300">Your pet is now Level {result.new_level}!</p>
                                </motion.div>
                            )}

                            {result.unlocked_topics && result.unlocked_topics.length > 0 && (
                                <motion.div
                                    className="glass-card p-6 bg-blue-500/20 border-blue-400/50"
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.9 }}
                                >
                                    <Trophy className="w-8 h-8 text-blue-400 mx-auto mb-2" />
                                    <p className="text-lg font-bold">New Topics Unlocked!</p>
                                    <p className="text-gray-300 text-sm">{result.unlocked_topics.length} new topic(s) available</p>
                                </motion.div>
                            )}
                        </div>
                    )}

                    {!result.passed && (
                        <p className="text-gray-300 mb-8">
                            You need 80% or higher to pass. Review the material and try again!
                        </p>
                    )}

                    {/* Show Questions with Answers */}
                    <div className="text-left space-y-4 mb-8 max-h-96 overflow-y-auto">
                        <h3 className="text-2xl font-bold mb-4">Review Answers</h3>
                        {result.questions.map((q, index) => (
                            <div key={q.id} className="glass-card p-4">
                                <p className="font-semibold mb-2">
                                    {index + 1}. {q.question_text}
                                </p>
                                <div className="space-y-2">
                                    {q.options.map((option, optIndex) => (
                                        <div
                                            key={optIndex}
                                            className={`p-3 rounded-lg flex items-center gap-2 ${optIndex === q.correct_answer
                                                ? 'bg-green-500/20 border border-green-500/50'
                                                : answers[index] === optIndex
                                                    ? 'bg-red-500/20 border border-red-500/50'
                                                    : 'bg-gray-700/30'
                                                }`}
                                        >
                                            {optIndex === q.correct_answer && <CheckCircle className="w-5 h-5 text-green-400" />}
                                            {answers[index] === optIndex && optIndex !== q.correct_answer && (
                                                <XCircle className="w-5 h-5 text-red-400" />
                                            )}
                                            <span>{option}</span>
                                        </div>
                                    ))}
                                </div>
                                <p className="text-sm text-gray-400 mt-3">
                                    <strong>Explanation:</strong> {q.explanation}
                                </p>
                            </div>
                        ))}
                    </div>

                    <motion.button
                        onClick={handleContinueLearning}
                        className="glass-button text-lg"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        Continue Learning
                    </motion.button>
                </motion.div>
            </div>
        )
    }

    const currentQuestion = questions[currentQuestionIndex]

    return (
        <div className="max-w-4xl mx-auto">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
            >
                <div className="flex items-center gap-4 mb-6">
                    <button
                        onClick={() => navigate(-1)}
                        className="glass-button flex items-center gap-2"
                    >
                        <ArrowLeft className="w-4 h-4" />
                        Back
                    </button>
                    <div className="flex-1">
                        <div className="flex justify-between items-center">
                            <h2 className="text-2xl font-bold">Quiz</h2>
                            <span className="text-gray-400">
                                Question {currentQuestionIndex + 1} of {questions.length}
                            </span>
                        </div>
                        <div className="w-full bg-gray-700/50 rounded-full h-2 mt-2">
                            <div
                                className="bg-gradient-to-r from-purple-500 to-pink-500 h-2 rounded-full transition-all duration-300"
                                style={{ width: `${((currentQuestionIndex + 1) / questions.length) * 100}%` }}
                            />
                        </div>
                    </div>
                </div>

                <AnimatePresence mode="wait">
                    <motion.div
                        key={currentQuestionIndex}
                        className="glass-card p-8"
                        initial={{ opacity: 0, x: 50 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -50 }}
                        transition={{ duration: 0.3 }}
                    >
                        <h3 className="text-2xl font-bold mb-6">{currentQuestion.question_text}</h3>

                        <div className="space-y-4 mb-8">
                            {currentQuestion.options.map((option, index) => (
                                <motion.button
                                    key={index}
                                    onClick={() => handleAnswerSelect(index)}
                                    className={`w-full p-4 text-left rounded-lg border-2 transition-all ${answers[currentQuestionIndex] === index
                                        ? 'bg-purple-500/30 border-purple-400'
                                        : 'bg-white/5 border-white/20 hover:bg-white/10'
                                        }`}
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                >
                                    <div className="flex items-center gap-3">
                                        <div
                                            className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${answers[currentQuestionIndex] === index
                                                ? 'border-purple-400 bg-purple-500'
                                                : 'border-gray-400'
                                                }`}
                                        >
                                            {answers[currentQuestionIndex] === index && (
                                                <div className="w-3 h-3 bg-white rounded-full" />
                                            )}
                                        </div>
                                        <span>{option}</span>
                                    </div>
                                </motion.button>
                            ))}
                        </div>

                        <div className="flex justify-between items-center">
                            <button
                                onClick={handlePrevious}
                                disabled={currentQuestionIndex === 0}
                                className="glass-button disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                Previous
                            </button>

                            {currentQuestionIndex < questions.length - 1 ? (
                                <button
                                    onClick={handleNext}
                                    className="glass-button"
                                >
                                    Next
                                </button>
                            ) : (
                                <button
                                    onClick={handleSubmit}
                                    disabled={submitting || answers.includes(null)}
                                    className="glass-button bg-green-500/20 border-green-400/50 disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    {submitting ? 'Submitting...' : 'Submit Quiz'}
                                </button>
                            )}
                        </div>
                    </motion.div>
                </AnimatePresence>
            </motion.div>
        </div>
    )
}
