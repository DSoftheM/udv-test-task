import React, { ChangeEvent, MouseEvent, useEffect, useState } from 'react';
import { IndexedDB } from '../../../../database/model/IndexedDB.class';
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
    const { name, roomId } = useAppSelector(({ userReducer: { name, roomId } }) => ({ name, roomId }));

    const handleChange = ({ target: { value } }: ChangeEvent<HTMLInputElement>) => {
        setMessage(value);
    };

    const saveMsgToDB = (roomId: number, message: string) => {
        const f = async () => {
            const db = new IndexedDB('messages');
            db.openDb('messages-store');
            const currentMessages: string[] = await db.get(roomId.toString()) || [];
            currentMessages.push(message);
            await db.set(roomId.toString(), currentMessages);
        };
        f();
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
        saveMsgToDB(roomId, message);
    };



    useEffect(() => {
        channel.subscribeMessage((e: MessageEvent<IMessage>) => dispatch(addMessage({ ...e.data })));
        return () => channel.unsubscribeMessage();
    }, [dispatch]);

    return (
        <div className="input">
            <input type="text" value={message} onChange={handleChange} placeholder="Message..." />
            <button className="input__send" onClick={handleMessage}>Отправить</button>
        </div>
    );
}
