import { useEffect, useRef } from 'react';
import { IMessage } from '../../../../types/message/message.interface';
import Message from './Message/Message';
import './Messages.scss';

interface MessagesProps {
    messages: IMessage[];
}

export default function Messages({ messages }: MessagesProps): JSX.Element {

    const messagesRef = useRef<HTMLDivElement>(null);
    const { current: messagesElement } = messagesRef;

    useEffect(() => {
        if (messagesElement) {
            messagesElement.scrollTo({ top: messagesElement.scrollHeight, left: 0, behavior: 'smooth' });
        }
    }, [messagesElement, messages]);

    return (
        <div className="messages" ref={messagesRef}>
            <ul className="messages__list">
                {messages.map(msg =>
                    <Message message={msg} key={msg.id} />
                )}
            </ul>
        </div>
    );
}
