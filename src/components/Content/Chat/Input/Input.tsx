import React, { ChangeEvent, MouseEvent, useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../../../redux/hooks/hooks';
import { addMessage } from '../../../../redux/slices/messagesSlice';
import { IMessage } from '../../../../types/message/message.interface';
import { Broadcast } from '../../../../utils/Broadcast';
import './Input.scss';

interface InputProps {

}

const channel = new Broadcast('app-chat');


export default function Input({ }: InputProps): JSX.Element {
    const [message, setMessage] = useState<string>('');
    const dispatch = useAppDispatch();
    const { name } = useAppSelector(({ userReducer: { name } }) => ({ name }));

    const handleChange = ({ target: { value } }: ChangeEvent<HTMLInputElement>) => {
        setMessage(value);
    };

    const handleMessage = () => {
        const messageInstance: Omit<IMessage, 'id'> = {
            author: name,
            date: new Date().toLocaleString(),
            text: message
        };
        dispatch(addMessage(messageInstance));
        setMessage('');
        channel.send(messageInstance);
    };

    useEffect(() => {
        channel.subscribeMessage((e: MessageEvent<IMessage>) => dispatch(addMessage({ ...e.data })));
        return () => channel.unsubscribeMessage();
    }, []);

    return (
        <div className="input">
            <input type="text" value={message} onChange={handleChange} placeholder="Message..." />
            <button className="input__send" onClick={handleMessage}>Отправить</button>
        </div>
    );
}
