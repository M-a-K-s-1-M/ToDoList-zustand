import './TaskList.scss';
import { useEffect, useRef, useState } from 'react';


interface ITaskList {
    id: string,
    title: string,
    onDone: (id: string) => void,
    onEdited: (id: string, title: string) => void,
    onRemoved: (id: string) => void,
}

export const TaskList: React.FC<ITaskList> = ({ id, title, onDone, onEdited, onRemoved }) => {
    const [checked, setChecked] = useState(false);
    const [isEditMode, setIsEditMode] = useState(false);
    const [value, setValue] = useState(title);
    const editTitleInputRef = useRef<HTMLInputElement>(null)

    useEffect(() => {
        if (isEditMode) {
            editTitleInputRef?.current?.focus();
        }
    }, [isEditMode])

    return (
        <div className='task-item'>
            <label>
                <input
                    type='checkbox'
                    disabled={isEditMode}
                    checked={checked}
                    className='check-box'
                    onChange={(evt) => {
                        setChecked(evt.target.checked)
                        if (evt.target.checked) {
                            setTimeout(() => {
                                onDone(id)
                            }, 300)
                        }
                    }}
                />
                {isEditMode ? <input
                    type='text'
                    value={value}
                    onChange={evt => setValue(evt.target.value)}
                    className='edit-input'
                    onKeyDown={evt => {
                        if (evt.key === 'Enter') {
                            onEdited(id, value);
                            setIsEditMode(false)
                        }
                    }}
                    ref={editTitleInputRef}
                /> : <h3 className='title'>{title}</h3>}
            </label>
            {isEditMode ? <button
                aria-label='Save'
                className='save-btn'
                onClick={() => {
                    onEdited(id, value)
                    setIsEditMode(false)
                }}

            /> : <button
                aria-label='Edit'
                className='edit-btn'
                onClick={() => { setIsEditMode(true) }}

            />}

            <button
                aria-label='Remove'
                className='remove-btn'
                onClick={() => {
                    if (confirm('Вы точо хотитие удалить это напоминание?')) {
                        onRemoved(id);
                    }
                }}

            />
        </div >
    )
}   