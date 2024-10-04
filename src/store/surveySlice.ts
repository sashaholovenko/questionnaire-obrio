import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface SurveyState {
    answers: Record<string, string>;
    questionary: string
}

const initialState: SurveyState = {
    answers: {
    },
    questionary: ''
};

const surveySlice = createSlice({
    name: 'survey',
    initialState,
    reducers: {
        setAnswer: (state, action: PayloadAction<{ questionId: string; answer: string }>) => {
            state.answers[action.payload.questionId] = action.payload.answer;
        },
        setQuestionary: (state, action: PayloadAction<string>) => {
            state.questionary = action.payload
        },
        clearAnswers: (state) => {
            state.answers = {};
        },
    },
});

export const { setAnswer, clearAnswers, setQuestionary } = surveySlice.actions;

export default surveySlice.reducer;
