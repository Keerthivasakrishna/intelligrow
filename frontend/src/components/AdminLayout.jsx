import { Outlet, useNavigate } from 'react-router-dom'
import { LogOut, ShieldCheck, BarChart3, BookOpen, LayoutDashboard, Eye } from 'lucide-react'
import { useState } from 'react'

export default function AdminLayout() {
    const navigate = useNavigate()
    const [viewMode, setViewMode] = useState('admin') // 'admin' or 'student'

    const handleSignOut = () => {
        localStorage.removeItem('adminSession')
        localStorage.removeItem('currentUser')
        navigate('/')
    }

    const switchToStudentView = () => {
        // Admin switching to student view
        navigate('/dashboard')
    }

    const adminSession = JSON.parse(localStorage.getItem('adminSession') || '{}')

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900">
            {/* Admin Header */}
            <header className="glass-card m-4 p-4 flex justify-between items-center bg-white/5 border border-white/10">
                <div className="flex items-center gap-6">
                    <div className="flex items-center gap-3">
                        <ShieldCheck className="w-8 h-8 text-blue-400" />
                        <div>
                            <h1 className="text-2xl font-bold text-white">IntelliGrow Admin</h1>
                            <p className="text-xs text-gray-400">Institutional Control Panel</p>
                        </div>
                    </div>

                    {/* Navigation */}
                    <div className="flex gap-2">
                        <button
                            onClick={() => navigate('/admin/dashboard')}
                            className="flex items-center gap-2 px-4 py-2 bg-white/10 hover:bg-white/20 rounded-lg transition-all text-white"
                        >
                            <BarChart3 className="w-4 h-4" />
                            <span>Analytics</span>
                        </button>
                        <button
                            onClick={() => navigate('/admin/courses')}
                            className="flex items-center gap-2 px-4 py-2 bg-white/10 hover:bg-white/20 rounded-lg transition-all text-white"
                        >
                            <BookOpen className="w-4 h-4" />
                            <span>Manage Courses</span>
                        </button>
                    </div>
                </div>

                <div className="flex items-center gap-4">
                    {/* View Switcher */}
                    <button
                        onClick={switchToStudentView}
                        className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 rounded-lg transition-all text-white font-semibold"
                        title="Switch to Student View"
                    >
                        <Eye className="w-4 h-4" />
                        <span>View as Student</span>
                    </button>

                    {/* Admin Info */}
                    <div className="text-right">
                        <p className="text-sm font-semibold text-white flex items-center gap-2">
                            <ShieldCheck className="w-4 h-4 text-green-400" />
                            {adminSession.name || 'Administrator'}
                        </p>
                        <p className="text-xs text-gray-400">{adminSession.email}</p>
                    </div>

                    {/* Sign Out */}
                    <button
                        onClick={handleSignOut}
                        className="p-2 hover:bg-white/10 rounded-lg transition-all"
                        title="Sign Out"
                    >
                        <LogOut className="w-5 h-5 text-white" />
                    </button>
                </div>
            </header>

            {/* Main Content */}
            <main className="p-4">
                <Outlet />
            </main>

            {/* Footer */}
            <footer className="text-center p-4 text-gray-400 text-sm">
                <p>IntelliGrow Admin Portal • Administrator Access • {new Date().getFullYear()}</p>
            </footer>
        </div>
    )
}
