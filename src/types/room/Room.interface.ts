import { IMessage } from "../message/message.interface";

export interface IRoom {
    messages: IMessage[];
    id: number;
}