import { ChangeEvent, useEffect, useState } from "react";
import './Modal.scss';

interface ModalProps {

}

export default function Modal({ }: ModalProps): JSX.Element | null {
    const [name, setName] = useState<string>('');
    const [roomId, setRoomId] = useState<number>(-1);
    const [isOpen, setIsOpen] = useState<boolean>(true);

    const handleName = ({ target: { value } }: ChangeEvent<HTMLInputElement>) => {
        setName(value);
    };

    const handleRoom = ({ target: { value } }: ChangeEvent<HTMLSelectElement>) => {
        setRoomId(+value);
    };

    useEffect(() => console.log(roomId), [roomId]);

    return isOpen ? (
        <div className="modal">
            <div className="modal__content">
                <input type="text" className="modal__input" placeholder="Name" value={name} onChange={handleName} />
                {/* required */}
                <select className="modal__select" onChange={handleRoom}>
                    {/* required */}
                    <option disabled selected >Выберите комнату</option>
                    <option value="1">1 Комната</option>
                    <option value="2">2 Комната</option>
                    <option value="3">3 Комната</option>
                </select>
                <button className="modal__submit" onClick={() => setIsOpen(prev => !prev)}>OK</button>
            </div>
        </div>
    ) : null;
}
