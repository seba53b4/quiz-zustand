import * as React from "react";
import { useQuizStore } from "../states/quiz-state";

export interface IQuizProps {
  title: string;
  question: string;
  options: string[];
}

export function Quiz({ title, question, options }: IQuizProps) {
  const {
    questionMaxNumber,
    questionQuizNumber: currentQuestionNumber,
    questionState,
    answerQuestion,
    nextQuestion,
    previousQuestion,
  } = useQuizStore();

  // Encuentra la respuesta guardada para la pregunta actual
  const currentQuestionState = questionState.find(
    (q) => q.questionNumber === currentQuestionNumber
  );

  // Inicializa el estado local con la respuesta actual
  const [selectedOption, setSelectedOption] = React.useState<number | null>(
    currentQuestionState?.questionAnswer ?? null
  );

  // Sincroniza el estado local con el estado global
  React.useEffect(() => {
    setSelectedOption(currentQuestionState?.questionAnswer ?? null);
  }, [currentQuestionState]);

  // Guarda la respuesta en el estado global
  const saveAnswer = () => {
    if (selectedOption !== null) {
      answerQuestion(currentQuestionNumber, selectedOption);
    }
  };

  const handleOptionClick = (index: number) => {
    setSelectedOption(index);
  };

  const handleNextClick = () => {
    saveAnswer();
    nextQuestion();
    setSelectedOption(null);
  };

  const handlePreviousClick = () => {
    saveAnswer();
    previousQuestion();
    setSelectedOption(null);
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white shadow-lg rounded-lg p-8 max-w-md w-full">
        <h2 className="text-2xl font-bold text-center mb-4 text-blue-700">
          {title}
        </h2>
        <h3 className="text-lg font-semibold mb-6 text-gray-800">
          {currentQuestionNumber}. {question}
        </h3>

        {options && (
          <ul className="space-y-4 mb-6">
            {options.map((elem, index) => (
              <li
                key={index}
                className={`p-4 rounded-lg cursor-pointer transition ${
                  selectedOption === index
                    ? "bg-blue-500 text-white"
                    : "bg-blue-100 hover:bg-blue-200"
                }`}
                onClick={() => handleOptionClick(index)}
              >
                {elem}
              </li>
            ))}
          </ul>
        )}

        <div className="flex justify-between mt-4">
          <button
            onClick={handlePreviousClick}
            disabled={currentQuestionNumber === 1}
            className={`font-semibold py-2 px-4 rounded-lg shadow-md transition ${
              currentQuestionNumber === 1
                ? "bg-gray-400 text-white cursor-not-allowed"
                : "bg-gradient-to-r from-red-400 to-red-500 text-white hover:from-red-700 hover:to-red-800 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-opacity-50"
            }`}
          >
            Anterior
          </button>
          <button
            onClick={handleNextClick}
            disabled={currentQuestionNumber === questionMaxNumber}
            className={`font-semibold py-2 px-4 rounded-lg shadow-md transition ${
              currentQuestionNumber === questionMaxNumber
                ? "bg-gray-400 text-white cursor-not-allowed"
                : "bg-gradient-to-r from-green-500 to-green-600 text-white hover:from-green-800 hover:to-green-800 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-opacity-50"
            }`}
          >
            Siguiente
          </button>
        </div>
      </div>
    </div>
  );
}
