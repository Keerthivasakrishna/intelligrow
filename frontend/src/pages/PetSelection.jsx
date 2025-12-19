import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'

const pets = [
    { id: 'dog', emoji: '🐶', name: 'Dog', description: 'Loyal and energetic companion' },
    { id: 'cat', emoji: '🐱', name: 'Cat', description: 'Independent and curious friend' },
    { id: 'panda', emoji: '🐼', name: 'Red Panda', description: 'Playful and adorable buddy' },
    { id: 'rabbit', emoji: '🐰', name: 'Rabbit', description: 'Quick and clever helper' },
    { id: 'fox', emoji: '🦊', name: 'Fox', description: 'Cunning and swift learner' },
    { id: 'bear', emoji: '🐻', name: 'Bear', description: 'Strong and protective guide' },
    { id: 'penguin', emoji: '🐧', name: 'Penguin', description: 'Cool and determined spirit' },
    { id: 'koala', emoji: '🐨', name: 'Koala', description: 'Calm and focused mentor' },
]

export default function PetSelection() {
    const navigate = useNavigate()
    const [selectedPet, setSelectedPet] = useState(null)

    const handleSelect = (pet) => {
        setSelectedPet(pet)
    }

    const handleContinue = () => {
        if (!selectedPet) {
            alert('Please select a pet to continue!')
            return
        }

        localStorage.setItem('selectedPet', JSON.stringify(selectedPet))
        navigate('/dashboard')
    }

    return (
        <div className="min-h-screen flex items-center justify-center p-4">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="max-w-6xl w-full"
            >
                <div className="text-center mb-12">
                    <motion.h1
                        className="text-5xl font-bold mb-4 gradient-text"
                        initial={{ scale: 0.5 }}
                        animate={{ scale: 1 }}
                        transition={{ type: 'spring', duration: 0.5 }}
                    >
                        Choose Your Learning Companion! 🌟
                    </motion.h1>
                    <p className="text-gray-600 text-lg">
                        Select a pet that will grow with you on your learning journey
                    </p>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
                    {pets.map((pet, index) => (
                        <motion.div
                            key={pet.id}
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: index * 0.1 }}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            <button
                                onClick={() => handleSelect(pet)}
                                className={`w-full glass-card p-6 text-center transition-all duration-300 ${selectedPet?.id === pet.id
                                        ? 'ring-4 ring-primary-500 bg-primary-50 border-primary-500'
                                        : 'hover:shadow-xl'
                                    }`}
                            >
                                <div className="text-6xl mb-3 animate-float">{pet.emoji}</div>
                                <h3 className="font-bold text-xl mb-2 text-gray-800">{pet.name}</h3>
                                <p className="text-sm text-gray-600">{pet.description}</p>
                            </button>
                        </motion.div>
                    ))}
                </div>

                <div className="text-center">
                    <motion.button
                        onClick={handleContinue}
                        disabled={!selectedPet}
                        className={`glass-button text-xl px-12 py-4 ${!selectedPet ? 'opacity-50 cursor-not-allowed' : ''
                            }`}
                        whileHover={selectedPet ? { scale: 1.05 } : {}}
                        whileTap={selectedPet ? { scale: 0.95 } : {}}
                    >
                        Continue with {selectedPet ? selectedPet.name : 'Your Pet'}
                    </motion.button>
                </div>
            </motion.div>
        </div>
    )
}
