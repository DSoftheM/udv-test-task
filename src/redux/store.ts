import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { messagesReducer } from "./slices/messagesSlice";
import { modalReducer } from "./slices/modalSlice";
import { roomsReducer } from "./slices/roomsSlice";
import { userReducer } from "./slices/userSlice";

const rootReducer = combineReducers({
    userReducer,
    modalReducer,
    messagesReducer,
    roomsReducer
});

export const store = configureStore({
    reducer: rootReducer,
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof rootReducer>;