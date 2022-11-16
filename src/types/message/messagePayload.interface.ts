import { IMessage } from "./message.interface";

export interface IMessagePayload {
    roomId: number;
    message: Omit<IMessage, 'id'>
}