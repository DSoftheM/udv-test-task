import { createAsyncThunk } from "@reduxjs/toolkit";
import { IndexedDB } from "../../../database/model/IndexedDB.class";
import { IMessage } from "../../../types/message/message.interface";
import { useAppDispatch } from "../../hooks/hooks";
import { updateMessagesFromDatabase } from "./updateMessagesFromDatabase.thunk";

export const setMessageToDatabase = createAsyncThunk('database/set', async ({ roomId, ...message }: IMessage) => {
    const db = new IndexedDB('messages');
    db.openDb('messages-store');
    let currentMessages: Omit<IMessage, 'roomId'>[] = await db.get(roomId.toString()) || [];
    if (!currentMessages) currentMessages = [];
    console.log(currentMessages);
    currentMessages.push(message);
    await db.set(roomId.toString(), currentMessages);
});
