import { useEffect, useState } from 'react';
import Memo from '@/memo';

const App: React.FC = () => {
	const [memos, setMemos] = useState<number[]>([1, 2, 3]);

	const [defaultPosition, setDefaultPosition] = useState<{
		x: number;
		y: number;
	}>({ x: 0, y: 0 });

	useEffect(() => {
		const updatePosition = () => {
			const x = window.innerWidth / 2 - 50;
			const y = window.innerHeight / 2 - 50;
			setDefaultPosition({ x, y });
		};
		updatePosition();

		window.addEventListener('resize', updatePosition);

		return () => window.removeEventListener('resize', updatePosition);
	}, []);

	const handleMemoClick = (index: number) => {
		const newMemos = [...memos];
		const clickedMemo = newMemos.splice(index, 1);
		newMemos.push(clickedMemo[0]);
		setMemos(newMemos);
	};

	return (
		<div className="relative w-full h-screen">
			{memos.map((key, index) => (
				<Memo
					key={key}
					defaultPosition={defaultPosition}
					onClick={() => handleMemoClick(index)}
				/>
			))}
		</div>
	);
};

export default App;
