import { IUser } from "../user/user.interface";

export interface IMessage {
    text: string;
    date: Date;
    author: string;
    id: number;
}