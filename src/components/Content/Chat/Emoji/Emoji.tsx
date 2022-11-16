import { useState, MouseEvent } from 'react';
import './Emoji.scss';

interface EmojiProps {
    sendEmoji: (imgSrc: string) => void;
}

export default function Emoji({ sendEmoji }: EmojiProps): JSX.Element {
    const [isOpen, setIsOpen] = useState<boolean>(false);

    const handleClick = (e: MouseEvent<HTMLLIElement>, imgSrc: string) => {
        sendEmoji(imgSrc);
    };

    return (
        <div className="emoji">
            <div className="emoji__img" onClick={() => setIsOpen(prev => !prev)}>
                <img src="emoji/1.svg" alt="" />
            </div>
            {isOpen &&
                <ul className="emoji__list">
                    {
                        Array(17).fill(null).map((_emoji, index) =>
                            <li className="emoji__item" key={index} onClick={(e) => handleClick(e, `emoji/${index + 1}.svg`)}>
                                <img src={`emoji/${index + 1}.svg`} alt="" />
                            </li>)
                    }
                </ul>
            }
        </div>
    );
}

// Проверить код по эмодзи
