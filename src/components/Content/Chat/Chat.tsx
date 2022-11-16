import Input from "./Input/Input";
import './Chat.scss';
import Messages from "./Messages/Messages";
import { ChangeEvent, useEffect, useRef, useState, KeyboardEvent } from 'react';
import { useAppSelector, useAppDispatch } from "../../../redux/hooks/hooks";
import { clearResendedMessage } from "../../../redux/slices/resendedMessagesSlice";
import { updateMessagesFromDatabase } from "../../../redux/thunks/database/getMessagesFromDatabase.thunk";
import { setMessageToDatabase } from "../../../redux/thunks/database/setToDatabase.thunk";
import { IMessage } from "../../../types/message/message.interface";
import { Broadcast } from "../../../utils/Broadcast";
import { IRawData, getImageRawData } from "../../../utils/getImageRawData";

const channel = new Broadcast('app-chat');

export default function Chat(): JSX.Element {
    const messages: IMessage[] = useAppSelector(({ messagesGetReducer: { messages } }) => messages);

    // ====================================

    const [message, setMessage] = useState<string>('');

    const imageRawData = useRef<IRawData>('');
    const input = useRef<HTMLInputElement>(null);

    const dispatch = useAppDispatch();

    const selectedMessage = useAppSelector(({ resendedMessageReducer: { resendedMessage } }) => resendedMessage);
    const { name, roomId } = useAppSelector(({ userReducer: { name, roomId } }) => ({ name, roomId }));

    const handleChange = ({ target: { value } }: ChangeEvent<HTMLInputElement>) => {
        setMessage(value);
    };

    const clearFileInput = (input: HTMLInputElement) => {
        input.value = '';
        imageRawData.current = '';
    };

    const sendMessage = () => {
        if (!message && imageRawData.current === '') return;
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
        dispatch(clearResendedMessage());
        (async () => {
            await dispatch(setMessageToDatabase(messageInstance));
            await dispatch(updateMessagesFromDatabase(roomId));
            channel.send(messageInstance);
        })();
    };

    const sendEmoji = (imgSrc: string) => {
        const messageInstance: Omit<IMessage, 'id'> = {
            author: name,
            date: new Date().toLocaleString(),
            text: '',
            roomId,
            imgSrc,
            resendedMessage: selectedMessage
        };
        dispatch(clearResendedMessage());
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

    const handlePressEnter = (e: KeyboardEvent<HTMLInputElement>) => {
        return e.key === 'Enter' ? sendMessage() : null;
    };

    useEffect(() => {
        (async () => {
            await dispatch(updateMessagesFromDatabase(roomId));
        })();
        channel.subscribeMessage(async (e: MessageEvent<IMessage>) => {
            await dispatch(updateMessagesFromDatabase(roomId));
        });
        return () => channel.unsubscribeMessage();
    }, [roomId, dispatch]);

    // ====================================

    return (
        <main className="chat">
            <Messages messages={messages} />
            <Input
                handleChange={handleChange}
                handleImageLoad={handleImageLoad}
                message={message}
                handlePressEnter={handlePressEnter}
                sendMessage={sendMessage}
                inputRef={input}
                sendEmoji={sendEmoji}
            />
        </main>
    );
}
