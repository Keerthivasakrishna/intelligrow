import { create } from 'zustand'

const useStore = create((set) => ({
    // Auth state
    session: null,
    user: null,

    // User profile
    userProfile: null,
    userStats: null,

    // Current view
    currentSubject: null,
    currentTopic: null,

    // Loading states
    loading: false,

    // Actions
    setSession: (session) => set({ session }),
    setUser: (user) => set({ user }),
    setUserProfile: (userProfile) => set({ userProfile }),
    setUserStats: (userStats) => set({ userStats }),
    setCurrentSubject: (currentSubject) => set({ currentSubject }),
    setCurrentTopic: (currentTopic) => set({ currentTopic }),
    setLoading: (loading) => set({ loading }),
}))

export default useStore
