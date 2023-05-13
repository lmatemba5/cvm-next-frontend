import React from 'react';
import MultipleChoice from './multiple';

const CreateQuestion = ({ number, handleChange, survey }) => (

    <div className="px-4 grid grid-cols-1">
        <div className='mb-3 '>
            <label>Question {number}</label>
            <textarea type="text" name="question" className="mt-1 block w-full px-3 py-2 bg-white border rounded-md focus:outline-none focus:border-sky-500"></textarea>
            <label className="text-red-500">Title is required</label>
        </div>

        <div className=''>
            <div className="mb-4">

                <div className="flex items-center justify-between">
                    <div className={`w-full ${survey?.type.startsWith('struct') ? 'w-4/5 md:pr-3' : ''}`}>
                        <label>Question Type</label>
                        <select defaultValue='structured' onChange={(e) => handleChange('type', e.target.value)} name="type" className="w-full p-2 bg-white border rounded-md focus:outline-none focus:border-sky-500">
                            <option value="">---select---</option>
                            <option value="multiple-chioce">Multiple Chioce</option>
                            <option value="structured">Structured</option>
                        </select>
                    </div>
                    <div className={`${survey?.type.startsWith('struct') ? 'w-1/5' : 'hidden'}`}>
                        <label>Characters</label>
                        <select defaultValue={50} name="characters" className="w-full p-2 bg-white border rounded-md focus:outline-none focus:border-sky-500">
                            <option value="">---select---</option>
                            <option value="50">50</option>
                            <option value="100">100</option>
                            <option value="255">255</option>
                        </select>
                    </div>
                </div>
            </div>
            {
                survey?.type === 'structured' ? "Structure" : <MultipleChoice handleChange={handleChange} />
            }
        </div>
    </div>
)

function Questions({ handleChange, survey }) {
    return (
        <div className="">
            <CreateQuestion handleChange={handleChange} survey={survey} />
        </div>
    );
}

export default Questions;