import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Mail, Lock, Eye, EyeOff, Sparkles, BookOpen, Shield } from 'lucide-react'
import { supabase } from '../supabase'

// Admin credentials
const ADMIN_CREDENTIALS = {
    email: 'admin@intelligrow.com',
    password: 'admin@intelligrow2024'
}

// Pre-loaded demo student accounts
const DEMO_USERS = [
    { name: 'Keerthi', email: 'keerthi@gmail.com', password: 'kvk@123' },
    { name: 'Sibhi', email: 'sibhi@gmail.com', password: 'sibhi@123' },
    { name: 'Swarna', email: 'swarna@gmail.com', password: 'swarna@123' },
    { name: 'Neya', email: 'neya@gmail.com', password: 'neya@123' }
]

export default function Login() {
    const navigate = useNavigate()
    const [isSignUp, setIsSignUp] = useState(false)
    const [showPassword, setShowPassword] = useState(false)
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: ''
    })
    const [error, setError] = useState('')

    const handleSignIn = (e) => {
        e.preventDefault()
        setError('')

        // Check if admin
        if (formData.email === ADMIN_CREDENTIALS.email && formData.password === ADMIN_CREDENTIALS.password) {
            localStorage.setItem('adminSession', JSON.stringify({
                isAdmin: true,
                email: ADMIN_CREDENTIALS.email,
                name: 'Administrator',
                loginTime: new Date().toISOString()
            }))
            localStorage.setItem('currentUser', JSON.stringify({
                name: 'Administrator',
                email: ADMIN_CREDENTIALS.email,
                isAdmin: true
            }))
            localStorage.removeItem('guestMode')
            navigate('/admin/dashboard')
            return
        }

        // Check student credentials
        const users = JSON.parse(localStorage.getItem('users') || JSON.stringify(DEMO_USERS))
        const user = users.find(u => u.email === formData.email && u.password === formData.password)

        if (user) {
            localStorage.setItem('currentUser', JSON.stringify({ name: user.name, email: user.email, isAdmin: false }))
            localStorage.removeItem('guestMode')
            navigate('/select-pet')
        } else {
            setError('Invalid email or password')
        }
    }

    const handleSignUp = (e) => {
        e.preventDefault()
        setError('')

        if (!formData.name || !formData.email || !formData.password) {
            setError('All fields are required')
            return
        }

        if (formData.password.length < 6) {
            setError('Password must be at least 6 characters')
            return
        }

        const users = JSON.parse(localStorage.getItem('users') || JSON.stringify(DEMO_USERS))

        if (users.find(u => u.email === formData.email)) {
            setError('Email already exists')
            return
        }

        const newUser = {
            name: formData.name,
            email: formData.email,
            password: formData.password
        }

        users.push(newUser)
        localStorage.setItem('users', JSON.stringify(users))
        localStorage.setItem('currentUser', JSON.stringify({ name: newUser.name, email: newUser.email, isAdmin: false }))
        localStorage.removeItem('guestMode')
        navigate('/select-pet')
    }

    const handleGuestLogin = () => {
        const guestUser = {
            id: 'guest-' + Date.now(),
            email: 'guest@intelligrow.com',
            user_metadata: {
                full_name: 'Guest User',
                avatar_url: 'https://api.dicebear.com/7.x/avataaars/svg?seed=guest'
            }
        }

        localStorage.setItem('guestMode', 'true')
        localStorage.setItem('guestUser', JSON.stringify(guestUser))
        localStorage.removeItem('currentUser')
        navigate('/select-pet')
    }

    const handleGoogleLogin = async () => {
        try {
            const { data, error } = await supabase.auth.signInWithOAuth({
                provider: 'google',
                options: {
                    redirectTo: `${window.location.origin}/select-pet`
                }
            })
            if (error) throw error
        } catch (error) {
            setError('Google login failed. Please try email/password or guest mode.')
        }
    }

    return (
        <div className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900">
            {/* Animated Background */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <motion.div
                    className="absolute top-20 left-20 w-96 h-96 bg-gradient-to-r from-pink-500/20 to-purple-500/20 rounded-full blur-3xl"
                    animate={{
                        scale: [1, 1.2, 1],
                        opacity: [0.3, 0.5, 0.3]
                    }}
                    transition={{ duration: 8, repeat: Infinity }}
                />
                <motion.div
                    className="absolute bottom-20 right-20 w-96 h-96 bg-gradient-to-r from-blue-500/20 to-cyan-500/20 rounded-full blur-3xl"
                    animate={{
                        scale: [1.2, 1, 1.2],
                        opacity: [0.5, 0.3, 0.5]
                    }}
                    transition={{ duration: 8, repeat: Infinity, delay: 1 }}
                />
            </div>

            <div className="max-w-6xl w-full grid md:grid-cols-2 gap-8 items-center relative z-10">
                {/* Left Side - Branding */}
                <motion.div
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8 }}
                    className="text-left space-y-6"
                >
                    <div className="flex items-center gap-3 mb-6">
                        <Sparkles className="w-16 h-16 text-purple-400" />
                        <div>
                            <h1 className="text-6xl font-black gradient-text">
                                IntelliGrow
                            </h1>
                            <p className="text-purple-300 text-lg">AI-Powered Learning Platform</p>
                        </div>
                    </div>

                    <p className="text-3xl text-white font-bold">
                        Transform Your Learning Journey
                    </p>

                    {/* Features */}
                    <div className="space-y-4">
                        {[
                            { icon: '🎯', text: 'Personalized AI Insights' },
                            { icon: '🎮', text: 'Gamified Learning Experience' },
                            { icon: '📊', text: 'Track Your Progress' },
                            { icon: '🏆', text: 'Level Up with Your Pet' }
                        ].map((feature, idx) => (
                            <motion.div
                                key={idx}
                                className="flex items-center gap-3 text-white text-lg"
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.2 * idx }}
                            >
                                <span className="text-3xl">{feature.icon}</span>
                                <span>{feature.text}</span>
                            </motion.div>
                        ))}
                    </div>

                    {/* Stats */}
                    <div className="flex gap-8 pt-6">
                        <div>
                            <div className="text-4xl font-bold text-purple-400">32+</div>
                            <div className="text-sm text-gray-300">Topics</div>
                        </div>
                        <div>
                            <div className="text-4xl font-bold text-pink-400">3</div>
                            <div className="text-sm text-gray-300">Subjects</div>
                        </div>
                        <div>
                            <div className="text-4xl font-bold text-blue-400">AI</div>
                            <div className="text-sm text-gray-300">Powered</div>
                        </div>
                    </div>
                </motion.div>

                {/* Right Side - Login/Signup */}
                <motion.div
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                >
                    <div className="glass-card p-10 backdrop-blur-xl bg-white/90 shadow-2xl">
                        {/* Header */}
                        <div className="text-center mb-8">
                            <h2 className="text-3xl font-bold text-gray-800 mb-2">
                                {isSignUp ? 'Create Account' : 'Welcome Back'}
                            </h2>
                            <p className="text-gray-600">
                                {isSignUp ? 'Join IntelliGrow today' : 'Sign in to continue learning'}
                            </p>
                        </div>

                        {/* Error Message */}
                        {error && (
                            <motion.div
                                initial={{ opacity: 0, y: -10 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded-lg text-sm"
                            >
                                {error}
                            </motion.div>
                        )}

                        {/* Form */}
                        <form onSubmit={isSignUp ? handleSignUp : handleSignIn} className="space-y-4">
                            {isSignUp && (
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                                        Full Name
                                    </label>
                                    <input
                                        type="text"
                                        value={formData.name}
                                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-purple-500 focus:outline-none transition-colors"
                                        placeholder="John Doe"
                                        required={isSignUp}
                                    />
                                </div>
                            )}

                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-2">
                                    Email
                                </label>
                                <div className="relative">
                                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                                    <input
                                        type="email"
                                        value={formData.email}
                                        onChange={(e) => setFormData({...formData, email: e.target.value })}
                                    className="w-full pl-10 pr-4 py-3 border-2 border-gray-200 rounded-lg focus:border-purple-500 focus:outline-none transition-colors"
                                    placeholder="you@example.com"
                                    required
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-2">
                                    Password
                                </label>
                                <div className="relative">
                                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                                    <input
                                        type={showPassword ? 'text' : 'password'}
                                        value={formData.password}
                                        onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                                        className="w-full pl-10 pr-12 py-3 border-2 border-gray-200 rounded-lg focus:border-purple-500 focus:outline-none transition-colors"
                                        placeholder="••••••••"
                                        required
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                                    >
                                        {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                                    </button>
                                </div>
                            </div>

                            <motion.button
                                type="submit"
                                className="w-full py-3 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-semibold rounded-lg shadow-lg"
                                whileHover={{ scale: 1.02, boxShadow: '0 20px 40px rgba(168, 85, 247, 0.4)' }}
                                whileTap={{ scale: 0.98 }}
                            >
                                {isSignUp ? 'Sign Up' : 'Sign In'}
                            </motion.button>
                        </form>

                        {/* Divider */}
                        <div className="flex items-center gap-4 my-6">
                            <div className="flex-1 h-px bg-gray-300"></div>
                            <span className="text-gray-500 text-sm">or</span>
                            <div className="flex-1 h-px bg-gray-300"></div>
                        </div>

                        {/* Alternative Login Options */}
                        <div className="space-y-3">
                            <button
                                onClick={handleGuestLogin}
                                className="w-full py-3 bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white font-semibold rounded-lg shadow-md"
                            >
                                🎮 Continue as Guest
                            </button>
                        </div>

                        {/* Toggle Sign In/Sign Up */}
                        <div className="mt-6 text-center">
                            <button
                                onClick={() => setIsSignUp(!isSignUp)}
                                className="text-purple-600 hover:text-purple-700 font-semibold"
                            >
                                {isSignUp ? 'Already have an account? Sign In' : "Don't have an account? Sign Up"}
                            </button>
                        </div>

                        {/* Demo Credentials */}
                        <div className="mt-6 p-4 bg-purple-50 rounded-lg border border-purple-200">
                            <p className="text-xs font-semibold text-purple-800 mb-2">🔑 Demo Accounts:</p>
                            <div className="grid grid-cols-2 gap-2 text-xs text-purple-700 font-mono">
                                <div>
                                    <div className="font-bold">Student:</div>
                                    <div>keerthi@gmail.com</div>
                                    <div>kvk@123</div>
                                </div>
                                <div>
                                    <div className="font-bold">Admin:</div>
                                    <div>admin@intelligrow.com</div>
                                    <div>admin@intelligrow2024</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </motion.div>
            </div>
        </div>
    )
}

