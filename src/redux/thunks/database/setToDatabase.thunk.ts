import { createAsyncThunk } from "@reduxjs/toolkit";
import { IndexedDB } from "../../../database/model/IndexedDB.class";
import { IMessage } from "../../../types/message/message.interface";

export const setMessageToDatabase = createAsyncThunk('database/set', async ({ roomId, ...message }: IMessage): Promise<void> => {
    const db = new IndexedDB('messages');
    db.openDb('messages-store');
    const currentMessages: Omit<IMessage, 'roomId'>[] = await db.get(roomId.toString()) || [];
    currentMessages.push(message);
    await db.set(roomId.toString(), currentMessages);
});
