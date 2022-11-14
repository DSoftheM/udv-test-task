import Input from "./Input/Input";
import './Chat.scss';
import Messages from "./Messages/Messages";
import { IMessage } from "../../../types/message/message.interface";
import { useAppSelector } from "../../../redux/hooks/hooks";

export default function Chat(): JSX.Element {
    const messages: IMessage[] = useAppSelector(({ messagesGetReducer: { messages } }) => messages);

    return (
        <main className="chat">
            <Messages messages={messages} />
            <Input />
        </main>
    );
}
