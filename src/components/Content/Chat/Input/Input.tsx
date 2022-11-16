import { ChangeEvent, KeyboardEvent, RefObject } from 'react';
import './Input.scss';
import { TypedResendedMessage } from '../../../../types/message/ResendedMessage.type';
import Emoji from '../Emoji/Emoji';

interface InputProps {
    resendedMessage?: TypedResendedMessage;
    handleChange: (e: ChangeEvent<HTMLInputElement>) => void;
    handleImageLoad: (e: ChangeEvent<HTMLInputElement>) => void;
    handlePressEnter: (e: KeyboardEvent<HTMLInputElement>) => void;
    sendMessage: () => void;
    sendEmoji: (imgSrc: string) => void;
    message: string;
    inputRef: RefObject<HTMLInputElement>;
}

export default function Input({ resendedMessage, handleChange, message, handleImageLoad, handlePressEnter, sendMessage, inputRef, sendEmoji }: InputProps): JSX.Element {

    return (
        <div className="input">
            <div className="input__body">

                <Emoji sendEmoji={sendEmoji} />
                <label htmlFor="input-file" id='input-file-label'>
                    <img src="img/clip.svg" alt="" />
                </label>
                <input type='file' id='input-file' accept="image/*" onChange={handleImageLoad} ref={inputRef} className="input__file" />
                <input type="text"
                    value={message}
                    onChange={handleChange}
                    className="input__text"
                    placeholder={`${resendedMessage ? 'Resended ' : ''} Message...`}
                    onKeyDown={handlePressEnter}
                />
            </div>
            <button className="input__send" onClick={sendMessage}>Отправить</button>
        </div>
    );
}
