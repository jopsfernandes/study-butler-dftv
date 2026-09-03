import { useState } from 'react'
import { ArrowRight } from 'lucide-react'

type Answer = {
  id: string
  text: string
}

type QuizQuestion = {
  question: string
  answers: Answer[]
  correctAnswerId: string
}

const quizQuestions: QuizQuestion[] = [
  {
    question: "What is the capital of France?",
    answers: [
      { id: "a", text: "London" },
      { id: "b", text: "Berlin" },
      { id: "c", text: "Paris" },
      { id: "d", text: "Madrid" }
    ],
    correctAnswerId: "c"
  },
  {
    question: "Which planet is known as the Red Planet?",
    answers: [
      { id: "a", text: "Venus" },
      { id: "b", text: "Mars" },
      { id: "c", text: "Jupiter" },
      { id: "d", text: "Saturn" }
    ],
    correctAnswerId: "b"
  },
  {
    question: "Who painted the Mona Lisa?",
    answers: [
      { id: "a", text: "Vincent van Gogh" },
      { id: "b", text: "Pablo Picasso" },
      { id: "c", text: "Leonardo da Vinci" },
      { id: "d", text: "Michelangelo" }
    ],
    correctAnswerId: "c"
  }
]

export function Quiz() {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [selectedAnswerId, setSelectedAnswerId] = useState<string | null>(null)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [score, setScore] = useState(0)

  const currentQuestion = quizQuestions[currentQuestionIndex]

  const handleAnswerClick = (id: string) => {
    if (!isSubmitted) {
      setSelectedAnswerId(id)
      setIsSubmitted(true)
      if (id === currentQuestion.correctAnswerId) {
        setScore(score + 1)
      }
    }
  }

  const handleNextQuestion = () => {
    if (currentQuestionIndex < quizQuestions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1)
      setSelectedAnswerId(null)
      setIsSubmitted(false)
    }
  }

  const getButtonStyle = (id: string) => {
    if (!isSubmitted) {
      return 'bg-blue-500 hover:bg-blue-600 text-white'
    }
    if (id === currentQuestion.correctAnswerId) {
      return 'bg-green-500 text-white'
    }
    if (id === selectedAnswerId) {
      return 'bg-red-500 text-white'
    }
    return 'bg-gray-300 text-gray-700'
  }

  return (
    <div className="max-w-md mx-auto mt-10 p-6  rounded-lg ">
      <div className="mb-4 flex justify-between items-center">
        <h2 className="text-xl font-bold">Progresso</h2>
        <span className="text-lg font-semibold">
          {currentQuestionIndex + 1} / {quizQuestions.length}
        </span>
      </div>
      <div className="w-full bg-gray-200 rounded-full h-2.5 mb-6">
        <div 
          className="bg-emerald-600 h-2.5 rounded-full" 
          style={{ width: `${((currentQuestionIndex + 1) / quizQuestions.length) * 100}%` }}
        ></div>
      </div>
      <h2 className="text-2xl font-bold mb-4" id="quiz-question">{currentQuestion.question}</h2>
      <div className="space-y-2" role="radiogroup" aria-labelledby="quiz-question">
        {currentQuestion.answers.map((answer) => (
          <button
            key={answer.id}
            onClick={() => handleAnswerClick(answer.id)}
            className={`w-full p-4 rounded-lg transition-colors duration-200 ${getButtonStyle(answer.id)}`}
            disabled={isSubmitted}
            role="radio"
            aria-checked={selectedAnswerId === answer.id}
          >
            {answer.text}
          </button>
        ))}
      </div>
      {isSubmitted && (
        <div className="mt-4 p-2 rounded text-center font-bold">
          {selectedAnswerId === currentQuestion.correctAnswerId ? (
            <span className="text-green-600"></span>
          ) : (
            <span className="text-red-600"></span>
          )}
        </div>
      )}
      {isSubmitted && currentQuestionIndex < quizQuestions.length - 1 && (
        <button
          onClick={handleNextQuestion}
          className="mt-4 w-full p-4 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors duration-200 flex items-center justify-center"
          aria-label="Next question"
        >
          Próximo
          <ArrowRight className="ml-2 h-5 w-5" />
        </button>
      )}
      {currentQuestionIndex === quizQuestions.length - 1 && isSubmitted && (
        <div className="mt-4 p-4 bg-green-100 text-green-800 rounded-lg text-center">
          <h3 className="text-xl font-bold mb-2">Questões Concluídas!</h3>
          <p>Sua pontuação final foi: {score} de {quizQuestions.length}</p>
        </div>
      )}
    </div>
  )
}