import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IMessage } from "../../types/message/message.interface";
import { IMessagePayload } from "../../types/message/messagePayload.interface";
import { IMessagesState } from "../../types/redux/messageState.interface";

const initialState: IMessagesState = {
    rooms: [
        {
            id: 1,
            messages: []
        },
        {
            id: 2,
            messages: []
        },
        {
            id: 3,
            messages: []
        }
    ]
};

export const messagesSlice = createSlice({
    name: 'messagesSlice',
    initialState,
    reducers: {
        addMessage({ rooms }: IMessagesState, { payload: { message, roomId } }: PayloadAction<IMessagePayload>) {
            const room = rooms.find(room => room.id === roomId);
            if (room) {
                const lastIndex = room.messages.length - 1;
                (message as IMessage).id = lastIndex + 1;
                room.messages.push(message as IMessage);
            }
        }
    }
});

export const { addMessage } = messagesSlice.actions;
export const messagesReducer = messagesSlice.reducer;