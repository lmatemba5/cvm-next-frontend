import { useEffect, useState } from 'react';
import useSurveys from '@/hooks/surveys';
import CreateQuestion from './createQuestion';


function Questions({ goNext, setSubtitle }) {
    let { setStage, questions, updateQids, updateQuestions, dispatch } = useSurveys()

    const [error, setError] = useState(null)

    const [question, updateCurrentQuestion] = useState({
        id: questions.length + 1,
        type: 'structured',
    })

    const addQuest = () => {
        if (!question.text) {
            setError('question is required')
            return;
        }

        if (question.type.startsWith('multi')) {
            if (question?.options === undefined || question?.options?.length < 0) {
                setError('at least 1  option is required')
                return;
            }
        }

        dispatch(updateQuestions([...questions, question]))
    }

    const remove = (id) => {
        questions = questions.filter(pred => pred.id !== id)
        dispatch(updateQuestions([...questions]))
        dispatch(updateQids())
    }

    const handleNext = () => {
        if (questions.length > 0) {
            goNext()
        } else {
            addQuest()
        }
    }

    useEffect(() => {
        setSubtitle("Make questions and their suggested answers.")
        setError(null)
        updateCurrentQuestion({
            id: questions.length + 1,
            type: 'structured',
            text: ''
        })
    }, [questions, setSubtitle])

    return (
        <div className="px-4 grid grid-cols-1">
            {
                questions.map((qn, index) => {
                    return (
                        <CreateQuestion number={index + 1} qn={qn} key={index} remove={remove} />
                    )
                })
            }

            <CreateQuestion trigger={addQuest} qn={question} error={error} updateQuestion={updateCurrentQuestion} />

            <div className='flex items-center justify-between mt-3 mb-0'>
                <button onClick={() => dispatch(setStage(0))}
                    className="inline-block rounded bg-slate-700 px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-slate-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-slate-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-slate-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]"
                    data-te-ripple-init
                    data-te-ripple-color="light"
                >
                    Back
                </button>
                <button onClick={handleNext}
                    className="inline-block rounded bg-primary px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]"
                    data-te-ripple-init
                    data-te-ripple-color="light"
                >
                    Finish
                </button>
            </div>
        </div>
    );
}

export default Questions;