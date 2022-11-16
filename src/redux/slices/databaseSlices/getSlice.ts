import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IMessage } from "../../../types/message/message.interface";
import { updateMessagesFromDatabase } from "../../thunks/database/updateMessagesFromDatabase.thunk";

interface IDatabaseState {
    isLoading: boolean;
    isFulfilled: boolean;
    errorMessage: string;
    messages: IMessage[];
}

const initialState: IDatabaseState = {
    errorMessage: '',
    isFulfilled: false,
    isLoading: false,
    messages: []
};

export const getSlice = createSlice({
    name: 'databaseSlice/get',
    initialState,
    reducers: {},
    extraReducers: {
        [updateMessagesFromDatabase.pending.type]: (state: IDatabaseState) => {
            state.isLoading = true;
        },
        [updateMessagesFromDatabase.rejected.type]: (state: IDatabaseState, action: PayloadAction<string>) => {
            state.errorMessage = action.payload;
            state.isLoading = false;
            state.isFulfilled = false;
        },
        [updateMessagesFromDatabase.fulfilled.type]: (state: IDatabaseState, action: PayloadAction<IMessage[]>) => {
            state.isLoading = false;
            state.isFulfilled = true;
            state.errorMessage = '';
            state.messages = action.payload;
        },
    }
});

export const messagesGetReducer = getSlice.reducer;