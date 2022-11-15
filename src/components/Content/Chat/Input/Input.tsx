import { ChangeEvent, useEffect, useRef, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../../../redux/hooks/hooks';
import { updateMessagesFromDatabase } from '../../../../redux/thunks/database/updateMessagesFromDatabase.thunk';
import { setMessageToDatabase } from '../../../../redux/thunks/database/setToDatabase.thunk';
import { IMessage } from '../../../../types/message/message.interface';
import { Broadcast } from '../../../../utils/Broadcast';
import './Input.scss';
import { getImageRawData, IRawData } from '../../../../utils/getImageRawData';
import { TypedResendedMessage } from '../../../../types/message/ResendedMessage.type';
import { clearResendedMessage } from '../../../../redux/slices/resendedMessagesSlice';
const channel = new Broadcast('app-chat');

interface InputProps {
    resendedMessage?: TypedResendedMessage;
}

export default function Input({ resendedMessage }: InputProps): JSX.Element {
    const [message, setMessage] = useState<string>('');
    const imageRawData = useRef<IRawData>('');
    const dispatch = useAppDispatch();
    const input = useRef<HTMLInputElement>(null);

    const selectedMessage = useAppSelector(({ resendedMessageReducer: { resendedMessage } }) => resendedMessage);
    const { name, roomId } = useAppSelector(({ userReducer: { name, roomId } }) => ({ name, roomId }));

    const handleChange = ({ target: { value } }: ChangeEvent<HTMLInputElement>) => {
        setMessage(value);
    };

    const clearFileInput = (input: HTMLInputElement) => {
        input.value = '';
        imageRawData.current = '';
    };

    const handleMessage = () => {
        if (!message) return;
        setMessage('');
        const messageInstance: Omit<IMessage, 'id'> = {
            author: name,
            date: new Date().toLocaleString(),
            text: message,
            roomId,
            imgSrc: imageRawData.current,
            resendedMessage: selectedMessage
        };
        if (input.current) {
            clearFileInput(input.current);
        }
        (async () => {
            await dispatch(setMessageToDatabase(messageInstance));
            await dispatch(updateMessagesFromDatabase(roomId));
            channel.send(messageInstance);
        })();
    };

    const handleImageLoad = (e: ChangeEvent<HTMLInputElement>) => {
        const image: File | null | undefined = e.target.files?.item(0);
        if (image) {
            getImageRawData(image, (_, reader) => {
                imageRawData.current = reader.result;
            });
        } else {
            imageRawData.current = '';
        }
    }

    useEffect(() => {
        (async () => {
            await dispatch(updateMessagesFromDatabase(roomId));
        })();
        channel.subscribeMessage(async (e: MessageEvent<IMessage>) => {
            await dispatch(updateMessagesFromDatabase(roomId));
        });
        return () => channel.unsubscribeMessage();
    }, [roomId, dispatch]);

    return (
        <div className="input">
            <input type='file' accept="image/*" onChange={handleImageLoad} ref={input} className="input__file" />
            <input type="text"
                value={message}
                onChange={handleChange}
                className="input__text"
                placeholder={`${resendedMessage ? 'Resended ' : ''} Message...`}
            />
            <button className="input__send" onClick={handleMessage}>Отправить</button>
        </div>
    );
}