import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IUserState } from "../../types/redux/userState.interface";

const initialState = {
    isOpen: true
}

export const modalSlice = createSlice({
    name: 'modalSlice',
    initialState,
    reducers: {
        toggleModal(state: typeof initialState) {
            state.isOpen = !state.isOpen;
        }
    }
});

export const { toggleModal } = modalSlice.actions;
export const modalReducer = modalSlice.reducer;