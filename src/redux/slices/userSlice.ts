import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IUserState } from "../../types/redux/userState.interface";

const initialState: IUserState = {
    name: '',
    roomId: 0
}

export const userSlice = createSlice({
    name: 'userSlice',
    initialState,
    reducers: {
        setName(state: IUserState, action: PayloadAction<string>) {
            state.name = action.payload;
        },
        setRoomId(state: IUserState, action: PayloadAction<number>) {
            state.roomId = action.payload;
        }
    }
});

export const { setName, setRoomId } = userSlice.actions;
export const userReducer = userSlice.reducer;