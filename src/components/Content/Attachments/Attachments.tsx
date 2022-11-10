import './Attachments.scss';

interface AttachmentsProps {

}

export default function Attachments({ }: AttachmentsProps): JSX.Element {
    return (
        <aside className="attachments">
            <h3 className="attachments__title">Вложения</h3>
            <ul className="attachments__list">
                {
                    Array(13).fill('').map((_, index) =>
                        <li className="attachments__item">
                            <img src={`img/${index + 1}.jpg`} alt="" />
                        </li>)
                }
            </ul>
        </aside>
    );
}
