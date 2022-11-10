import './Attachments.scss';

interface AttachmentsProps {

}

export default function Attachments({ }: AttachmentsProps): JSX.Element {
    return (
        <aside className="attachments">
            <h3 className="attachments__title">Вложения</h3>
            <ul className="attachments__list">
                <li className="attachments__item">1</li>
                <li className="attachments__item">2</li>
                <li className="attachments__item">3</li>
            </ul>
        </aside>
    );
}
