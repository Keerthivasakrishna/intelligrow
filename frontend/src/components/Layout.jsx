import { Outlet, useNavigate } from 'react-router-dom'
import { LogOut, Home } from 'lucide-react'
import { supabase } from '../supabase'
import useStore from '../store/useStore'
import PetDisplay from './PetDisplay'
import AnimatedPetCompanion from './AnimatedPetCompanion'
import { useEffect } from 'react'

export default function Layout() {
    const navigate = useNavigate()
    const { user, userProfile, setSession, setUser, setUserProfile } = useStore()

    useEffect(() => {
        // Check for guest mode first
        const isGuest = localStorage.getItem('guestMode') === 'true'
        const currentUserData = localStorage.getItem('currentUser')
        const isEmailAuth = currentUserData && currentUserData !== 'null'

        if (isGuest) {
            const guestUser = JSON.parse(localStorage.getItem('guestUser'))
            setUser(guestUser)
            // Set guest profile
            setUserProfile({
                id: guestUser.id,
                email: guestUser.email,
                full_name: guestUser.user_metadata.full_name,
                avatar_url: guestUser.user_metadata.avatar_url,
                xp: 150, // Demo XP
                pet_level: 2 // Demo level
            })
            return
        }

        // Handle email/password users
        if (isEmailAuth) {
            const currentUser = JSON.parse(currentUserData)
            setUser({
                email: currentUser.email,
                user_metadata: {
                    full_name: currentUser.name,
                    avatar_url: `https://api.dicebear.com/7.x/avataaars/svg?seed=${currentUser.email}`
                }
            })
            setUserProfile({
                id: currentUser.email,
                email: currentUser.email,
                full_name: currentUser.name,
                avatar_url: `https://api.dicebear.com/7.x/avataaars/svg?seed=${currentUser.email}`,
                xp: 150, // Demo XP
                pet_level: 2 // Demo level
            })
            return
        }

        // Otherwise use Supabase auth
        supabase.auth.getSession().then(({ data: { session } }) => {
            setSession(session)
            setUser(session?.user ?? null)
        })

        // Listen for auth changes
        const {
            data: { subscription },
        } = supabase.auth.onAuthStateChange((_event, session) => {
            setSession(session)
            setUser(session?.user ?? null)

            // Check for email auth INSIDE the listener (not from closure)
            const currentUserCheck = localStorage.getItem('currentUser')
            const isEmailAuthNow = currentUserCheck && currentUserCheck !== 'null'

            // Only redirect if NO session AND NO email auth
            if (!session && !isEmailAuthNow) {
                console.log('No auth detected, redirecting...')
                navigate('/')
            }
        })

        return () => subscription.unsubscribe()
    }, [])

    useEffect(() => {
        const isGuest = localStorage.getItem('guestMode') === 'true'

        if (user && !isGuest) {
            fetchUserProfile()
        }
    }, [user])

    const fetchUserProfile = async () => {
        try {
            const session = await supabase.auth.getSession()
            const token = session.data.session?.access_token

            if (!token) return

            const response = await fetch('http://localhost:8000/api/users/me', {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })

            if (response.ok) {
                const profile = await response.json()
                setUserProfile(profile)
            }
        } catch (error) {
            console.error('Error fetching user profile:', error)
        }
    }

    const handleSignOut = async () => {
        // Clear guest mode
        localStorage.removeItem('guestMode')
        localStorage.removeItem('guestUser')
        // Clear email/password user
        localStorage.removeItem('currentUser')

        await supabase.auth.signOut()
        setUser(null)
        setUserProfile(null)
        navigate('/')
    }

    const handleHome = () => {
        navigate('/dashboard')
    }

    return (
        <div className="min-h-screen">
            {/* Header */}
            <header className="glass-card m-4 p-4 flex justify-between items-center">
                <div className="flex items-center gap-6">
                    <h1 className="text-2xl font-bold gradient-text cursor-pointer" onClick={handleHome}>
                        IntelliGrow
                    </h1>
                    <button
                        onClick={handleHome}
                        className="flex items-center gap-2 px-4 py-2 bg-white/50 hover:bg-white/70 rounded-lg transition-all text-gray-800"
                    >
                        <Home className="w-4 h-4" />
                        <span>Dashboard</span>
                    </button>
                    <button
                        onClick={() => navigate('/results')}
                        className="flex items-center gap-2 px-4 py-2 bg-white/50 hover:bg-white/70 rounded-lg transition-all text-gray-800"
                    >
                        <span>📊</span>
                        <span>Results</span>
                    </button>
                </div>

                <div className="flex items-center gap-4">
                    {userProfile && (
                        <PetDisplay level={userProfile.pet_level || 1} xp={userProfile.xp || 0} />
                    )}

                    {user && (
                        <div className="flex items-center gap-3">
                            {user.user_metadata?.avatar_url && (
                                <img
                                    src={user.user_metadata.avatar_url}
                                    alt="Avatar"
                                    className="w-10 h-10 rounded-full border-2 border-purple-400"
                                />
                            )}
                            <div className="text-sm">
                                <p className="font-semibold">{user.user_metadata?.full_name || user.email}</p>
                                <p className="text-gray-400 text-xs">{user.email}</p>
                            </div>
                            <button
                                onClick={handleSignOut}
                                className="ml-2 p-2 hover:bg-white/10 rounded-lg transition-all"
                                title="Sign Out"
                            >
                                <LogOut className="w-5 h-5" />
                            </button>
                        </div>
                    )}
                </div>
            </header>

            {/* Main Content */}
            <main className="p-4">
                <Outlet />
            </main>

            {/* Animated Pet Companion */}
            <AnimatedPetCompanion />
        </div>
    )
}
