const Input = ({ className, label, error, open, text, ...props }) => {
    return (
        <div className={ `${open ? "!text-neutral-900" : "!text-neutral-500"} w-full h-full` }>
            <input placeholder={ text } { ...props } className={ `${error ? "text-error-600" : "text-neutral-500"} focus-within:outline-none !h-full !w-full p-0 pl-12` } />
        </div>
    )
}

export default Input;
