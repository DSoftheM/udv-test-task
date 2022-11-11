import { IRoom } from "../room/room.interface";

export interface IModalRoomState {
    rooms: {
        id: number;
        text: string;
    }[];
}