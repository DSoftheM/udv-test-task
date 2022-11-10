import { IMessage } from '../../../../types/message/message.interface';
import Message from './Message/Message';
import './Messages.scss';

interface MessagesProps {
    messages: IMessage[];
}

export default function Messages({ messages }: MessagesProps): JSX.Element {
    return (
        <div className="messages">
            <ul className="messages__list">
                {messages.map(msg =>
                    <Message message={msg} key={msg.id} />
                )}
            </ul>
        </div>
    );
}
