import { IRawData } from "../../utils/getImageRawData";
import { TypedResendedMessage } from "./ResendedMessage.type";

export interface IMessage {
    text: string;
    date: string;
    author: string;
    id: number;
    roomId: number;
    imgSrc?: IRawData;
    resendedMessage?: TypedResendedMessage
}