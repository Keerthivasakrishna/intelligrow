import { Outlet, useNavigate } from 'react-router-dom'
import { LogOut, ShieldCheck, BarChart3 } from 'lucide-react'

export default function AdminLayout() {
    const navigate = useNavigate()

    const handleSignOut = () => {
        localStorage.removeItem('adminSession')
        navigate('/admin')
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
                            <p className="text-xs text-gray-400">Institutional Analytics Portal</p>
                        </div>
                    </div>
                    <button
                        onClick={() => navigate('/admin/dashboard')}
                        className="flex items-center gap-2 px-4 py-2 bg-white/10 hover:bg-white/20 rounded-lg transition-all text-white"
                    >
                        <BarChart3 className="w-4 h-4" />
                        <span>Dashboard</span>
                    </button>
                </div>

                <div className="flex items-center gap-4">
                    <div className="text-right">
                        <p className="text-sm font-semibold text-white">{adminSession.email}</p>
                        <p className="text-xs text-gray-400">Administrator</p>
                    </div>
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
                <p>IntelliGrow Admin Portal • Read-Only Analytics • {new Date().getFullYear()}</p>
            </footer>
        </div>
    )
}
