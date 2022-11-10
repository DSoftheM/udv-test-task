import './Messages.scss';

interface MessagesProps {

}

export default function Messages({ }: MessagesProps): JSX.Element {
    return (
        <div className="messages">
            <ul>
                <li>Привет. Как дела?</li>
                <li>Привет. Хорошо.</li>
            </ul>
        </div>
    );
}
