import './Error.scss';

interface ErrorProps {
    text: string;
}

export default function Error({ text }: ErrorProps): JSX.Element | null {
    return <p className='error-message'>{text}</p>;
}
