import { IMessage } from '../../../types/message/message.interface';
import './Attachments.scss';

interface AttachmentsProps {
    messages: IMessage[];
}

export default function Attachments({ messages }: AttachmentsProps): JSX.Element {
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
