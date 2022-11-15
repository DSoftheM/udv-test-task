import { MouseEvent, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../../../../redux/hooks/hooks';
import { clearResendedMessage, setResendedMessage } from '../../../../../redux/slices/resendedMessagesSlice';
import { IMessage } from '../../../../../types/message/message.interface';
import { TypedResendedMessage } from '../../../../../types/message/ResendedMessage.type';
import ResendedMessage from '../ResendedMessage/ResendedMessage';
import './Message.scss';

interface MessageProps {
    message: IMessage;
}

export default function Message({ message: { author, date, id, text, imgSrc, resendedMessage } }: MessageProps): JSX.Element {
    const dispatch = useAppDispatch();
    const currentResendedMessage = useAppSelector(({ resendedMessageReducer: { resendedMessage } }) => resendedMessage);

    const handleDblClick = (e: MouseEvent<HTMLLIElement>) => {
        const selectedMessage: TypedResendedMessage = {
            author, date, id, text, imgSrc
        };
        if (currentResendedMessage?.id === selectedMessage.id)
            dispatch(clearResendedMessage());
        else
            dispatch(setResendedMessage(selectedMessage));
    };

    const selectedMessage = useAppSelector(({ resendedMessageReducer: { resendedMessage } }) => resendedMessage);
    const liClassName = `message-item ${selectedMessage?.id === id ? 'selected' : ''}`;

    return (
        <li className={liClassName} onDoubleClick={handleDblClick}>
            {imgSrc && <img src={imgSrc.toString()} alt="Attachment" />}
            <p className="message-item__text">{text}</p>
            <div className="message-item__meta">
                <p className="message-item__author">{author}</p>
                <p className="message-item__date">{date}</p>
            </div>
            {resendedMessage && <ResendedMessage resendedMessage={resendedMessage} />}
        </li>
    );
}
