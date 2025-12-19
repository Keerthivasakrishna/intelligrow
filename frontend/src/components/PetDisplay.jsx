import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'

export default function PetDisplay({ level = 1, xp = 0 }) {
    const navigate = useNavigate()
    const xpToNextLevel = 100
    const xpProgress = (xp % xpToNextLevel) / xpToNextLevel * 100

    // Get selected pet
    const selectedPet = JSON.parse(localStorage.getItem('selectedPet') || '{}')
    const petEmoji = selectedPet.emoji || '🐶'

    const handlePetClick = () => {
        navigate('/select-pet')
    }

    return (
        <motion.div
            className="glass-card px-4 py-3 flex items-center gap-3 cursor-pointer"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handlePetClick}
            title="Click to change your pet"
        >
            <div className="relative">
                <motion.div
                    className="text-4xl"
                    animate={{ y: [0, -5, 0] }}
                    transition={{ duration: 2, repeat: Infinity }}
                >
                    {petEmoji}
                </motion.div>
                <div className="absolute -bottom-1 -right-1 bg-primary-500 text-white text-xs font-bold rounded-full w-6 h-6 flex items-center justify-center">
                    {level}
                </div>
            </div>

            <div className="flex-1 min-w-[100px]">
                <div className="flex justify-between text-xs text-gray-700 mb-1">
                    <span className="font-semibold">Level {level}</span>
                    <span>{xp % xpToNextLevel}/{xpToNextLevel} XP</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                    <motion.div
                        className="bg-gradient-to-r from-primary-500 to-primary-600 h-2 rounded-full"
                        initial={{ width: 0 }}
                        animate={{ width: `${xpProgress}%` }}
                        transition={{ duration: 0.5 }}
                    />
                </div>
            </div>
        </motion.div>
    )
}
