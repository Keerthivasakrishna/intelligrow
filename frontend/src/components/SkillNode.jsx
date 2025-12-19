import { Lock, Check, Circle } from 'lucide-react'
import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'

export default function SkillNode({ node }) {
    const navigate = useNavigate()

    const getNodeClass = () => {
        switch (node.status) {
            case 'locked':
                return 'node-locked'
            case 'available':
                return 'node-available'
            case 'in_progress':
                return 'node-in-progress'
            case 'completed':
                return 'node-completed'
            default:
                return 'node-locked'
        }
    }

    const getIcon = () => {
        switch (node.status) {
            case 'locked':
                return <Lock className="w-5 h-5" />
            case 'completed':
                return <Check className="w-5 h-5" />
            default:
                return <Circle className="w-5 h-5" />
        }
    }

    const handleClick = () => {
        if (node.status !== 'locked') {
            navigate(`/topics/${node.id}`)
        }
    }

    return (
        <motion.div
            className={`absolute glass-card p-4 border-2 transition-all duration-300 cursor-pointer ${getNodeClass()}`}
            style={{
                left: `${node.graph_position.x}px`,
                top: `${node.graph_position.y}px`,
                width: '200px',
            }}
            whileHover={node.status !== 'locked' ? { scale: 1.1, shadow: '0 0 30px rgba(139, 92, 246, 0.6)' } : {}}
            onClick={handleClick}
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
        >
            <div className="flex items-center gap-2 mb-2">
                {getIcon()}
                <span className="text-xs font-semibold uppercase tracking-wide text-gray-300">
                    {node.difficulty}
                </span>
            </div>
            <h4 className="font-bold text-sm mb-1">{node.title}</h4>
            {node.quiz_score !== null && node.quiz_score !== undefined && (
                <div className="text-xs text-gray-300 mt-2">
                    Score: {Math.round(node.quiz_score)}%
                </div>
            )}
        </motion.div>
    )
}
