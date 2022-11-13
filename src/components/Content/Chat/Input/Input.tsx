import React, { ChangeEvent, useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../../../redux/hooks/hooks';
import { addMessage } from '../../../../redux/slices/messagesSlice';
import { setMessageToDatabase } from '../../../../redux/thunks/database/setToDatabase.thunk';
import { IMessage } from '../../../../types/message/message.interface';
import { Broadcast } from '../../../../utils/Broadcast';
import './Input.scss';

const channel = new Broadcast('app-chat');

export default function Input(): JSX.Element {
    const [message, setMessage] = useState<string>('');
    const dispatch = useAppDispatch();
    const { name, roomId } = useAppSelector(({ userReducer: { name, roomId } }) => ({ name, roomId }));

    const handleChange = ({ target: { value } }: ChangeEvent<HTMLInputElement>) => {
        setMessage(value);
    };

    const handleMessage = () => {
        const messageInstance: IMessage = {
            author: name,
            date: new Date().toLocaleString(),
            text: message,
            roomId,
            id: -1
        };
        dispatch(addMessage({ message: messageInstance, roomId: roomId }));
        setMessage('');
        channel.send(messageInstance);
        dispatch(setMessageToDatabase(messageInstance));
    };

    useEffect(() => {
        channel.subscribeMessage((e: MessageEvent<IMessage>) => {
            console.log('roomId :>> ', roomId);
            dispatch(addMessage({ message: { ...e.data }, roomId: e.data.roomId }));
            console.log('Получил сообщение: ', e.data);
        });
        return () => channel.unsubscribeMessage();
    });

    return (
        <div className="input">
            <input type="text" value={message} onChange={handleChange} placeholder="Message..." />
            <button className="input__send" onClick={handleMessage}>Отправить</button>
        </div>
    );
}
