import { useRef, useState } from 'react';
import Draggable, { DraggableData, DraggableEvent } from 'react-draggable';

interface MemoProps {
	defaultPosition: { x: number; y: number };
}

const Memo: React.FC<MemoProps> = ({ defaultPosition }) => {
	const nodeRef = useRef<HTMLDivElement>(null);
	const [position, setPosition] = useState<{ x: number; y: number }>(
		defaultPosition
	);

	const handleDrag = (_e: DraggableEvent, data: DraggableData) => {
		const { x, y } = data;
		setPosition({ x, y });
	};

	return (
		<>
			<Draggable
				nodeRef={nodeRef}
				defaultPosition={defaultPosition}
				onStop={handleDrag}
			>
				<div
					ref={nodeRef}
					className="border border-black p-3 absolute bg-yellow-100 cursor-move"
				>
					<h2>Memo</h2>
					<p>Drag me around!</p>
				</div>
			</Draggable>
		</>
	);
};

export default Memo;
