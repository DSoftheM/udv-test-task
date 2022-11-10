import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { modalReducer } from "./slices/modalSlice";
import { userReducer } from "./slices/userSlice";

const rootReducer = combineReducers({
    userReducer,
    modalReducer
});

export const store = configureStore({
    reducer: rootReducer,
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof rootReducer>;