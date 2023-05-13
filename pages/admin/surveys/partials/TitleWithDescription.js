import useSurveys from "@/hooks/surveys";
import { useEffect, useState } from "react";

const TitleWithDescription = ({ setSubtitle, goNext, }) => {
    const { stage, title, description, setTitle, setDescription, questions, dispatch } = useSurveys();

    const [errors, setErrors] = useState({
        hideDescError: true,
        hideTitleError: true,
        error: null
    })

    const validatePageData = (event) => {
        event.preventDefault()

        if (event.target.title.value.length === 0) {
            setErrors({ ...errors, error: "title is required", hideTitleError: false })
            return;
        }

        if (event.target.description.value.length === 0) {
            setErrors({ ...errors, error: "description is required", hideDescError: false })
            return;
        }

        goNext()
    }

    const changeTitle = (event) => {
        dispatch(setTitle(event.target.value))
    }

    const changeDescription = (event) => {
        dispatch(setDescription(event.target.value))
    }

    useEffect(() => {
        setSubtitle("Provide title and a short description of the survey below.")
    }, [setSubtitle])

    return (
        <div className="abolute px-4 grid grid-cols-1 pb-0">
            <form onSubmit={validatePageData}>
                <div className='mb-3'>
                    <label>Survey Title</label>
                    <input type="text" onChange={changeTitle} defaultValue={title} name="title" className="mt-1 block w-full px-3 py-2 bg-white border-2 rounded-md focus:outline-none focus:border-sky-500" />
                </div>
                <div className="text-red-500 my-3" hidden={errors.hideTitleError}>
                    <label>{errors.error}</label>
                </div>
                <div className='mt-0'>
                    <label>Survey Description</label>
                    <textarea type="text" name="description" onChange={changeDescription} defaultValue={description} className="mt-1 h-40 max-h-40 block w-full px-3 py-2 bg-white border-2 rounded-md focus:outline-none focus:border-sky-500"></textarea>
                </div>
                <div className={`flex items-center ${stage === 0 ? 'justify-end' : 'justify-between'} mt-3 mb-0`}>
                    <button type="button"
                        className={`${stage === 0 ? 'hidden' : ''} inline-block rounded bg-gray-500 px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-gray-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-gray-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-gray-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]`}
                        data-te-ripple-init
                        data-te-ripple-color="light"
                    >
                        Back
                    </button>
                    <button type="submit"
                        className="inline-block rounded bg-primary px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]"
                        data-te-ripple-init
                        data-te-ripple-color="light"
                    >
                        {
                            questions.length > 0 ? "Save" : "Next"
                        }
                    </button>
                </div>
            </form>
        </div>
    );
}

export default TitleWithDescription;