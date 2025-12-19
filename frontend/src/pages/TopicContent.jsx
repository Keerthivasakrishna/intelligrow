import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { supabase } from '../supabase'
import { motion } from 'framer-motion'
import { ArrowLeft, PlayCircle } from 'lucide-react'
import { mockTopicContent } from '../mockData'

export default function TopicContent() {
    const { topicId } = useParams()
    const navigate = useNavigate()
    const [topic, setTopic] = useState(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        // Check for guest mode
        const isGuest = localStorage.getItem('guestMode') === 'true'

        if (isGuest) {
            const mockContent = mockTopicContent[topicId]
            if (mockContent) {
                setTopic(mockContent)
            }
            setLoading(false)
            return
        }

        fetchTopicContent()
    }, [topicId])

    const fetchTopicContent = async () => {
        try {
            const session = await supabase.auth.getSession()
            const token = session.data.session?.access_token

            if (!token) {
                navigate('/')
                return
            }

            const response = await fetch(`http://localhost:8000/api/topics/${topicId}`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })

            if (response.ok) {
                const data = await response.json()
                setTopic(data)
            }
        } catch (error) {
            console.error('Error fetching topic:', error)
        } finally {
            setLoading(false)
        }
    }

    const handleStartQuiz = () => {
        navigate(`/topics/${topicId}/quiz`)
    }

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-[60vh]">
                <div className="text-2xl gradient-text animate-pulse">Loading content...</div>
            </div>
        )
    }

    if (!topic) {
        return (
            <div className="text-center text-gray-400">
                <p>Topic not found</p>
            </div>
        )
    }

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
                </div>

                <div className="glass-card p-8 mb-6">
                    <div className="flex justify-between items-start mb-4">
                        <div>
                            <h1 className="text-4xl font-bold gradient-text mb-2">{topic.title}</h1>
                            <span className="inline-block bg-purple-500/20 text-purple-300 px-3 py-1 rounded-full text-sm">
                                {topic.difficulty}
                            </span>
                        </div>
                    </div>

                    {topic.description && (
                        <p className="text-gray-300 text-lg mb-6">{topic.description}</p>
                    )}

                    {/* YouTube Video */}
                    {topic.videoUrl && (
                        <div className="mb-8">
                            <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                                <PlayCircle className="w-6 h-6 text-primary-400" />
                                Video Tutorial
                            </h2>
                            <div className="relative w-full rounded-lg overflow-hidden bg-black" style={{ paddingBottom: '56.25%' }}>
                                <iframe
                                    className="absolute top-0 left-0 w-full h-full"
                                    src={topic.videoUrl}
                                    title={topic.title}
                                    frameBorder="0"
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                    allowFullScreen
                                ></iframe>
                            </div>
                        </div>
                    )}

                    {/* Content */}
                    <div className="prose prose-invert max-w-none">
                        <div className="text-gray-200 leading-relaxed space-y-4">
                            {topic.content.split('\n').map((line, index) => {
                                // Enhanced markdown
                                if (line.startsWith('# ')) {
                                    return <h1 key={index} className="text-3xl font-bold mt-8 mb-4 gradient-text">{line.substring(2)}</h1>
                                } else if (line.startsWith('## ')) {
                                    return <h2 key={index} className="text-2xl font-bold mt-6 mb-3 text-primary-300">{line.substring(3)}</h2>
                                } else if (line.startsWith('### ')) {
                                    return <h3 key={index} className="text-xl font-semibold mt-4 mb-2">{line.substring(4)}</h3>
                                } else if (line.startsWith('- ') || line.startsWith('✓ ') || line.startsWith('✗ ')) {
                                    return <li key={index} className="ml-6">{line.substring(2)}</li>
                                } else if (line.startsWith('|')) {
                                    return <p key={index} className="font-mono text-sm bg-gray-800/50 p-2 rounded">{line}</p>
                                } else if (line.trim() === '') {
                                    return <br key={index} />
                                } else {
                                    return <p key={index}>{line}</p>
                                }
                            })}
                        </div>
                    </div>

                    {/* Quiz Button */}
                    <div className="mt-10 pt-6 border-t border-white/10">
                        <motion.button
                            onClick={handleStartQuiz}
                            className="glass-button text-lg flex items-center gap-3 mx-auto"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            <PlayCircle className="w-6 h-6" />
                            Start Quiz
                        </motion.button>
                    </div>
                </div>
            </motion.div>
        </div>
    )
}
