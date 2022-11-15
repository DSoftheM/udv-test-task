import Header from "./components/Header/Header";
import './App.scss';
import Content from "./components/Content/Content";
import Modal from "./components/Modal/Modal";
import { useAppSelector } from "./redux/hooks/hooks";

function App() {
	const isModalOpen = useAppSelector(({ modalReducer: { isOpen } }) => isOpen);

	return (
		<div className={`app ${isModalOpen ? 'blured' : ''}`}>
			<Header />
			<Content />
			<Modal />
		</div>
	);
}

export default App;
