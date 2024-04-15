import { useState } from 'react';
import AddMemoButton from '@/components/AddMemoButton';
import Memo from '@/components/Memo';

export interface Todo {
	id: number;
	content: string;
	position: { x: number; y: number };
}

const Container: React.FC = () => {
	const [memos, setMemos] = useState<Todo[]>([]);

	const handleMemoClick = (id: number) => {
		const index = memos.findIndex((memo) => memo.id === id);
		if (index === memos.length - 1) return;
		const newMemos = [...memos];
		const [clickedMemo] = newMemos.splice(index, 1);
		setMemos([...newMemos, clickedMemo]);
	};

	const updateMemo = (
		id: number,
		content?: string,
		position?: { x: number; y: number }
	) => {
		const updateMemos = memos.map((memo) =>
			memo.id === id
				? {
						...memo,
						content: content ?? memo.content,
						position: position ?? memo.position
					}
				: memo
		);
		setMemos(updateMemos);
	};

	const addMemo = () => {
		const date = new Date().getTime();
		setMemos([
			...memos,
			{ id: date, content: '', position: { x: 100, y: 100 } }
		]);
	};

	return (
		<div className="relative w-full h-screen overflow-hidden bg-[#f3e5c9]">
			{memos.map((memo) => (
				<Memo
					key={memo.id}
					content={memo.content}
					coord={memo.position}
					onMouseDown={() => handleMemoClick(memo.id)}
					updateMemo={({ content, position }) =>
						updateMemo(memo.id, content, position)
					}
				/>
			))}
			<AddMemoButton onClick={addMemo} />
		</div>
	);
};

export default Container;
