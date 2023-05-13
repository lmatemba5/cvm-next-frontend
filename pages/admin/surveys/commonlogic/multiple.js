import { useState } from 'react';
import { Circle, Plus, X } from 'react-bootstrap-icons';

const Answer = ({ text, trigger, remove, placeholder, hide, ...props }) => (
    <div className={`flex items-center py-2 ${(hide && trigger) ? 'hidden' : ''}`}>
        <Circle color='grey' />
        <input readOnly={placeholder === undefined} type="text" {...props} value={text} placeholder={placeholder} name="answer" className="mx-3 bg-transparent border-b-2 focus:outline-none focus:border-sky-500" />
        <span className={`bg-purple-400 rounded-lg cursor-pointer ${hide ? 'hidden' : ''}`} onClick={() => trigger ? trigger(text) : remove(text)}>
            {
                trigger ? <Plus size={18} /> : <X size={18} />
            }
        </span>
    </div>
)


function MultipleChoice({ question, updateQuestion, hide }) {
    const [option, setOption] = useState()

    const addAnswer = () => {
        if (!question?.options?.includes(option) && option) {

            const options = [].concat(...(question?.options ? question?.options : [])).concat(...[option])

            updateQuestion({ ...question, options })
        }
    }

    const removeAnswer = (ans) => {
        const options = question?.options?.filter(pred => pred !== ans)
        updateQuestion({ ...question, options })
    }



    return (
        <div className=''>
            <label>{hide ? 'Options' : 'Provide options below (click + to add)'}</label>
            <div>
                {
                    question?.options?.map((ans, index) => {
                        return (
                            <Answer hide={hide} key={index} text={ans} placeholder={undefined} remove={removeAnswer} />
                        )
                    })
                }
                <Answer hide={hide} onBlur={e => e.target.value = ''} onChange={(e) => setOption(e.target.value)} text={undefined} placeholder={"add option"} trigger={addAnswer} />
            </div>
        </div>
    );
}

export default MultipleChoice;