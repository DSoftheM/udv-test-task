import { useAppDispatch } from '../../redux/hooks/hooks';
import { toggleModal } from '../../redux/slices/modalSlice';
import './Header.scss';

interface HeaderProps {

}

export default function Header({ }: HeaderProps): JSX.Element {
    const dispatch = useAppDispatch();

    const handleChangeRoomOrName = () => {
        dispatch(toggleModal());
    }

    return (
        <header className='header'>
            <h2 className="header__name">Максим Перчаткин</h2>
            <div className="header__buttons">
                <button className="header__button" onClick={handleChangeRoomOrName}>Сменить имя и комнату</button>
            </div>
        </header>
    );
}
