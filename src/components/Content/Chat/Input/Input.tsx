import React, { ChangeEvent, useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../../../redux/hooks/hooks';
import { addMessage } from '../../../../redux/slices/messagesSlice';
import { updateMessagesFromDatabase } from '../../../../redux/thunks/database/updateMessagesFromDatabase.thunk';
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
        setMessage('');
        const messageInstance: IMessage = {
            author: name,
            date: new Date().toLocaleString(),
            text: message,
            roomId,
            id: -1
        };
        (async () => {
            await dispatch(setMessageToDatabase(messageInstance));
            console.log('Положил 1');
            await dispatch(updateMessagesFromDatabase(roomId));
            console.log('Обновил 1');
            channel.send(messageInstance);
        })();
    };

    useEffect(() => {
        (async () => {
            await dispatch(updateMessagesFromDatabase(roomId));
            console.log('Обновил 2');
        })();
        channel.subscribeMessage(async (e: MessageEvent<IMessage>) => {
            await dispatch(updateMessagesFromDatabase(roomId));
            console.log('Обновил 3');
            // console.log('Получил сообщение: ', e.data);
        });
        return () => channel.unsubscribeMessage();
    }, [roomId, dispatch]);

    return (
        <div className="input">
            <input type="text" value={message} onChange={handleChange} placeholder="Message..." />
            <button className="input__send" onClick={handleMessage}>Отправить</button>
        </div>
    );
}
