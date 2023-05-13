const Button = ({ type = 'submit', className = "bg-gray-800", ...props }) => (
    <button
        type={type}
        className={`hover:bg-gray-700 active:bg-gray-900 ${className} inline-flex items-center px-4 py-2 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest focus:outline-none focus:ring disabled:opacity-25 transition ease-in-out duration-150`}
        {...props}
    />
)

export default Button
