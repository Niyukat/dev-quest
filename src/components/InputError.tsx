type InputErrorProps = {
    errors: string[];
}

function InputError({errors}: InputErrorProps) {
    if (errors.length === 0) {
        return null;
    }

    return <ul className="input-errors">
        {
            errors.map((error: string, index: number) => <li className="input-error" key={index}>{error}</li>)
        }
    </ul>
}

export default InputError;