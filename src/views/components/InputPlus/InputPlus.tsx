import { useCallback, useState } from "react"
import "./InputPlus.scss"

interface IInputPlusProps {
    onAdd: (title: string) => void
}

export const InputPlus: React.FC<IInputPlusProps> = ({ onAdd }) => {
    const [inputValue, setInputValue] = useState('');
    const addTask = useCallback(() => {
        onAdd(inputValue);
        setInputValue('');
    }, [inputValue])

    return (
        <section className="input-plus-container">
            <input
                type='text'
                value={inputValue}
                onChange={(evt) => setInputValue(evt.target.value)}
                onKeyDown={(evt) => {
                    if (evt.key === 'Enter') {
                        addTask();
                    }
                }}
                placeholder="Type here..."
            />
            <button
                onClick={() => { addTask() }}
                aria-label="Add"
                className="btn"
            />
        </section>
    )
}