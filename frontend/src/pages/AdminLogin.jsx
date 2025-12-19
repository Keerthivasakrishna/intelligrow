import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ShieldCheck, Mail, Lock, Eye, EyeOff, BarChart3, Users, TrendingUp } from 'lucide-react'

const ADMIN_CREDENTIALS = {
    email: 'admin@intelligrow.com',
    password: 'admin@intelligrow2024'
}

export default function AdminLogin() {
    const navigate = useNavigate()
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    })
    const [showPassword, setShowPassword] = useState(false)
    const [error, setError] = useState('')

    const handleSubmit = (e) => {
        e.preventDefault()
        setError('')

        if (formData.email === ADMIN_CREDENTIALS.email && formData.password === ADMIN_CREDENTIALS.password) {
            // Set admin session
            localStorage.setItem('adminSession', JSON.stringify({
                isAdmin: true,
                email: ADMIN_CREDENTIALS.email,
                loginTime: new Date().toISOString()
            }))
            navigate('/admin/dashboard')
        } else {
            setError('Invalid admin credentials')
        }
    }

    const features = [
        { icon: BarChart3, text: 'Comprehensive Analytics', color: 'text-blue-400' },
        { icon: Users, text: 'Student Performance Tracking', color: 'text-indigo-400' },
        { icon: TrendingUp, text: 'Learning Path Insights', color: 'text-purple-400' }
    ]

    return (
        <div className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900">
            {/* Animated Background */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <motion.div
                    className="absolute top-20 left-20 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl"
                    animate={{
                        scale: [1, 1.2, 1],
                        opacity: [0.3, 0.5, 0.3]
                    }}
                    transition={{ duration: 8, repeat: Infinity }}
                />
                <motion.div
                    className="absolute bottom-20 right-20 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl"
                    animate={{
                        scale: [1.2, 1, 1.2],
                        opacity: [0.5, 0.3, 0.5]
                    }}
                    transition={{ duration: 8, repeat: Infinity, delay: 1 }}
                />
            </div>

            <div className="max-w-5xl w-full grid md:grid-cols-2 gap-8 items-center relative z-10">
                {/* Left Side - Branding */}
                <motion.div
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8 }}
                    className="text-left space-y-6"
                >
                    <div className="flex items-center gap-3 mb-6">
                        <ShieldCheck className="w-16 h-16 text-blue-400" />
                        <div>
                            <h1 className="text-5xl font-black text-white">
                                IntelliGrow
                            </h1>
                            <p className="text-blue-300 text-lg font-semibold">Admin Portal</p>
                        </div>
                    </div>

                    <p className="text-2xl text-gray-300 font-medium">
                        Institutional Learning Analytics & Monitoring
                    </p>

                    {/* Features */}
                    <div className="space-y-4 mt-8">
                        {features.map((feature, idx) => (
                            <motion.div
                                key={idx}
                                className="glass-card p-4 bg-white/5 border border-white/10"
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.2 * idx }}
                            >
                                <div className="flex items-center gap-3">
                                    <feature.icon className={`w-6 h-6 ${feature.color}`} />
                                    <span className="text-white font-semibold">{feature.text}</span>
                                </div>
                            </motion.div>
                        ))}
                    </div>

                    {/* Stats */}
                    <div className="flex gap-8 mt-8">
                        <div>
                            <div className="text-4xl font-bold text-blue-400">20</div>
                            <div className="text-sm text-gray-400">Students</div>
                        </div>
                        <div>
                            <div className="text-4xl font-bold text-indigo-400">32</div>
                            <div className="text-sm text-gray-400">Topics</div>
                        </div>
                        <div>
                            <div className="text-4xl font-bold text-purple-400">3</div>
                            <div className="text-sm text-gray-400">Subjects</div>
                        </div>
                    </div>
                </motion.div>

                {/* Right Side - Login Form */}
                <motion.div
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                >
                    <div className="glass-card p-10 backdrop-blur-xl bg-white/90 shadow-2xl">
                        {/* Header */}
                        <div className="text-center mb-8">
                            <motion.div
                                className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 mb-4"
                                animate={{
                                    rotate: [0, 5, -5, 0],
                                }}
                                transition={{ duration: 3, repeat: Infinity }}
                            >
                                <ShieldCheck className="w-10 h-10 text-white" />
                            </motion.div>
                            <h2 className="text-3xl font-bold text-gray-800 mb-2">
                                Admin Access
                            </h2>
                            <p className="text-gray-600">
                                Sign in to access institutional analytics
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
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-2">
                                    Admin Email
                                </label>
                                <div className="relative">
                                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                                    <input
                                        type="email"
                                        value={formData.email}
                                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                        className="w-full pl-10 pr-4 py-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:outline-none transition-colors"
                                        placeholder="admin@intelligrow.com"
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
                                        className="w-full pl-10 pr-12 py-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:outline-none transition-colors"
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
                                className="w-full py-3 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold rounded-lg shadow-lg"
                                whileHover={{ scale: 1.02, boxShadow: '0 15px 40px rgba(59, 130, 246, 0.4)' }}
                                whileTap={{ scale: 0.98 }}
                            >
                                Sign In to Dashboard
                            </motion.button>
                        </form>

                        {/* Demo Credentials */}
                        <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
                            <p className="text-xs font-semibold text-blue-800 mb-2">🔑 Demo Admin Credentials:</p>
                            <div className="space-y-1 text-xs text-blue-700 font-mono">
                                <div>📧 admin@intelligrow.com</div>
                                <div>🔑 admin@intelligrow2024</div>
                            </div>
                        </div>

                        {/* Back to Student Portal */}
                        <div className="mt-6 text-center">
                            <button
                                onClick={() => navigate('/')}
                                className="text-sm text-gray-600 hover:text-gray-800 font-semibold"
                            >
                                ← Back to Student Portal
                            </button>
                        </div>

                        {/* Footer */}
                        <p className="text-gray-500 text-xs text-center mt-6">
                            Admin access only • Read-only analytics
                        </p>
                    </div>
                </motion.div>
            </div>
        </div>
    )
}
