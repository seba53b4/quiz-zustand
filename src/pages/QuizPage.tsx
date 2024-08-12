import React, { useEffect } from "react";
import { Quiz } from "../quiz-component/QuizComponent";
import { useQuizStore } from "../states/quiz-state";
import { quizData } from "../data/mockQuizData";

const QuizPage = () => {
  const { questionQuizNumber, isLoading, setQuestionMaxNumber, startQuiz } =
    useQuizStore();

  useEffect(() => {
    startQuiz();
    setQuestionMaxNumber(quizData.length);
  }, [startQuiz, setQuestionMaxNumber]);

  return (
    <div className="quiz-page">
      {isLoading ? (
        <Loading />
      ) : (
        <Quiz
          title={quizData[questionQuizNumber - 1].title}
          options={quizData[questionQuizNumber - 1].options}
          question={quizData[questionQuizNumber - 1].question}
        />
      )}
    </div>
  );
};

const Loading: React.FC = () => (
  <div className="flex justify-center items-center min-h-screen bg-gray-100">
    <div className="animate-spin rounded-full h-32 w-32 border-t-4 border-blue-500"></div>
  </div>
);

export default QuizPage;
