import Memo from '@/memo';

const App: React.FC = () => {
	return (
		<div className="w-full h-screen relative">
			<Memo defaultPosition={{ x: 100, y: 100 }} />
			<Memo defaultPosition={{ x: 100, y: 100 }} />
			<Memo defaultPosition={{ x: 100, y: 100 }} />
			<Memo defaultPosition={{ x: 100, y: 100 }} />
			<Memo defaultPosition={{ x: 100, y: 100 }} />
			<Memo defaultPosition={{ x: 100, y: 100 }} />
			<Memo defaultPosition={{ x: 100, y: 100 }} />
			<Memo defaultPosition={{ x: 100, y: 100 }} />
		</div>
	);
};

export default App;
