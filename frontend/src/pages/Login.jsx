import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Mail, Lock, Eye, EyeOff, Sparkles } from 'lucide-react'
import { supabase } from '../supabase'

// Admin credentials (separate from Supabase)
const ADMIN_CREDENTIALS = {
    email: 'admin@intelligrow.com',
    password: 'admin@intelligrow2024'
}

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
    const [loading, setLoading] = useState(false)

    const handleSignIn = async (e) => {
        e.preventDefault()
        setError('')
        setLoading(true)

        try {
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

            // Try Supabase authentication for students
            const { data, error: signInError } = await supabase.auth.signInWithPassword({
                email: formData.email,
                password: formData.password
            })

            if (signInError) {
                setError(signInError.message)
                setLoading(false)
                return
            }

            if (data.user) {
                // Get user profile from database
                const { data: profile } = await supabase
                    .from('profiles')
                    .select('*')
                    .eq('id', data.user.id)
                    .single()

                localStorage.setItem('currentUser', JSON.stringify({
                    id: data.user.id,
                    name: profile?.full_name || data.user.email,
                    email: data.user.email,
                    isAdmin: false
                }))
                localStorage.removeItem('guestMode')
                navigate('/select-pet')
            }
        } catch (err) {
            setError('Login failed. Please try again.')
            console.error('Login error:', err)
        } finally {
            setLoading(false)
        }
    }

    const handleSignUp = async (e) => {
        e.preventDefault()
        setError('')
        setLoading(true)

        if (!formData.name || !formData.email || !formData.password) {
            setError('All fields are required')
            setLoading(false)
            return
        }

        if (formData.password.length < 6) {
            setError('Password must be at least 6 characters')
            setLoading(false)
            return
        }

        try {
            // Sign up with Supabase
            const { data, error: signUpError } = await supabase.auth.signUp({
                email: formData.email,
                password: formData.password,
                options: {
                    data: {
                        full_name: formData.name
                    }
                }
            })

            if (signUpError) {
                setError(signUpError.message)
                setLoading(false)
                return
            }

            if (data.user) {
                // Create profile in database
                const { error: profileError } = await supabase
                    .from('profiles')
                    .insert([{
                        id: data.user.id,
                        email: data.user.email,
                        full_name: formData.name,
                        created_at: new Date().toISOString()
                    }])

                if (profileError) {
                    console.error('Profile creation error:', profileError)
                }

                localStorage.setItem('currentUser', JSON.stringify({
                    id: data.user.id,
                    name: formData.name,
                    email: data.user.email,
                    isAdmin: false
                }))
                localStorage.removeItem('guestMode')

                setError('Account created! Please check your email to verify (or continue directly for demo).')
                setTimeout(() => navigate('/select-pet'), 2000)
            }
        } catch (err) {
            setError('Sign up failed. Please try again.')
            console.error('Sign up error:', err)
        } finally {
            setLoading(false)
        }
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

                        {/* Error/Success Message */}
                        {error && (
                            <motion.div
                                initial={{ opacity: 0, y: -10 }}
                                animate={{ opacity: 1, y: 0 }}
                                className={`mb-4 p-3 ${error.includes('created') ? 'bg-green-100 border-green-400 text-green-700' : 'bg-red-100 border-red-400 text-red-700'} border rounded-lg text-sm`}
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
                                        disabled={loading}
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
                                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                        className="w-full pl-10 pr-4 py-3 border-2 border-gray-200 rounded-lg focus:border-purple-500 focus:outline-none transition-colors"
                                        placeholder="you@example.com"
                                        required
                                        disabled={loading}
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
                                        disabled={loading}
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
                                className="w-full py-3 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-semibold rounded-lg shadow-lg disabled:opacity-50"
                                whileHover={{ scale: loading ? 1 : 1.02 }}
                                whileTap={{ scale: loading ? 1 : 0.98 }}
                                disabled={loading}
                            >
                                {loading ? 'Please wait...' : (isSignUp ? 'Sign Up' : 'Sign In')}
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
                                disabled={loading}
                            >
                                🎮 Continue as Guest
                            </button>
                        </div>

                        {/* Toggle Sign In/Sign Up */}
                        <div className="mt-6 text-center">
                            <button
                                onClick={() => setIsSignUp(!isSignUp)}
                                className="text-purple-600 hover:text-purple-700 font-semibold"
                                disabled={loading}
                            >
                                {isSignUp ? 'Already have an account? Sign In' : "Don't have an account? Sign Up"}
                            </button>
                        </div>

                        {/* Demo Credentials */}
                        <div className="mt-6 p-4 bg-purple-50 rounded-lg border border-purple-200">
                            <p className="text-xs font-semibold text-purple-800 mb-2">🔑 Demo Account:</p>
                            <div className="text-xs text-purple-700 font-mono space-y-1">
                                <div><span className="font-bold">Admin:</span> admin@intelligrow.com / admin@intelligrow2024</div>
                                <div><span className="font-bold">Or:</span> Sign up with any email!</div>
                            </div>
                        </div>
                    </div>
                </motion.div>
            </div>
        </div>
    )
}
