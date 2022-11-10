import Input from "./Input/Input";
import './Chat.scss';
import Messages from "./Messages/Messages";

interface ChatProps {

}

export default function Chat({ }: ChatProps): JSX.Element {
    return (
        <main className="chat">
            <Messages />
            <Input />
        </main>
    );
}
