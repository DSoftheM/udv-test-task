import { createAsyncThunk } from "@reduxjs/toolkit";
import { IndexedDB } from "../../../database/model/IndexedDB.class";
import { IMessage } from "../../../types/message/message.interface";

export const updateMessagesFromDatabase = createAsyncThunk('database/getAll', async (roomId: number): Promise<IMessage[]> => {
    const db = new IndexedDB('messages');
    db.openDb('messages-store');
    return await db.get(roomId.toString()) || [];
});
