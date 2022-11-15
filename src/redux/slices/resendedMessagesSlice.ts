import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { TypedResendedMessage } from "../../types/message/ResendedMessage.type";

interface IResendedMessagesState {
    resendedMessage?: TypedResendedMessage;
}

const initialState: IResendedMessagesState = {};

export const resendedMessageSlice = createSlice({
    name: 'resendedMessageSlice',
    initialState,
    reducers: {
        setResendedMessage(state: IResendedMessagesState, { payload }: PayloadAction<TypedResendedMessage>) {
            state.resendedMessage = payload;
        },
        clearResendedMessage(state: IResendedMessagesState) {
            state.resendedMessage = undefined;
        }
    }
});

export const { setResendedMessage, clearResendedMessage } = resendedMessageSlice.actions;
export const resendedMessageReducer = resendedMessageSlice.reducer;