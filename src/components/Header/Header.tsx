import { useAppDispatch, useAppSelector } from '../../redux/hooks/hooks';
import { toggleModal } from '../../redux/slices/modalSlice';
import './Header.scss';

export default function Header(): JSX.Element {
    const dispatch = useAppDispatch();

    const handleChangeRoomOrName = () => {
        dispatch(toggleModal());
    };

    const { name, roomId } = useAppSelector(({ userReducer: { name, roomId } }) => ({ name, roomId }));

    return (
        <header className='header'>
            <h2 className="header__name">{name}</h2>
            <h2 className="header__room">{roomId} Комната</h2>
            <div className="header__buttons">
                <button className="header__button" onClick={handleChangeRoomOrName}>Сменить имя и комнату</button>
            </div>
        </header>
    );
}
