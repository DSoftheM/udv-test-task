import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IRoomState } from "../../types/redux/roomsState.interface";
import { IUserState } from "../../types/redux/userState.interface";

const initialState: IRoomState = {
    rooms: [
        {
            text: 'Выберите Комнату',
            id: 0
        },
        {
            text: '1 Комната',
            id: 1
        },
        {
            text: '2 Комната',
            id: 2
        },
        {
            text: '3 Комната',
            id: 3
        },
    ]
};

export const roomsSlice = createSlice({
    name: 'roomsSlice',
    initialState,
    reducers: {
        // selectRoom(state: typeof initialState) {
        //     state.isOpen = !state.isOpen;
        // }
    }
});

// export const { toggleModal } = roomsSlice.actions;
export const roomsReducer = roomsSlice.reducer;