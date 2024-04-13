import { useState } from 'react';
import Memo from '@/memo';

const App: React.FC = () => {
	const [memos, setMemos] = useState<number[]>([1, 2, 3]);

	const handleMemoClick = (index: number) => {
		const newMemos = [...memos];
		const clickedMemo = newMemos.splice(index, 1)[0];
		newMemos.push(clickedMemo);
		setMemos(newMemos);
	};

	return (
		<div className="relative w-full h-screen overflow-hidden bg-[#f3e5c9]">
			{memos.map((key, index) => (
				<Memo key={key} onMouseDown={() => handleMemoClick(index)} />
			))}
		</div>
	);
};

export default App;
