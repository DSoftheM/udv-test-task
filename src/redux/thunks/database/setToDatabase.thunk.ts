import { createAsyncThunk } from "@reduxjs/toolkit";
import { IndexedDB } from "../../../database/model/IndexedDB.class";
import { IMessage } from "../../../types/message/message.interface";

export const setMessageToDatabase = createAsyncThunk('database/set', async ({ roomId, ...message }: Omit<IMessage, 'id'>): Promise<void> => {
    const db = new IndexedDB('messages');
    await db.openDb('messages-store');

    const currentMessages: IMessage[] = await db.get(roomId.toString()) || [];
    message = Object.assign(message, { id: currentMessages.length + 1 });
    currentMessages.push(message as IMessage);

    await db.set(roomId.toString(), currentMessages);
});
