import { createSlice } from "@reduxjs/toolkit";
type MyState = {
  answers: any[];
  questionPosition: number;
};
const initialState = {
  answers: [],
  questionPosition: 0,
} as MyState;

const quizSlice = createSlice({
  name: "quiz",
  initialState,
  reducers: {
    startExamAction: (state, action) => {
      return {
        ...state,
        queue: action.payload,
      };
    },
    handleNext: (state, action) => {
      state.questionPosition = state.questionPosition + 1;
    },
    handlePrev: (state, action) => {
      state.questionPosition = state.questionPosition - 1;
    },
    handleAnswer: (state, action) => {
      state.answers.push(action.payload);
    },
    updateAnswer: (state, action) => {
      const { questionPosition, checked } = action.payload;
      state.answers.fill(checked, questionPosition, questionPosition + 1);
    },
    resetAll: (state, action) => {
      state.answers = [];
      state.questionPosition = 0;
    },
  },
});

export const {
  startExamAction,
  handleNext,
  handlePrev,
  handleAnswer,
  updateAnswer,
  resetAll,
} = quizSlice.actions;

export default quizSlice.reducer;
