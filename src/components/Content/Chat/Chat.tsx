import Input from "./Input/Input";
import './Chat.scss';
import Messages from "./Messages/Messages";
import { IMessage } from "../../../types/message/message.interface";
import { useAppSelector } from "../../../redux/hooks/hooks";
import { Broadcast } from "../../../utils/Broadcast";
import { IRoom } from "../../../types/room/room.interface";

interface ChatProps {

}

export default function Chat({ }: ChatProps): JSX.Element {
    const rooms: IRoom[] = useAppSelector(({ messagesReducer: { rooms } }) => rooms);
    const roomId: number = useAppSelector(({ userReducer: { roomId } }) => roomId);
    let messages: IMessage[];
    if (roomId !== 0)
        messages = (rooms.find(room => room.id === roomId) as IRoom).messages;
    else messages = [];

    return (
        <main className="chat">
            <Messages messages={messages} />
            <Input />
        </main>
    );
}
