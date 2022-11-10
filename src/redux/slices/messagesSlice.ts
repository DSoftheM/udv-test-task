import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IMessage } from "../../types/message/message.interface";
import { IMessagesState } from "../../types/redux/messageState.interface";

const initialState: IMessagesState = {
    messages: []
};

export const messagesSlice = createSlice({
    name: 'messagesSlice',
    initialState,
    reducers: {
        addMessage({ messages }: IMessagesState, { payload: message }: PayloadAction<Omit<IMessage, 'id'>>) {
            const lastIndex = messages.length - 1;
            (message as IMessage).id = lastIndex + 1;
            messages.push(message as IMessage);
        }
    }
});

export const { addMessage } = messagesSlice.actions;
export const messagesReducer = messagesSlice.reducer;