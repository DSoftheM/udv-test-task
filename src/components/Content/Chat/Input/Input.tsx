import React, { ChangeEvent, MouseEvent, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../../../redux/hooks/hooks';
import { addMessage } from '../../../../redux/slices/messagesSlice';
import './Input.scss';

interface InputProps {

}

export default function Input({ }: InputProps): JSX.Element {
    const [message, setMessage] = useState<string>('');
    const dispatch = useAppDispatch();
    const { name } = useAppSelector(({ userReducer: { name } }) => ({ name }));

    const handleChange = ({ target: { value } }: ChangeEvent<HTMLInputElement>) => {
        setMessage(value);
    };

    const handleMessage = () => {
        dispatch(addMessage({
            author: name,
            date: new Date().toLocaleString(),
            text: message
        }));
        setMessage('');
    };

    return (
        <div className="input">
            <input type="text" value={message} onChange={handleChange} placeholder="Message..." />
            <button className="input__send" onClick={handleMessage}>Отправить</button>
        </div>
    );
}
