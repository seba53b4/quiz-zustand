import create from "zustand";
import { persist } from "zustand/middleware";

type QuestionState = {
  questionNumber: number;
  questionAnswer: number | null;
};

type QuizActions = {
  addQuestionState: (questionState: QuestionState) => void;
  answerQuestion: (questionNumber: number, questionAnswer: number) => void;
  resetQuiz: () => void;
  nextQuestion: () => void;
  previousQuestion: () => void;
  setQuestionMaxNumber: (maxNumber: number) => void;
  startQuiz: () => Promise<void>;
};

type QuizState = {
  questionState: QuestionState[];
  questionQuizNumber: number;
  questionMaxNumber: number;
  isLoading: boolean;
};

export const useQuizStore = create<QuizState & QuizActions>()(
  persist(
    (set) => ({
      questionState: [],
      questionQuizNumber: 1,
      questionMaxNumber: 0,
      isLoading: false,
      addQuestionState: (questionState) =>
        set((state) => ({
          questionState: [...state.questionState, questionState],
        })),
      answerQuestion: (questionNumber, questionAnswer) =>
        set((state) => {
          const existingQuestion = state.questionState.find(
            (q) => q.questionNumber === questionNumber
          );

          if (existingQuestion) {
            return {
              questionState: state.questionState.map((q) =>
                q.questionNumber === questionNumber
                  ? { ...q, questionAnswer }
                  : q
              ),
            };
          } else {
            return {
              questionState: [
                ...state.questionState,
                { questionNumber, questionAnswer },
              ],
            };
          }
        }),
      resetQuiz: () =>
        set(() => ({
          questionState: [],
          questionQuizNumber: 1,
          questionMaxNumber: 0,
        })),
      nextQuestion: () =>
        set((state) => ({
          questionQuizNumber: state.questionQuizNumber + 1,
        })),
      previousQuestion: () =>
        set((state) => ({
          questionQuizNumber: state.questionQuizNumber - 1,
        })),
      setQuestionMaxNumber: (maxNumber) =>
        set(() => ({
          questionMaxNumber: maxNumber,
        })),
      startQuiz: async () => {
        set({ isLoading: true });
        await new Promise((resolve) => setTimeout(resolve, 1000));
        set({ isLoading: false });
      },
    }),
    {
      name: "quiz-storage", // Nombre clave en localStorage
      getStorage: () => localStorage, // O sessionStorage
    }
  )
);
