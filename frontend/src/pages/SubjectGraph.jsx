import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { supabase } from '../supabase'
import SkillNode from '../components/SkillNode'
import Analytics from '../components/Analytics'
import { motion } from 'framer-motion'
import { ArrowLeft, Brain } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { mockTopics, mockStats } from '../mockData'

export default function SubjectGraph() {
    const { code } = useParams()
    const navigate = useNavigate()
    const [topics, setTopics] = useState([])
    const [stats, setStats] = useState(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        // Check for guest mode
        const isGuest = localStorage.getItem('guestMode') === 'true'

        if (isGuest) {
            // Map subject code to subject_id
            const subjectMap = { 'DSA': '1', 'CN': '2', 'OS': '3' }
            const subjectId = subjectMap[code]

            // Filter topics by subject
            const filteredTopics = mockTopics.filter(t => t.subject_id === subjectId)

            const savedTopics = localStorage.getItem('guestTopics')
            setTopics(savedTopics ? JSON.parse(savedTopics).filter(t => t.subject_id === subjectId) : filteredTopics)
            setStats(mockStats)
            setLoading(false)
            return
        }

        fetchGraphData()
        fetchUserStats()
    }, [code])

    const fetchGraphData = async () => {
        try {
            const session = await supabase.auth.getSession()
            const token = session.data.session?.access_token

            if (!token) {
                navigate('/')
                return
            }

            const response = await fetch(`http://localhost:8000/api/subjects/${code}/graph`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })

            if (response.ok) {
                const data = await response.json()
                setTopics(data)
            }
        } catch (error) {
            console.error('Error fetching graph:', error)
        } finally {
            setLoading(false)
        }
    }

    const fetchUserStats = async () => {
        try {
            const session = await supabase.auth.getSession()
            const token = session.data.session?.access_token

            if (!token) return

            const response = await fetch('http://localhost:8000/api/users/stats', {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })

            if (response.ok) {
                const data = await response.json()
                setStats(data)
            }
        } catch (error) {
            console.error('Error fetching stats:', error)
        }
    }

    // Draw prerequisite edges
    const renderEdges = () => {
        const edges = []

        topics.forEach(topic => {
            if (topic.prerequisites && topic.prerequisites.length > 0) {
                topic.prerequisites.forEach(prereqId => {
                    const prereqTopic = topics.find(t => t.id === prereqId)
                    if (prereqTopic) {
                        const x1 = prereqTopic.graph_position.x + 90 // center of node
                        const y1 = prereqTopic.graph_position.y + 40
                        const x2 = topic.graph_position.x + 90
                        const y2 = topic.graph_position.y + 40

                        edges.push(
                            <line
                                key={`${prereqId}-${topic.id}`}
                                x1={x1}
                                y1={y1}
                                x2={x2}
                                y2={y2}
                                stroke="rgba(139, 92, 246, 0.3)"
                                strokeWidth="2"
                                markerEnd="url(#arrowhead)"
                            />
                        )
                    }
                })
            }
        })

        return edges
    }

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-[60vh]">
                <div className="text-2xl gradient-text animate-pulse">Loading skill graph...</div>
            </div>
        )
    }

    return (
        <div className="max-w-full">
            <div className="flex gap-6">
                {/* Main Graph Area */}
                <div className="flex-1">
                    <div className="flex items-center gap-4 mb-6 justify-between">
                        <div className="flex items-center gap-4">
                            <button
                                onClick={() => navigate('/dashboard')}
                                className="glass-button flex items-center gap-2"
                            >
                                <ArrowLeft className="w-4 h-4" />
                                Back
                            </button>
                            <h2 className="text-3xl font-bold gradient-text">{code} Skill Graph</h2>
                        </div>

                        <button
                            onClick={() => navigate(`/subjects/${code}/analytics`)}
                            className="glass-button flex items-center gap-2 bg-gradient-to-r from-purple-500/20 to-pink-500/20 border-purple-400/50"
                        >
                            <Brain className="w-5 h-5" />
                            AI Analysis
                        </button>
                    </div>

                    <motion.div
                        className="glass-card p-6 relative"
                        style={{ minHeight: '800px' }}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.5 }}
                    >
                        {/* SVG for edges */}
                        <svg
                            className="absolute inset-0 pointer-events-none"
                            style={{ width: '100%', height: '100%' }}
                        >
                            <defs>
                                <marker
                                    id="arrowhead"
                                    markerWidth="10"
                                    markerHeight="10"
                                    refX="9"
                                    refY="3"
                                    orient="auto"
                                >
                                    <polygon points="0 0, 10 3, 0 6" fill="rgba(139, 92, 246, 0.5)" />
                                </marker>
                            </defs>
                            {renderEdges()}
                        </svg>

                        {/* Topic Nodes */}
                        <div className="relative">
                            {topics.map(topic => (
                                <SkillNode key={topic.id} node={topic} />
                            ))}
                        </div>
                    </motion.div>
                </div>

                {/* Analytics Sidebar */}
                <div className="w-80">
                    <h3 className="text-2xl font-bold mb-4">Your Progress</h3>
                    {stats && (
                        <Analytics
                            strengths={stats.strengths || []}
                            weaknesses={stats.weaknesses || []}
                        />
                    )}
                </div>
            </div>
        </div>
    )
}
