import { faPen, faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useRef, useState } from 'react';
import Draggable, { DraggableData, DraggableEvent } from 'react-draggable';

interface MemoProps {
	onMouseDown: () => void;
}

const Memo: React.FC<MemoProps> = ({ onMouseDown }) => {
	const nodeRef = useRef<HTMLDivElement>(null);
	const [position, setPosition] = useState<{ x: number; y: number }>({
		x: 0,
		y: 0
	});

	const handleDrag = (_e: DraggableEvent, data: DraggableData) => {
		const { x, y } = data;
		setPosition({ x, y });
	};

	return (
		<Draggable
			nodeRef={nodeRef}
			onStop={handleDrag}
			onMouseDown={onMouseDown}
			handle="#handle"
			bounds="parent"
		>
			<div
				ref={nodeRef}
				className="absolute overflow-x-auto overflow-y-hidden bg-yellow-100 shadow-md resize max-w-80 min-w-48 min-h-28 group"
			>
				<div
					id="handle"
					className="flex justify-between p-2 cursor-move bg-amber-300"
				>
					<button
						className="transition-all duration-300 opacity-0 group-hover:opacity-100"
						aria-label="edit"
					>
						<FontAwesomeIcon
							className="block"
							icon={faPen}
							size="sm"
						/>
					</button>
					<button
						className="transition-all duration-300 opacity-0 group-hover:opacity-100"
						aria-label="delete"
					>
						<FontAwesomeIcon
							className="block"
							icon={faTrash}
							size="sm"
						/>
					</button>
				</div>
				<div className="p-2 break-words whitespace-pre-wrap">
					<h2>title</h2>
					<p>description</p>
				</div>
			</div>
		</Draggable>
	);
};

export default Memo;
