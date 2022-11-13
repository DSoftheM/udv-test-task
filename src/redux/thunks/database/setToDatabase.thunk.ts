import { createAsyncThunk } from "@reduxjs/toolkit";
import { IndexedDB } from "../../../database/model/IndexedDB.class";
import { IMessage } from "../../../types/message/message.interface";

export const setMessageToDatabase = createAsyncThunk('database/set', async ({ roomId, ...message }: IMessage) => {
    const db = new IndexedDB('messages');
    db.openDb('messages-store');
    const currentMessages: Omit<IMessage, 'roomId'>[] = await db.get(roomId.toString()) || [];
    console.log(currentMessages);
    currentMessages.push(message);
    return await db.set(roomId.toString(), currentMessages);
});
