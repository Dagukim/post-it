import { useRef, useState } from 'react';
import Draggable, { DraggableData, DraggableEvent } from 'react-draggable';

interface MemoProps {
	defaultPosition: { x: number; y: number };
	onClick: () => void;
}

const Memo: React.FC<MemoProps> = ({ defaultPosition, onClick }) => {
	const nodeRef = useRef(null);
	const [position, setPosition] = useState<{ x: number; y: number }>(
		defaultPosition
	);

	const handleDrag = (_e: DraggableEvent, data: DraggableData) => {
		const { x, y } = data;
		setPosition({ x, y });
	};

	return (
		<Draggable
			nodeRef={nodeRef}
			defaultPosition={defaultPosition}
			onStop={handleDrag}
			onMouseDown={onClick}
			handle="#handle"
		>
			<div
				ref={nodeRef}
				className="absolute bg-yellow-100 border border-black group"
			>
				<div
					id="handle"
					className="transition-all duration-100 cursor-move bg-amber-300 group-hover:py-2"
				></div>
				<div className="p-2">
					<h2>title</h2>
					<p>description</p>
				</div>
			</div>
		</Draggable>
	);
};

export default Memo;
