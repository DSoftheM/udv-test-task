import { createSlice } from "@reduxjs/toolkit";

interface IInitialState {
    isOpen: boolean;
}

const initialState: IInitialState = {
    isOpen: true
};

export const modalSlice = createSlice({
    name: 'modalSlice',
    initialState,
    reducers: {
        toggleModal(state: IInitialState) {
            state.isOpen = !state.isOpen;
        }
    }
});

export const { toggleModal } = modalSlice.actions;
export const modalReducer = modalSlice.reducer;