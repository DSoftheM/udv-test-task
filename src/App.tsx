import Header from "./components/Header/Header";
import './App.scss';
import Content from "./components/Content/Content";
import Modal from "./components/Modal/Modal";

function App() {
	return (
		<div className="app">
			<Header />
			<Content />
			<Modal />
		</div>
	);
}

export default App;
