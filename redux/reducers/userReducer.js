import { createSlice } from '@reduxjs/toolkit'

const stateSlice = createSlice({
    name: 'user-state',

    initialState: {
        loading: false,
        is_logged_in: false,
        active: null,
    },

    reducers: {
        setActive: (state, action) => {
            state.active = action.payload;
        },

        setAuthenticated: (state, action) => {
            state.is_logged_in = action.payload
        },

        setLoading: (state, action) => {
            state.loading = action.payload;
        }
    }
})

export const { setLoading, setAuthenticated, setActive } = stateSlice.actions;

export default stateSlice.reducer;