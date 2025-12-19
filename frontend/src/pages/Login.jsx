import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Sparkles, Zap, Trophy, Brain, Rocket, Star, Users, BarChart3, Mail, Lock, User, Eye, EyeOff } from 'lucide-react'

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

    // Initialize default users in localStorage on component mount
    useState(() => {
        const existingUsers = localStorage.getItem('users')
        if (!existingUsers) {
            const defaultUsers = [
                { name: 'Keerthi', email: 'keerthi@gmail.com', password: 'kvk@123' },
                { name: 'Sibhi', email: 'sibhi@gmail.com', password: 'sibhi@123' },
                { name: 'Swarna', email: 'swarna@gmail.com', password: 'swarna@123' },
                { name: 'Neya', email: 'neya@gmail.com', password: 'neya@123' }
            ]
            localStorage.setItem('users', JSON.stringify(defaultUsers))
        }
    })

    const handleSignIn = (e) => {
        e.preventDefault()
        setError('')

        console.log('Attempting sign in...')
        const users = JSON.parse(localStorage.getItem('users') || '[]')
        console.log('All users:', users)

        const user = users.find(u => u.email === formData.email && u.password === formData.password)
        console.log('Found user:', user)

        if (user) {
            // Store logged in user - DON'T set guestMode to false, leave it unset
            const userData = {
                name: user.name,
                email: user.email
            }
            localStorage.setItem('currentUser', JSON.stringify(userData))
            localStorage.removeItem('guestMode') // Remove guestMode entirely for email users

            console.log('User data saved to localStorage:', userData)
            console.log('currentUser:', localStorage.getItem('currentUser'))
            console.log('guestMode:', localStorage.getItem('guestMode'))

            // Small delay to ensure localStorage is saved
            setTimeout(() => {
                navigate('/select-pet')
            }, 100)
        } else {
            setError('Invalid email or password')
            console.log('Login failed: Invalid credentials')
        }
    }

    const handleSignUp = (e) => {
        e.preventDefault()
        setError('')

        if (!formData.name || !formData.email || !formData.password) {
            setError('Please fill in all fields')
            return
        }

        if (formData.password.length < 6) {
            setError('Password must be at least 6 characters')
            return
        }

        const users = JSON.parse(localStorage.getItem('users') || '[]')

        // Check if email already exists
        if (users.find(u => u.email === formData.email)) {
            setError('Email already registered. Please sign in.')
            return
        }

        // Add new user
        const newUser = {
            name: formData.name,
            email: formData.email,
            password: formData.password
        }
        users.push(newUser)
        localStorage.setItem('users', JSON.stringify(users))

        // Log them in
        localStorage.setItem('currentUser', JSON.stringify({
            name: newUser.name,
            email: newUser.email
        }))
        localStorage.removeItem('guestMode') // Remove guestMode for email users
        navigate('/select-pet')
    }

    const handleGuestLogin = () => {
        localStorage.setItem('guestMode', 'true')
        localStorage.setItem('guestUser', JSON.stringify({
            id: 'guest-user',
            email: 'guest@intelligrow.com',
            user_metadata: {
                full_name: 'Guest User',
                avatar_url: 'https://api.dicebear.com/7.x/avataaars/svg?seed=guest'
            }
        }))
        navigate('/select-pet')
    }

    const features = [
        { icon: Brain, text: 'AI-Powered Learning Insights', color: 'text-purple-400' },
        { icon: Sparkles, text: 'Interactive Skill Graphs', color: 'text-pink-400' },
        { icon: Zap, text: 'Earn XP & Level Up', color: 'text-yellow-400' },
        { icon: Trophy, text: 'Grow Your Pet Companion', color: 'text-green-400' },
        { icon: BarChart3, text: 'Track Your Progress', color: 'text-blue-400' },
        { icon: Star, text: 'Master CS Concepts', color: 'text-orange-400' }
    ]

    return (
        <div className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden">
            {/* Animated Background Elements */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <motion.div
                    className="absolute top-20 left-20 w-72 h-72 bg-purple-500/20 rounded-full blur-3xl"
                    animate={{
                        scale: [1, 1.2, 1],
                        opacity: [0.3, 0.5, 0.3]
                    }}
                    transition={{ duration: 8, repeat: Infinity }}
                />
                <motion.div
                    className="absolute bottom-20 right-20 w-96 h-96 bg-pink-500/20 rounded-full blur-3xl"
                    animate={{
                        scale: [1.2, 1, 1.2],
                        opacity: [0.5, 0.3, 0.5]
                    }}
                    transition={{ duration: 8, repeat: Infinity, delay: 1 }}
                />
                <motion.div
                    className="absolute top-1/2 left-1/2 w-64 h-64 bg-blue-500/20 rounded-full blur-3xl"
                    animate={{
                        x: [-100, 100, -100],
                        y: [-50, 50, -50],
                        opacity: [0.4, 0.6, 0.4]
                    }}
                    transition={{ duration: 10, repeat: Infinity }}
                />
            </div>

            <div className="max-w-6xl w-full grid md:grid-cols-2 gap-8 items-center relative z-10">
                {/* Left Side - Branding & Features */}
                <motion.div
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8 }}
                    className="text-left space-y-8"
                >
                    {/* Logo & Title */}
                    <div>
                        <motion.div
                            className="inline-flex items-center gap-3 mb-4"
                            animate={{
                                rotate: [0, 5, -5, 0],
                            }}
                            transition={{ duration: 3, repeat: Infinity }}
                        >
                            <Rocket className="w-16 h-16 text-primary-500" />
                            <span className="text-6xl">🧠</span>
                        </motion.div>

                        <h1 className="text-7xl font-black mb-4 leading-tight">
                            <span className="gradient-text">IntelliGrow</span>
                        </h1>

                        <p className="text-2xl text-gray-700 font-medium">
                            Your AI-powered learning companion for mastering Computer Science
                        </p>
                    </div>

                    {/* Features Grid */}
                    <div className="grid grid-cols-2 gap-4">
                        {features.map((feature, idx) => (
                            <motion.div
                                key={idx}
                                className="glass-card p-4 hover:bg-white/70 transition-all duration-300"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.1 * idx, duration: 0.5 }}
                                whileHover={{ scale: 1.05, y: -2 }}
                            >
                                <feature.icon className={`w-8 h-8 ${feature.color} mb-2`} />
                                <p className="text-sm font-semibold text-gray-800">{feature.text}</p>
                            </motion.div>
                        ))}
                    </div>

                    {/* Stats */}
                    <motion.div
                        className="flex gap-8"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 1 }}
                    >
                        <div>
                            <div className="text-4xl font-bold gradient-text">32</div>
                            <div className="text-sm text-gray-600">Topics</div>
                        </div>
                        <div>
                            <div className="text-4xl font-bold gradient-text">3</div>
                            <div className="text-sm text-gray-600">Subjects</div>
                        </div>
                        <div>
                            <div className="text-4xl font-bold gradient-text">AI</div>
                            <div className="text-sm text-gray-600">Powered</div>
                        </div>
                    </motion.div>
                </motion.div>

                {/* Right Side - Auth Card */}
                <motion.div
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                >
                    <div className="glass-card p-10 backdrop-blur-xl bg-white/80 shadow-2xl">
                        {/* Header */}
                        <div className="text-center mb-8">
                            <motion.div
                                className="inline-block text-7xl mb-4"
                                animate={{
                                    rotate: [0, 10, -10, 10, 0],
                                    scale: [1, 1.1, 1]
                                }}
                                transition={{ duration: 2, repeat: Infinity }}
                            >
                                🚀
                            </motion.div>
                            <h2 className="text-3xl font-bold text-gray-800 mb-2">
                                {isSignUp ? 'Create Account' : 'Welcome Back'}
                            </h2>
                            <p className="text-gray-600">
                                {isSignUp ? 'Join thousands of CS learners' : 'Sign in to continue learning'}
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

                        {/* Sign In/Up Form */}
                        <form onSubmit={isSignUp ? handleSignUp : handleSignIn} className="space-y-4 mb-6">
                            {isSignUp && (
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                                        Full Name
                                    </label>
                                    <div className="relative">
                                        <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                                        <input
                                            type="text"
                                            value={formData.name}
                                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                            className="w-full pl-10 pr-4 py-3 border-2 border-gray-200 rounded-lg focus:border-primary-500 focus:outline-none transition-colors"
                                            placeholder="Enter your name"
                                            required={isSignUp}
                                        />
                                    </div>
                                </div>
                            )}

                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-2">
                                    Email Address
                                </label>
                                <div className="relative">
                                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                                    <input
                                        type="email"
                                        value={formData.email}
                                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                        className="w-full pl-10 pr-4 py-3 border-2 border-gray-200 rounded-lg focus:border-primary-500 focus:outline-none transition-colors"
                                        placeholder="your@email.com"
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
                                        className="w-full pl-10 pr-12 py-3 border-2 border-gray-200 rounded-lg focus:border-primary-500 focus:outline-none transition-colors"
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
                                className="w-full glass-button text-lg bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white border-0 shadow-lg"
                                whileHover={{ scale: 1.02, boxShadow: '0 15px 40px rgba(168, 85, 247, 0.4)' }}
                                whileTap={{ scale: 0.98 }}
                            >
                                {isSignUp ? 'Create Account' : 'Sign In'}
                            </motion.button>
                        </form>

                        {/* Toggle Sign In/Up */}
                        <div className="text-center mb-4">
                            <button
                                onClick={() => {
                                    setIsSignUp(!isSignUp)
                                    setError('')
                                    setFormData({ name: '', email: '', password: '' })
                                }}
                                className="text-primary-600 hover:text-primary-700 font-semibold text-sm"
                            >
                                {isSignUp ? 'Already have an account? Sign In' : "Don't have an account? Sign Up"}
                            </button>
                        </div>

                        {/* Divider */}
                        <div className="relative my-6">
                            <div className="absolute inset-0 flex items-center">
                                <div className="w-full border-t-2 border-gray-200"></div>
                            </div>
                            <div className="relative flex justify-center text-sm">
                                <span className="px-4 bg-white text-gray-500 font-semibold">or</span>
                            </div>
                        </div>

                        {/* Guest Login Button */}
                        <motion.button
                            onClick={handleGuestLogin}
                            className="w-full glass-button text-lg flex items-center justify-center gap-2 bg-white hover:bg-gray-50 text-gray-700 border-2 border-gray-200"
                            whileHover={{ scale: 1.02, boxShadow: '0 10px 30px rgba(0,0,0,0.1)' }}
                            whileTap={{ scale: 0.98 }}
                        >
                            <Users className="w-5 h-5" />
                            Continue as Guest
                        </motion.button>

                        {/* Demo Accounts */}
                        {!isSignUp && (
                            <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
                                <p className="text-xs font-semibold text-blue-800 mb-2">💡 Demo Accounts:</p>
                                <div className="space-y-1 text-xs text-blue-700">
                                    <div>📧 keerthi@gmail.com • 🔑 kvk@123</div>
                                    <div>📧 sibhi@gmail.com • 🔑 sibhi@123</div>
                                    <div>📧 swarna@gmail.com • 🔑 swarna@123</div>
                                    <div>📧 neya@gmail.com • 🔑 neya@123</div>
                                </div>
                            </div>
                        )}

                        {/* Footer */}
                        <p className="text-gray-500 text-xs text-center mt-6">
                            Free forever • No credit card required
                        </p>
                    </div>
                </motion.div>
            </div>
        </div>
    )
}
