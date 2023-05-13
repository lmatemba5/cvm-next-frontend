import { useState } from 'react';
import TitleWithDescription from '../partials/TitleWithDescription';
import useSurveys from '@/hooks/surveys';
import Questions from '../partials/question';

function CommonLogic({ pagetitle }) {
    const { stage, setStage, dispatch } = useSurveys()
    const [subtitle, setSubtitle] = useState(null)
    const goNext = () => { dispatch(setStage(stage + 1)) }

    return (
        <div className='p-4'>
            <div className="mt-4">
                <div className=' mb-12 text-2xl'>
                    <h1>{pagetitle}</h1>
                    <h5 className='text-sm text-slate-800'>{subtitle}</h5>
                </div>
                <div>
                    <div className="overflow-auto py-4 bg-white rounded grid grid-cols-1">
                        {
                            stage < 1 ? <TitleWithDescription setSubtitle={setSubtitle} goNext={goNext} /> :
                                stage < 2 ? <Questions goNext={goNext} setSubtitle={setSubtitle} /> :
                                    ""
                        }
                    </div>
                </div>
            </div>
        </div>
    );
}

export default CommonLogic;