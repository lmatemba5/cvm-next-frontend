import { createSlice } from '@reduxjs/toolkit'

const surveySlice = createSlice({
    name: 'survey-state',

    initialState: {
        stage: 0,
        title: null,
        description: null,
        questions: [],
    },

    reducers: {

        updateQids: state => {
            const copy = state.questions

            copy.map((qn, index) => {
                qn.id = index + 1
                return qn
            })

            state.questions = copy
        },

        setStage: (state, action) => {
            state.stage = action.payload
        },

        setTitle: (state, action) => {
            state.title = action.payload
        },

        setDescription: (state, action) => {
            state.description = action.payload
        },

        updateQuestions: (state, action) => {
            state.questions = action.payload
        },
    }
})

export const { updateQids, setStage, setTitle, setDescription, updateQuestions } = surveySlice.actions;

export default surveySlice.reducer;