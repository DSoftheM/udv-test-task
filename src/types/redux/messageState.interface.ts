import { IMessage } from "../message/message.interface";
import { IRoom } from "../room/room.interface";

export interface IMessagesState {
    rooms: IRoom[];
}