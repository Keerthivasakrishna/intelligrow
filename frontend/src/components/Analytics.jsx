import { TrendingUp, TrendingDown } from 'lucide-react'
import { motion } from 'framer-motion'

export default function Analytics({ strengths, weaknesses }) {
    return (
        <div className="space-y-6">
            {/* Strengths */}
            <div className="glass-card p-6">
                <div className="flex items-center gap-2 mb-4">
                    <TrendingUp className="w-5 h-5 text-green-400" />
                    <h3 className="text-lg font-bold">Strengths</h3>
                </div>
                {strengths && strengths.length > 0 ? (
                    <div className="space-y-3">
                        {strengths.map((item, index) => (
                            <motion.div
                                key={item.topic_id}
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: index * 0.1 }}
                            >
                                <div className="flex justify-between items-center mb-1">
                                    <span className="text-sm font-medium">{item.title}</span>
                                    <span className="text-green-400 font-bold">{Math.round(item.score)}%</span>
                                </div>
                                <div className="w-full bg-gray-700/50 rounded-full h-2">
                                    <div
                                        className="bg-green-500 h-2 rounded-full"
                                        style={{ width: `${item.score}%` }}
                                    />
                                </div>
                            </motion.div>
                        ))}
                    </div>
                ) : (
                    <p className="text-gray-400 text-sm">Complete quizzes to see your strengths!</p>
                )}
            </div>

            {/* Weaknesses */}
            <div className="glass-card p-6">
                <div className="flex items-center gap-2 mb-4">
                    <TrendingDown className="w-5 h-5 text-yellow-400" />
                    <h3 className="text-lg font-bold">Areas to Improve</h3>
                </div>
                {weaknesses && weaknesses.length > 0 ? (
                    <div className="space-y-3">
                        {weaknesses.map((item, index) => (
                            <motion.div
                                key={item.topic_id}
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: index * 0.1 }}
                            >
                                <div className="flex justify-between items-center mb-1">
                                    <span className="text-sm font-medium">{item.title}</span>
                                    <span className="text-yellow-400 font-bold">{Math.round(item.score)}%</span>
                                </div>
                                <div className="w-full bg-gray-700/50 rounded-full h-2">
                                    <div
                                        className="bg-yellow-500 h-2 rounded-full"
                                        style={{ width: `${item.score}%` }}
                                    />
                                </div>
                            </motion.div>
                        ))}
                    </div>
                ) : (
                    <p className="text-gray-400 text-sm">No weaknesses identified yet!</p>
                )}
            </div>
        </div>
    )
}
