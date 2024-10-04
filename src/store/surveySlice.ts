import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface SurveyState {
    answers: Record<string, any>;
}

const initialState: SurveyState = {
    answers: {
        name: 'Sasha'
    },
};

const surveySlice = createSlice({
    name: 'survey',
    initialState,
    reducers: {
        setAnswer: (state, action: PayloadAction<{ questionId: string; answer: any }>) => {
            state.answers[action.payload.questionId] = action.payload.answer;
        },
        clearAnswers: (state) => {
            state.answers = {};
        },
    },
});

export const { setAnswer, clearAnswers } = surveySlice.actions;

export default surveySlice.reducer;
