import { configureStore } from '@reduxjs/toolkit'
import userReducer from '@/redux/reducers/userReducer'
import surveyReducer from './reducers/surveyReducer';

const store = configureStore({
    reducer: {
        auth: userReducer,
        survey: surveyReducer
    }
})

export default store;


