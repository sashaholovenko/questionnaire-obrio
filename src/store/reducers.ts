// features/questionnaireSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    answers: {
        name: 'Sasha'
    },
};

const questionnaireSlice = createSlice({
    name: 'questionnaire',
    initialState,
    reducers: {
        saveAnswer: (state, action) => {
            state.answers[action.payload.screenId] = action.payload.answer;
        },
    },
});

export const { saveAnswer } = questionnaireSlice.actions;
export default questionnaireSlice.reducer;
