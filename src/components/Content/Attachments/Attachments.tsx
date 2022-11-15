import { useEffect } from 'react';
import { useAppSelector } from '../../../redux/hooks/hooks';
import './Attachments.scss';

interface AttachmentsProps {

}

export default function Attachments({ }: AttachmentsProps): JSX.Element {
    const messages = useAppSelector(({ messagesGetReducer: { messages } }) => messages);
    const messagesWithImg = messages.filter(msg => msg.imgSrc);

    return (
        <aside className="attachments">
            <h3 className="attachments__title">Вложения</h3>
            <ul className="attachments__list">
                {
                    messagesWithImg.map(({ imgSrc, id }) =>
                        <li key={id} className="attachments__item">
                            <img src={imgSrc?.toString()} alt="" />
                        </li>)
                }
            </ul>
        </aside>
    );
}
