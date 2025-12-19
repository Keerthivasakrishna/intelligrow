// Enhanced AI Service for Subject-Specific Deep Analysis

const GEMINI_API_KEY = import.meta.env.VITE_GEMINI_API_KEY
const GEMINI_API_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent'

// Map topic IDs to subjects
const TOPIC_TO_SUBJECT = {
    '1': 'DSA', '2': 'DSA', '3': 'DSA', '4': 'DSA', '5': 'DSA', '6': 'DSA',
    '7': 'DSA', '8': 'DSA', '9': 'DSA', '10': 'DSA', '11': 'DSA', '12': 'DSA',
    '13': 'CN', '14': 'CN', '15': 'CN', '16': 'CN', '17': 'CN', '18': 'CN',
    '19': 'CN', '20': 'CN', '21': 'CN', '22': 'CN',
    '23': 'OS', '24': 'OS', '25': 'OS', '26': 'OS', '27': 'OS', '28': 'OS',
    '29': 'OS', '30': 'OS', '31': 'OS', '32': 'OS'
}

export async function generateSubjectAnalysis(quizHistory, subjectCode) {
    if (!quizHistory || quizHistory.length === 0) {
        return getEmptySubjectInsights(subjectCode)
    }

    // Filter quiz history by subject
    const subjectQuizzes = quizHistory.filter(quiz =>
        TOPIC_TO_SUBJECT[quiz.topicId] === subjectCode
    )

    if (subjectQuizzes.length === 0) {
        return getEmptySubjectInsights(subjectCode)
    }

    // Prepare detailed question-level analysis
    const detailedAnalysis = prepareDetailedAnalysis(subjectQuizzes, subjectCode)

    const prompt = `You are Dr. AI Learning Coach - an expert Computer Science educator and cognitive psychologist analyzing a student's deep learning patterns in ${getSubjectFullName(subjectCode)}.

**MISSION**: Provide the MOST COMPREHENSIVE, DETAILED, ACTIONABLE learning analysis possible.

**Student Performance Data:**
${JSON.stringify(detailedAnalysis, null, 2)}

**CRITICAL INSTRUCTIONS:**
1. Analyze EVERY question answered - identify patterns in mistakes
2. Reference SPECIFIC topics by name (e.g., "Arrays", "Network Fundamentals")
3. Mention EXACT concepts from CS curriculum
4. Provide DEEP technical insights, not surface-level advice
5. Use learning science principles (spaced repetition, active recall, etc.)
6. Give CONCRETE action items with resources

**Your Extensive Analysis JSON Format:**

{
  "overallPerformance": "2-3 sentences: Technical assessment + Learning velocity + Cognitive strengths observed",
  
  "detailedStrengths": [
    {
      "topic": "Exact topic name",
      "score": percentage,
      "insight": "What this reveals about their understanding",
      "cognitiveStrength": "Mental model they've built (e.g., 'strong pattern recognition in time complexity')"
    }
  ],
  
  "detailedWeaknesses": [
    {
      "topic": "Exact topic name",
      "score": percentage,
      "rootCause": "Why they're struggling (e.g., 'confusion between O(n) and O(log n)')",
      "impact": "How this affects broader understanding",
      "priority": "high/medium/low"
    }
  ],
  
  "topicBreakdown": [
    {
      "topic": "Exact topic from quiz",
      "score": percentage,
      "status": "mastered/proficient/developing/struggling",
      "specificConcepts": ["List exact concepts tested"],
      "masteredAspects": ["What they clearly understand"],
      "needsWork": ["Specific areas needing improvement"],
      "nextSteps": "Immediate action for this topic"
    }
  ],
  
  "learningPatterns": {
    "strengths": ["Observed learning strengths (e.g., 'Quick grasp of visual concepts')"],
    "challenges": ["Learning challenges noted"],
    "optimalApproach": "Recommended learning style based on performance",
    "timeManagement": "Insights on quiz-taking patterns"
  },
  
  "conceptualGaps": [
    {
      "concept": "Specific CS concept missing",
      "relatedTopics": ["Topics affected by this gap"],
      "severity": "critical/important/minor",
      "explanation": "Why this concept matters",
      "fillStrategy": "How to address this gap"
    }
  ],
  
  "detailedRecommendations": [
    {
      "priority": 1,
      "action": "Specific action to take",
      "why": "Reasoning behind this recommendation",
      "how": "Step-by-step approach",
      "resources": "What to use (videos, practice, etc.)",
      "timeEstimate": "Hours/days needed"
    }
  ],
  
  "comprehensiveStudyPlan": {
    "immediate": {
      "today": "What to do in next 2 hours",
      "thisWeek": ["Day-by-day breakdown for this week"]
    },
    "shortTerm": {
      "week1": {"topics": ["List"], "goals": "Learning objectives", "practice": "Problems to solve"},
      "week2": {"topics": ["List"], "goals": "Learning objectives", "practice": "Problems to solve"},
      "week3": {"topics": ["List"], "goals": "Consolidation goals", "practice": "Advanced problems"},
      "week4": {"review": "What to review", "assessment": "Self-test strategy"}
    },
    "learningTechniques": [
      "Specific techniques for this subject (e.g., 'Draw array visualizations', 'Create network diagrams')"
    ],
    "memoryStrategies": [
      "Concrete memory aids (mnemonics, analogies, visual associations)"
    ]
  },
  
  "priorityFocusAreas": [
    {
      "topic": "Most important topic to master",
      "reason": "Why this is priority #1",
      "quickWins": ["Easy improvements to make"],
      "studyApproach": "Optimal way to study this"
    }
  ],
  
  "progressMetrics": {
    "currentMastery": "X% of subject mastered",
    "projectedImprovement": "Expected improvement with recommended plan",
    "strengthsToLeverage": ["How to use strengths to improve weaknesses"],
    "milestones": ["Concrete goals to hit (e.g., '80% on Arrays by end of week')"]
    },
  
  "motivationalInsights": {
    "wins": ["Specific accomplishments to celebrate"],
    "growthPotential": "Realistic assessment of improvement potential",
    "encouragement": "Personalized motivational message"
  }
}

**REQUIREMENTS - EXTENSIVEANALYSIS:**
1. Be DEEPLY SPECIFIC - cite exact topics, scores, concepts
2. Provide ACTIONABLE steps, not vague advice
3. Use REAL CS terminology and concepts
4. Reference question patterns from their actual quiz data
5. Give MULTIPLE study strategies (visual, verbal, kinesthetic)
6. Include LEARNING SCIENCE principles (retrieval practice, interleaving, etc.)
7. Provide TIME estimates for study activities
8. Create DETAILED 4-week study roadmap
9. Include MEMORY techniques specific to CS concepts
10. Offer CONCRETE resources (what to watch, practice, review)

Return ONLY valid JSON, no markdown. Be as comprehensive and detailed as possible.`

    try {
        const response = await fetch(`${GEMINI_API_URL}?key=${GEMINI_API_KEY}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                contents: [{ parts: [{ text: prompt }] }],
                generationConfig: {
                    temperature: 0.8,
                    topK: 40,
                    topP: 0.95,
                    maxOutputTokens: 4096,
                }
            })
        })

        if (!response.ok) {
            console.error('Gemini API error:', response.status)
            return getDetailedFallbackAnalysis(detailedAnalysis, subjectCode)
        }

        const data = await response.json()
        const aiResponse = data.candidates[0].content.parts[0].text

        // Extract JSON from response
        const jsonMatch = aiResponse.match(/\{[\s\S]*\}/)
        if (jsonMatch) {
            const insights = JSON.parse(jsonMatch[0])
            return insights
        }

        return getDetailedFallbackAnalysis(detailedAnalysis, subjectCode)
    } catch (error) {
        console.error('Error generating subject analysis:', error)
        return getDetailedFallbackAnalysis(detailedAnalysis, subjectCode)
    }
}

function prepareDetailedAnalysis(subjectQuizzes, subjectCode) {
    const topicPerformance = {}
    const questionsAnalysis = []

    subjectQuizzes.forEach(quiz => {
        const topicName = quiz.topicTitle || `Topic ${quiz.topicId}`

        // Track topic-level performance
        if (!topicPerformance[topicName]) {
            topicPerformance[topicName] = {
                totalAttempts: 0,
                correctAnswers: 0,
                totalQuestions: 0,
                percentage: 0
            }
        }

        topicPerformance[topicName].totalAttempts++
        topicPerformance[topicName].correctAnswers += quiz.score
        topicPerformance[topicName].totalQuestions += quiz.totalQuestions

        // Track individual questions
        if (quiz.questionsData) {
            quiz.questionsData.forEach(q => {
                questionsAnalysis.push({
                    topic: topicName,
                    question: q.question,
                    isCorrect: q.isCorrect,
                    timestamp: quiz.timestamp
                })
            })
        }
    })

    // Calculate percentages
    Object.keys(topicPerformance).forEach(topic => {
        const data = topicPerformance[topic]
        data.percentage = Math.round((data.correctAnswers / data.totalQuestions) * 100)
    })

    return {
        subject: getSubjectFullName(subjectCode),
        subjectCode,
        totalQuizzesTaken: subjectQuizzes.length,
        topicPerformance,
        questionsAnalysis,
        recentQuizzes: subjectQuizzes.slice(-3).map(q => ({
            topic: q.topicTitle,
            score: q.score,
            total: q.totalQuestions,
            percentage: Math.round(q.percentage),
            date: new Date(q.timestamp).toLocaleDateString()
        }))
    }
}

function getDetailedFallbackAnalysis(analysisData, subjectCode) {
    const { topicPerformance, questionsAnalysis } = analysisData
    const topics = Object.keys(topicPerformance)

    // Find strong topics (>70%)
    const strongTopics = topics.filter(t => topicPerformance[t].percentage >= 70)
    // Find weak topics (<60%)
    const weakTopics = topics.filter(t => topicPerformance[t].percentage < 60)
    // Moderate topics
    const moderateTopics = topics.filter(t =>
        topicPerformance[t].percentage >= 60 && topicPerformance[t].percentage < 70
    )

    // Analyze wrong answers
    const wrongQuestions = questionsAnalysis.filter(q => !q.isCorrect)
    const conceptualGaps = [...new Set(wrongQuestions.map(q => q.topic))]

    return {
        overallPerformance: topicPerformance[topics[0]]?.percentage >= 70
            ? `Strong foundation in ${getSubjectFullName(subjectCode)}. Continue building on your knowledge.`
            : `Building your understanding of ${getSubjectFullName(subjectCode)}. Focus on fundamentals for improvement.`,

        strengths: strongTopics.length > 0
            ? strongTopics.map(t => `${t}: ${topicPerformance[t].percentage}% - Excellent grasp of core concepts`)
            : ['Complete more quizzes to identify your strengths'],

        weaknesses: weakTopics.length > 0
            ? weakTopics.map(t => `${t}: ${topicPerformance[t].percentage}% - Needs significant practice and review`)
            : ['No major weaknesses identified - keep learning!'],

        topicBreakdown: topics.map(topic => ({
            topic,
            score: topicPerformance[topic].percentage,
            status: topicPerformance[topic].percentage >= 70 ? 'strong'
                : topicPerformance[topic].percentage >= 60 ? 'moderate' : 'weak',
            details: `Answered ${topicPerformance[topic].correctAnswers} out of ${topicPerformance[topic].totalQuestions} questions correctly`
        })),

        conceptualGaps: conceptualGaps.length > 0
            ? conceptualGaps.map(gap => `Review fundamental concepts in ${gap}`)
            : ['No specific gaps identified yet'],

        recommendations: [
            weakTopics.length > 0
                ? `Priority: Review ${weakTopics[0]} - watch video tutorials and practice problems`
                : 'Continue exploring new topics in ' + getSubjectFullName(subjectCode),
            'Practice regularly with varied question types',
            'Focus on understanding concepts, not just memorizing',
            moderateTopics.length > 0
                ? `Strengthen your understanding of ${moderateTopics[0]}`
                : 'Attempt more challenging topics'
        ],

        focusAreas: weakTopics.length > 0
            ? weakTopics.slice(0, 3)
            : moderateTopics.slice(0, 3),

        studyPlan: [
            `Week 1: Master ${weakTopics[0] || topics[0] || 'fundamental concepts'}`,
            `Week 2: Apply concepts through practice problems`,
            `Practice: Retake quizzes to improve scores`
        ]
    }
}

function getEmptySubjectInsights(subjectCode) {
    return {
        overallPerformance: `Start your ${getSubjectFullName(subjectCode)} journey! Take your first quiz to get personalized insights.`,
        strengths: ['No data yet - complete quizzes to identify strengths'],
        weaknesses: [],
        topicBreakdown: [],
        conceptualGaps: ['Complete quizzes to identify knowledge gaps'],
        recommendations: [
            `Begin with fundamental topics in ${getSubjectFullName(subjectCode)}`,
            'Watch video tutorials before attempting quizzes',
            'Take notes while learning new concepts',
            'Practice regularly for best results'
        ],
        focusAreas: [],
        studyPlan: [
            'Week 1: Start with beginner topics',
            'Week 2: Build on fundamentals',
            'Practice: Complete at least 3 quizzes per week'
        ]
    }
}

function getSubjectFullName(code) {
    const names = {
        'DSA': 'Data Structures & Algorithms',
        'CN': 'Computer Networks',
        'OS': 'Operating Systems'
    }
    return names[code] || code
}

// Legacy function for overall insights (keep for Results page)
export async function generateLearningInsights(quizHistory) {
    // Group by subject and get insights for each
    const dsa = await generateSubjectAnalysis(quizHistory, 'DSA')
    const cn = await generateSubjectAnalysis(quizHistory, 'CN')
    const os = await generateSubjectAnalysis(quizHistory, 'OS')

    // Combine for overall insights
    const allStrengths = [...(dsa.strengths || []), ...(cn.strengths || []), ...(os.strengths || [])]
    const allWeaknesses = [...(dsa.weaknesses || []), ...(cn.weaknesses || []), ...(os.weaknesses || [])]
    const allRecommendations = [...(dsa.recommendations || []), ...(cn.recommendations || []), ...(os.recommendations || [])]

    return {
        strengths: allStrengths.slice(0, 5),
        weaknesses: allWeaknesses.slice(0, 5),
        recommendations: allRecommendations.slice(0, 6),
        overallPerformance: '🚀 Making great progress across multiple subjects!',
        focusAreas: [...(dsa.focusAreas || []), ...(cn.focusAreas || []), ...(os.focusAreas || [])].slice(0, 5)
    }
}

export default { generateSubjectAnalysis, generateLearningInsights }
