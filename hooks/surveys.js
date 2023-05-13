import { useSelector, useDispatch } from "react-redux";
import { setStage, updateQids, setDescription, setTitle, updateQuestions } from "@/redux/reducers/surveyReducer";

const useSurveys = () => {
    const dispatch = useDispatch()
    const { stage, title, description, questions } = useSelector(state => state.survey)

    return {
        stage,
        title,
        description,
        questions,
        setDescription,
        setTitle,
        setStage,
        updateQuestions,
        updateQids,
        dispatch
    }
}

export default useSurveys;