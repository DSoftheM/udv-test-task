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
        setUserInfo(state: IUserState, action: PayloadAction<IUserState>) {
            state.name = action.payload.name;
            state.roomId = action.payload.roomId;
        }
    }
});

export const { setUserInfo } = userSlice.actions;
export const userReducer = userSlice.reducer;