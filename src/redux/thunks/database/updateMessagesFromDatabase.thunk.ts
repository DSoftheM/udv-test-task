import { createAsyncThunk } from "@reduxjs/toolkit";
import { IndexedDB } from "../../../database/model/IndexedDB.class";

export const updateMessagesFromDatabase = createAsyncThunk('database/getAll', async (roomId: number) => {
    const db = new IndexedDB('messages');
    db.openDb('messages-store');
    return await db.get(roomId.toString()) || [];
});
