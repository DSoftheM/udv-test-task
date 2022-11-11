import { IMessage } from "./message.interface";

export interface MessagePayload {
    roomId: number;
    message: Omit<IMessage, 'id'>
}