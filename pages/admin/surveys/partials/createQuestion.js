import { ChevronDown, ChevronUp, Plus, X } from 'react-bootstrap-icons';
import { useState } from 'react';
import MultipleChoice from '../commonlogic/multiple';

const CreateQuestion = ({ qn, trigger, updateQuestion, error, remove }) => {
    const [open, setOpen] = useState(true)
    let { id, text, type } = qn

    return (
        <div className='rounded-md mb-3 border p-0'>
            <div className={`p-2 bg-gray-50 flex justify-between ${open ? 'rounded-t-md' : 'rounded-md'} items-center`}>
                <span className='mr-3 w-8/12'>
                    Question {id + ": "} {text ? text.substring(0, 50) : undefined}
                </span>
                <span className='mr-3 w-2/12'>
                    <i>{type}</i>
                </span>
                <div className='flex justify-end items-center w-1/12'>
                    <span className='bg-gray-200 p-1 rounded cursor-pointer shadow-lg' onClick={() => setOpen(!open)}>
                        <ChevronDown hidden={open} />
                        <ChevronUp hidden={!open} />
                    </span>
                </div>
            </div>
            <div className={`${open ? 'p-2' : 'hidden'}`}>
                <div className='mb-3 flex justify-between items-center'>
                    <div className='mr-3 w-8/12 flex-col justify-center items-center'>
                        <textarea disabled={trigger ? false : true} placeholder='type our question here' type="text" value={text} onChange={(e) => trigger ? updateQuestion({ ...qn, text: e.target.value }) : undefined} name="question" className="mt-1 h-16 max-h-16 block w-full px-3 py-2 bg-white border-2 rounded-md focus:outline-none focus:border-sky-500 hover:border-sky-500"></textarea>
                        <label className="text-red-500">{error} <i></i></label>
                    </div>
                    <div className={`mr-3 flex justify-center ${error ? 'pb-5' : ''} w-2/12`}>
                        <select value={type} disabled={trigger ? false : true} onChange={(e) => trigger ? updateQuestion({ ...qn, type: e.target.value }) : undefined} name="type" className="w-full p-2 h-16 max-h-16 bg-white border-2 rounded-md focus:outline-none focus:border-sky-500 hover:border-sky-500">
                            <option value="">---select---</option>
                            <option value="multiple">Multiple Chioce</option>
                            <option value="structured">Structured</option>
                        </select>
                    </div>
                    <div className={`flex justify-center ${error ? 'pb-5' : ''} w-1/12`}>
                        <span onClick={() => !trigger ? remove(id) : trigger(id)} className='bg-purple-100 text-purple-400 rounded-lg p-1 cursor-pointer hover:bg-purple-200'>
                            <Plus size={50} hidden={trigger ? false : true} />
                            <X size={50} hidden={trigger ? true : false} color='red' />
                        </span>
                    </div>
                </div>

                <div className=''>
                    {
                        type === 'structured' ? <label className='border-b-2 border-slate-800 border-dotted' >structured answer</label> : <MultipleChoice hide={remove ? true : false} question={qn} updateQuestion={updateQuestion} />
                    }
                </div>
            </div>
        </div>
    )
}

export default CreateQuestion