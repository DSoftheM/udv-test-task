import React, { ChangeEvent, useState } from 'react';
import './Input.scss';

interface InputProps {

}

export default function Input({ }: InputProps): JSX.Element {
    const [message, setMessage] = useState<string>('');

    const handleChange = ({ target: { value } }: ChangeEvent<HTMLInputElement>) => {
        setMessage(value);
    };

    return (
        <div className="input">
            <input type="text" value={message} onChange={handleChange} placeholder="Message..." />
            <button className="input__send" >Отправить</button>
        </div>
    );
}
