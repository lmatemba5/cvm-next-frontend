
function Spinner({ text }) {
    return (
        <div className='flex justify-center items-center'>
            <svg className={`h-5 w-5 animate-spin border-4 border-l-blue-700  border-t-blue-700 mr-3 rounded-full`} viewBox="0 0 24 24"></svg>
            {text}
        </div>
    );
}

export default Spinner;