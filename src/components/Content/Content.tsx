import Attachments from "./Attachments/Attachments";
import Chat from "./Chat/Chat";
import './Content.scss';

interface ContentProps {

}

export default function Content({ }: ContentProps): JSX.Element {
    return (
        <section className="content">
            <Attachments />
            <Chat />
        </section>
    );
}
