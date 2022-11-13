import { IMessage } from '../../../../../types/message/message.interface';
import './Message.scss';

interface MessageProps {
    message: IMessage;
}

export default function Message({ message: { author, date, id, text, imgSrc } }: MessageProps): JSX.Element {
    return (
        <li className="message-item">
            {imgSrc && <img src={imgSrc.toString()} alt="Attachment" />}
            <p className="message-item__text">{text}</p>
            <div className="message-item__meta">
                <p className="message-item__author">{author}</p>
                <p className="message-item__date">{date}</p>
            </div>
        </li>
    );
}
