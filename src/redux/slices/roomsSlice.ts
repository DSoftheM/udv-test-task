import { createSlice } from "@reduxjs/toolkit";
import { IModalRoomState } from "../../types/redux/roomsState.interface";

const initialState: IModalRoomState = {
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
    reducers: {}
});

export const roomsReducer = roomsSlice.reducer;