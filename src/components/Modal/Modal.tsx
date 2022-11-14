import { ChangeEvent, useState } from "react";
import { createPortal } from "react-dom";
import { useAppDispatch, useAppSelector } from "../../redux/hooks/hooks";
import { toggleModal } from "../../redux/slices/modalSlice";
import { setUserInfo } from "../../redux/slices/userSlice";
import Error from "../Error/Error";
import './Modal.scss';

const modalContainer = document.querySelector('.modal-container') || document.body;

// Modal window ?
export default function Modal(): JSX.Element | null {
    const [name, setName] = useState<string>('');
    const [roomId, setRoomId] = useState<number>(0);
    const [isError, setIsError] = useState<boolean>(false);
    const isOpen = useAppSelector(({ modalReducer }) => modalReducer.isOpen);
    const rooms = useAppSelector(({ roomsReducer }) => roomsReducer.rooms);

    const dispatch = useAppDispatch();

    const handleName = ({ target: { value } }: ChangeEvent<HTMLInputElement>) => {
        setName(value);
    };

    const handleRoom = ({ target: { value } }: ChangeEvent<HTMLSelectElement>) => {
        setRoomId(+value);
    };

    const handleClose = () => {
        if (roomId > 0 && name !== '') {
            dispatch(toggleModal());
            dispatch(setUserInfo({ name, roomId }));
            setIsError(false);
        } else {
            setIsError(true);
        }
    };

    return isOpen ? createPortal(
        (
            <div className="modal">
                <form action="#" className="modal__content">
                    <div className="modal__name">
                        <label htmlFor="modal-name">Выберете имя</label>
                        <input id="modal-name" type="text" className="modal__input" placeholder="Имя" value={name} onChange={handleName} />
                    </div>
                    <div className="modal__room">
                        <label htmlFor="modal-room">Выберете комнату</label>
                        <select className="modal__select" onChange={handleRoom} defaultValue="active" id="modal-room">
                            {rooms.map(({ id, text }) =>
                                <option value={id === roomId ? 'active' : id} key={id}>{text}</option>
                            )}
                        </select>
                    </div>
                    <button type="submit" className="modal__submit" onClick={handleClose}>OK</button>
                    {isError && <Error text="Заполните все поля" />}
                </form>
            </div>
        ), modalContainer) : null;
}
