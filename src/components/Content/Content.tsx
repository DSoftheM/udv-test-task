import { useAppSelector } from "../../redux/hooks/hooks";
import Attachments from "./Attachments/Attachments";
import Chat from "./Chat/Chat";
import './Content.scss';

export default function Content(): JSX.Element {
    const messages = useAppSelector(({ messagesGetReducer: { messages } }) => messages);

    return (
        <section className="content">
            <Attachments messages={messages} />
            <Chat />
        </section>
    );
}
