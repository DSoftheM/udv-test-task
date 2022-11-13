import { IRawData } from "../../utils/getImageRawData";

export interface IMessage {
    text: string;
    date: string;
    author: string;
    id: number;
    roomId: number;
    imgSrc?: IRawData;
}