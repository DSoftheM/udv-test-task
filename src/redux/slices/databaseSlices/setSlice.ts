import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { setMessageToDatabase } from "../../thunks/database/setToDatabase.thunk";

interface IDatabaseState {
    isLoading: boolean;
    isFulfilled: boolean;
    errorMessage: string;
}

const initialState: IDatabaseState = {
    errorMessage: '',
    isFulfilled: false,
    isLoading: false
};

export const setSlice = createSlice({
    name: 'databaseSlice/set',
    initialState,
    reducers: {},
    extraReducers: {
        [setMessageToDatabase.pending.type]: (state: IDatabaseState) => {
            state.isLoading = true;
        },
        [setMessageToDatabase.rejected.type]: (state: IDatabaseState, action: PayloadAction<string>) => {
            state.errorMessage = action.payload;
            state.isLoading = false;
            state.isFulfilled = false;
        },
        [setMessageToDatabase.fulfilled.type]: (state: IDatabaseState) => {
            state.isLoading = false;
            state.isFulfilled = true;
            state.errorMessage = '';
        },
    }
});

export const messagesSetReducer = setSlice.reducer;