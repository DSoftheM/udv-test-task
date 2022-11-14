import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { messagesGetReducer } from "./slices/databaseSlices/getSlice";
import { messagesSetReducer } from "./slices/databaseSlices/setSlice";
import { modalReducer } from "./slices/modalSlice";
import { resendedMessageReducer } from "./slices/resendedMessagesSlice";
import { roomsReducer } from "./slices/roomsSlice";
import { userReducer } from "./slices/userSlice";

const rootReducer = combineReducers({
    userReducer,
    modalReducer,
    roomsReducer,
    messagesGetReducer,
    messagesSetReducer,
    resendedMessageReducer
});

export const store = configureStore({
    reducer: rootReducer,
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof rootReducer>;