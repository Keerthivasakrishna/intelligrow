import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { BookOpen, Code, Network } from 'lucide-react'
import { supabase } from '../supabase'
import { mockSubjects } from '../mockData'

const subjectIcons = {
    'DSA': <Code className="w-12 h-12" />,
    'OS': <Network className="w-12 h-12" />,
    'CN': <Network className="w-12 h-12" />,
}

export default function Dashboard() {
    const navigate = useNavigate()
    const [subjects, setSubjects] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        // Check for guest mode
        const isGuest = localStorage.getItem('guestMode') === 'true'
        const currentUser = localStorage.getItem('currentUser')
        const isEmailAuth = currentUser && currentUser !== 'null'

        // Use mock data for guest and email users
        if (isGuest || isEmailAuth) {
            console.log('Using mock data for:', isGuest ? 'guest' : 'email user')
            setSubjects(mockSubjects)
            setLoading(false)
            return
        }

        // Only fetch from Supabase for OAuth users
        fetchSubjects()
    }, [])

    const fetchSubjects = async () => {
        try {
            const session = await supabase.auth.getSession()
            const token = session.data.session?.access_token

            if (!token) {
                // If no token, use mock data instead of redirecting
                console.log('No Supabase token, using mock data')
                setSubjects(mockSubjects)
                setLoading(false)
                return
            }

            const response = await fetch('http://localhost:8000/api/subjects', {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })

            if (response.ok) {
                const data = await response.json()
                setSubjects(data)
            }
        } catch (error) {
            console.error('Error fetching subjects:', error)
            // On error, use mock data
            setSubjects(mockSubjects)
        } finally {
            setLoading(false)
        }
    }

    const handleSubjectClick = (subject) => {
        navigate(`/subjects/${subject.code}`)
    }

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-[60vh]">
                <div className="text-2xl gradient-text animate-pulse">Loading...</div>
            </div>
        )
    }

    return (
        <div className="max-w-6xl mx-auto">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
            >
                <h2 className="text-4xl font-bold mb-2 gradient-text">Welcome to IntelliGrow! 🎓</h2>
                <p className="text-gray-300 text-lg mb-10">Choose a subject to begin your learning journey</p>

                <div className="grid md:grid-cols-3 gap-6">
                    {subjects.map((subject, index) => (
                        <motion.div
                            key={subject.id}
                            className="glass-card p-8 cursor-pointer hover:scale-105 transition-all duration-300 hover:shadow-2xl"
                            initial={{ opacity: 0, y: 50 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1, duration: 0.5 }}
                            onClick={() => handleSubjectClick(subject)}
                            whileHover={{ y: -10 }}
                        >
                            <div className="text-purple-400 mb-4">
                                {subjectIcons[subject.code] || <BookOpen className="w-12 h-12" />}
                            </div>
                            <h3 className="text-2xl font-bold mb-2">{subject.name}</h3>
                            <p className="text-gray-400 mb-4 text-sm">{subject.description}</p>
                            <div className="flex items-center gap-2 text-sm">
                                <span className="bg-purple-500/20 text-purple-300 px-3 py-1 rounded-full">
                                    {subject.total_topics} Topics
                                </span>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </motion.div>
        </div>
    )
}
