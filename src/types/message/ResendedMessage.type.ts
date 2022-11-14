import { IMessage } from "./message.interface";

export type TypedResendedMessage = Omit<IMessage, 'resendedMessage' | 'roomId'>;
