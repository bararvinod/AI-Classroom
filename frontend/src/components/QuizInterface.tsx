import React, { useState, useEffect } from 'react';

interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

interface QuizInterfaceProps {
  topic: string;
}

const QuizInterface: React.FC<QuizInterfaceProps> = ({ topic }) => {
  const [questions, setQuestions] = useState<QuizQuestion[]>([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showExplanation, setShowExplanation] = useState(false);
  const [score, setScore] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadQuiz();
  }, [topic]);

  const loadQuiz = async () => {
    setLoading(true);
    try {
      const response = await fetch(`http://localhost:3001/api/content/quiz?topic=${encodeURIComponent(topic)}`);
      const data = await response.json();
      setQuestions(data);
    } catch (error) {
      console.error('Error loading quiz:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAnswerSelect = (index: number) => {
    setSelectedAnswer(index);
  };

  const handleSubmitAnswer = () => {
    if (selectedAnswer === null) return;
    
    if (selectedAnswer === questions[currentQuestion].correctAnswer) {
      setScore(score + 1);
    }
    setShowExplanation(true);
  };

  const handleNextQuestion = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer(null);
      setShowExplanation(false);
    }
  };

  if (loading) {
    return <div className="text-center py-8">Loading quiz...</div>;
  }

  if (!questions.length) {
    return <div className="text-center py-8 text-gray-600">No quiz available</div>;
  }

  const question = questions[currentQuestion];

  return (
    <div className="space-y-6">
      {/* Progress */}
      <div className="flex justify-between items-center">
        <span className="text-sm font-medium text-gray-600">
          Question {currentQuestion + 1} of {questions.length}
        </span>
        <div className="text-sm font-bold text-indigo-600">Score: {score}</div>
      </div>

      {/* Question */}
      <div className="bg-indigo-50 rounded-lg p-6">
        <h3 className="text-xl font-bold text-gray-800 mb-6">{question.question}</h3>

        {/* Options */}
        <div className="space-y-3">
          {question.options.map((option, index) => (
            <label
              key={index}
              className={`block p-4 rounded-lg border-2 cursor-pointer transition-all ${
                selectedAnswer === index
                  ? 'border-indigo-600 bg-indigo-100'
                  : 'border-gray-300 bg-white hover:border-indigo-300'
              } ${showExplanation && index === question.correctAnswer ? 'border-green-600 bg-green-50' : ''}`}
            >
              <input
                type="radio"
                name="answer"
                value={index}
                checked={selectedAnswer === index}
                onChange={() => handleAnswerSelect(index)}
                disabled={showExplanation}
                className="mr-3"
              />
              <span className="text-gray-800">{option}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Explanation */}
      {showExplanation && (
        <div className={`p-6 rounded-lg ${
          selectedAnswer === question.correctAnswer
            ? 'bg-green-50 border border-green-200'
            : 'bg-red-50 border border-red-200'
        }`}>
          <h4 className="font-bold text-gray-800 mb-2">
            {selectedAnswer === question.correctAnswer ? '✓ Correct!' : '✗ Incorrect'}
          </h4>
          <p className="text-gray-700">{question.explanation}</p>
        </div>
      )}

      {/* Buttons */}
      <div className="flex gap-4">
        {!showExplanation ? (
          <button
            onClick={handleSubmitAnswer}
            disabled={selectedAnswer === null}
            className="flex-1 px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 disabled:opacity-50"
          >
            Submit Answer
          </button>
        ) : (
          <button
            onClick={handleNextQuestion}
            disabled={currentQuestion === questions.length - 1}
            className="flex-1 px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 disabled:opacity-50"
          >
            {currentQuestion === questions.length - 1 ? 'Quiz Complete!' : 'Next Question'}
          </button>
        )}
      </div>
    </div>
  );
};

export default QuizInterface;
