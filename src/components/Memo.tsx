import { faPen, faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useRef, useState } from 'react';
import Draggable, { DraggableData, DraggableEvent } from 'react-draggable';

interface MemoProps {
	content: string;
	coord: { x: number; y: number };
	onMouseDown: () => void;
	updateMemo: ({
		content,
		position
	}: {
		content?: string;
		position?: { x: number; y: number };
	}) => void;
}

const Memo: React.FC<MemoProps> = ({
	content,
	coord,
	onMouseDown,
	updateMemo
}) => {
	const nodeRef = useRef<HTMLDivElement>(null);
	const textareaRef = useRef<HTMLTextAreaElement>(null);
	const [isEdit, setEdit] = useState<boolean>(false);

	const handleDrag = (_e: DraggableEvent, data: DraggableData) => {
		const { x, y } = data;
		const newPosition = { x, y };
		updateMemo({ position: newPosition });
	};

	const handleBlur = () => {
		if (!textareaRef.current) return;
		updateMemo({ content: textareaRef.current.value });
		setEdit(false);
	};

	return (
		<Draggable
			nodeRef={nodeRef}
			onStop={handleDrag}
			onMouseDown={onMouseDown}
			handle="#handle"
			bounds="parent"
			defaultPosition={coord}
		>
			<div
				ref={nodeRef}
				className="absolute flex flex-col overflow-x-auto overflow-y-hidden bg-yellow-100 rounded-[4px] shadow-md resize max-w-80 min-w-48 min-h-28 group"
			>
				<div
					id="handle"
					className="flex-none p-2 cursor-move h-7 bg-amber-300"
				/>
				<button
					className="absolute transition-all duration-300 opacity-0 top-2 right-2 group-hover:opacity-100"
					aria-label="delete"
				>
					<FontAwesomeIcon
						className="block"
						icon={faTrash}
						size="sm"
					/>
				</button>
				{isEdit ? (
					<textarea
						ref={textareaRef}
						className="flex-1 w-full p-2 bg-transparent outline-none resize-none"
						onBlur={handleBlur}
						defaultValue={content}
						autoFocus
					/>
				) : (
					<>
						<button
							className="absolute transition-all duration-300 opacity-0 top-2 left-2 group-hover:opacity-100"
							aria-label="edit"
							onClick={() => setEdit(true)}
						>
							<FontAwesomeIcon
								className="block"
								icon={faPen}
								size="sm"
							/>
						</button>
						<p className="flex-1 w-full p-2 break-words whitespace-pre-wrap text-ellipsis">
							{content}
						</p>
					</>
				)}
			</div>
		</Draggable>
	);
};

export default Memo;
