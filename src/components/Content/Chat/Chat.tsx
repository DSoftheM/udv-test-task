import Input from "./Input/Input";
import './Chat.scss';
import Messages from "./Messages/Messages";
import { IMessage } from "../../../types/message/message.interface";

interface ChatProps {

}

export default function Chat({ }: ChatProps): JSX.Element {
    const messages: IMessage[] = [
        {
            author: 'Ира',
            date: new Date(),
            id: 1,
            text: 'Привет! Как дела?'
        }
    ];
    return (
        <main className="chat">
            <Messages messages={messages} />
            <Input />
        </main>
    );
}
