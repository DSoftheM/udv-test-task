import './Error.scss';

interface ErrorProps {
    isError: boolean;
    text: string;
}

export default function Error({ isError, text }: ErrorProps): JSX.Element | null {
    return isError ? <p className='error-message'>{text}</p> : null;
}
