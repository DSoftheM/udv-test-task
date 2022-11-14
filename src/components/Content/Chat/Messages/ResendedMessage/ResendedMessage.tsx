import { TypedResendedMessage } from "../../../../../types/message/ResendedMessage.type";
import './ResendedMessage.scss';

interface ResendedMessageProps {
    resendedMessage: TypedResendedMessage;
}

export default function ResendedMessage({ resendedMessage: { author, date, id, text, imgSrc } }: ResendedMessageProps): JSX.Element {
    return (
        <div className="message-item quoted">
            <p>Пересланные:</p>
            {imgSrc && <img src={imgSrc.toString()} alt="Attachment" />}
            <p className="message-item__text">{text}</p>
            <div className="message-item__meta">
                <p className="message-item__author">{author}</p>
                <p className="message-item__date">{date}</p>
            </div>
        </div>
    );
}
