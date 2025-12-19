import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useLocation } from 'react-router-dom'

const affirmations = [
    "You're doing amazing! 🌟",
    "Keep up the great work! 💪",
    "You're a learning superstar! ⭐",
    "Believe in yourself! You've got this! 🚀",
    "Every step forward is progress! 📈",
    "You're smarter than you think! 🧠",
    "Practice makes perfect! 🎯",
    "I'm so proud of you! 🎉",
    "You're on fire today! 🔥",
    "Learning is your superpower! 💫"
]

// Multiple entry animations - chosen randomly
const entryAnimations = [
    // Glide from left
    {
        name: 'glide',
        initial: { x: -250, opacity: 0 },
        animate: { x: 0, opacity: 1 },
        transition: { duration: 2.5, ease: [0.34, 1.56, 0.64, 1] }
    },
    // Roll in from right
    {
        name: 'roll',
        initial: { x: 250, opacity: 0, rotate: 360 },
        animate: { x: 0, opacity: 1, rotate: 0 },
        transition: { duration: 2.5, ease: "easeOut" }
    },
    // Drop and bounce
    {
        name: 'drop',
        initial: { y: -250, opacity: 0, scale: 0.3 },
        animate: { y: 0, opacity: 1, scale: 1 },
        transition: {
            duration: 2,
            type: "spring",
            stiffness: 150,
            damping: 12
        }
    },
    // Spin zoom in
    {
        name: 'spin',
        initial: { scale: 0, rotate: -360, opacity: 0 },
        animate: { scale: 1, rotate: 0, opacity: 1 },
        transition: { duration: 2.5, ease: [0.34, 1.56, 0.64, 1] }
    },
    // Spiral in
    {
        name: 'spiral',
        initial: { x: -200, y: -200, rotate: -720, scale: 0.2, opacity: 0 },
        animate: { x: 0, y: 0, rotate: 0, scale: 1, opacity: 1 },
        transition: { duration: 2.8, ease: "easeInOut" }
    },
    // Bounce from bottom
    {
        name: 'bounce',
        initial: { y: 250, opacity: 0 },
        animate: { y: 0, opacity: 1 },
        transition: {
            duration: 2.2,
            type: "spring",
            stiffness: 100,
            damping: 10
        }
    },
    // Flip and grow
    {
        name: 'flip',
        initial: { rotateY: 180, scale: 0.1, opacity: 0 },
        animate: { rotateY: 0, scale: 1, opacity: 1 },
        transition: { duration: 2.5, ease: "easeOut" }
    }
]

export default function AnimatedPetCompanion() {
    const location = useLocation()
    const [showAffirmation, setShowAffirmation] = useState(false)
    const [affirmation, setAffirmation] = useState('')
    const [currentAnimation, setCurrentAnimation] = useState(entryAnimations[0])
    const [animationKey, setAnimationKey] = useState(0)

    const selectedPet = JSON.parse(localStorage.getItem('selectedPet') || '{}')
    const petEmoji = selectedPet.emoji || '🐶'

    // Random animation on page transition
    useEffect(() => {
        const randomAnim = entryAnimations[Math.floor(Math.random() * entryAnimations.length)]
        setCurrentAnimation(randomAnim)
        setAnimationKey(prev => prev + 1)
    }, [location.pathname])

    // Show affirmations periodically
    useEffect(() => {
        const affirmationInterval = setInterval(() => {
            const randomAffirmation = affirmations[Math.floor(Math.random() * affirmations.length)]
            setAffirmation(randomAffirmation)
            setShowAffirmation(true)
            setTimeout(() => setShowAffirmation(false), 4000)
        }, 15000) // Every 15 seconds

        return () => clearInterval(affirmationInterval)
    }, [])

    const handlePetClick = () => {
        // Show affirmation on click
        const randomAffirmation = affirmations[Math.floor(Math.random() * affirmations.length)]
        setAffirmation(randomAffirmation)
        setShowAffirmation(true)
        setTimeout(() => setShowAffirmation(false), 4000)
    }

    return (
        <div className="fixed bottom-8 right-8 z-50 flex flex-col items-end gap-4 pointer-events-none">
            {/* Affirmation Speech Bubble */}
            <AnimatePresence>
                {showAffirmation && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.8, y: 20 }}
                        className="glass-card px-6 py-3 max-w-xs relative pointer-events-auto"
                    >
                        <div className="text-gray-800 font-semibold text-center">
                            {affirmation}
                        </div>
                        <div className="absolute bottom-[-8px] right-12 w-4 h-4 bg-white/90 rotate-45 border-b border-r border-gray-200"></div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Pet with random entry animations */}
            <motion.div
                key={animationKey}
                className="cursor-pointer select-none pointer-events-auto"
                initial={currentAnimation.initial}
                animate={{
                    ...currentAnimation.animate,
                    // Add continuous floating after entry
                    y: [0, -10, 0],
                }}
                transition={{
                    ...currentAnimation.transition,
                    y: {
                        duration: 3.5,
                        repeat: Infinity,
                        ease: "easeInOut",
                        delay: currentAnimation.transition.duration || 2
                    }
                }}
                whileHover={{
                    scale: 1.2,
                    rotate: 8,
                    transition: { duration: 0.4 }
                }}
                whileTap={{
                    y: -50,
                    scale: 1.1,
                    transition: {
                        type: "spring",
                        stiffness: 400,
                        damping: 10
                    }
                }}
                onClick={handlePetClick}
            >
                <div
                    className="text-9xl drop-shadow-2xl"
                    style={{
                        filter: 'drop-shadow(0 12px 30px rgba(0,0,0,0.2))'
                    }}
                >
                    {petEmoji}
                </div>
            </motion.div>

            {/* Glow effect */}
            <div className="absolute bottom-0 right-0 w-52 h-52 bg-primary-300 rounded-full blur-3xl opacity-25 -z-10 pointer-events-none"></div>
        </div>
    )
}
