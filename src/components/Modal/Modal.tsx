import { MouseEvent, ChangeEvent, useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { rooms } from "../../data/rooms/rooms";
import { useAppDispatch } from "../../redux/hooks/hooks";
import './Modal.scss';

interface ModalProps {

}

const modalContainer = document.querySelector('.modal-container') as HTMLElement;

export default function Modal({ }: ModalProps): JSX.Element | null {
    const [name, setName] = useState<string>('');
    const [roomId, setRoomId] = useState<number>(0);
    const [isOpen, setIsOpen] = useState<boolean>(true);
    const [isError, setIsError] = useState<boolean>(false);
    const dispatch = useAppDispatch();

    const handleName = ({ target: { value } }: ChangeEvent<HTMLInputElement>) => {
        setName(value);
    };

    const handleRoom = ({ target: { value } }: ChangeEvent<HTMLSelectElement>) => {
        setRoomId(+value);
    };

    const closeWindow = () => setIsOpen(prev => !prev);
    const showError = () => setIsError(true);
    const handleClose = () => {
        if (roomId > 0 && name !== '') {
            closeWindow();
        } else {
            showError();
        }
    };

    return isOpen ? createPortal(
        (
            <div className="modal">
                <div className="modal__content">
                    <input type="text" className="modal__input" placeholder="Name" value={name} onChange={handleName} />
                    <select className="modal__select" onChange={handleRoom}>
                        {rooms.map(({ id, text }) => <option value={id} key={id}>{text}</option>)}
                    </select>
                    {isError && <p>Заполните все поля</p>}
                    <button type="submit" className="modal__submit" onClick={handleClose}>OK</button>
                </div>
            </div>
        ), modalContainer) : null;
}
