import './Header.scss';

interface HeaderProps {

}

export default function Header({ }: HeaderProps): JSX.Element {
    return (
        <header className='header'>
            <h2 className="header__name">Максим Перчаткин</h2>
            <div className="header__buttons">
                <button className="header__button">Сменить имя</button>
                <button className="header__button">Сменить комнату</button>
            </div>
        </header>
    );
}
