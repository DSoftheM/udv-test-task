import { useState } from 'react';
import './Emoji.scss';

interface EmojiProps {

}

export default function Emoji({ }: EmojiProps): JSX.Element {
    const [isOpen, setIsOpen] = useState<boolean>(false);
    return (
        <div className="emoji">
            <div className="emoji__img" onClick={() => setIsOpen(prev => !prev)}>
                <img src="emoji/1.svg" alt="" />
            </div>
            {isOpen &&
                <ul className="emoji__list">
                    {
                        Array(8).fill(null).map((emoji, index) =>
                            <li key={index}>
                                <img src={`emoji/${index + 1}.svg`} alt="" />
                            </li>)
                    }
                </ul>
            }
        </div>
    );
}
