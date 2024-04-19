import { faPen, faTrash } from '@fortawesome/free-solid-svg-icons';
import React, { MouseEventHandler, useRef } from 'react';
import Draggable, { DraggableEventHandler } from 'react-draggable';
import ActionButton from '@/components/ActionButton';
import TextEditArea from '@/components/TextEditArea';
import { Note } from '@/state/atoms';

interface NoteItemViewProps {
	isEdit: boolean;
	data?: Note;
	noteAction: {
		editNote: MouseEventHandler;
		saveNote: (content: string) => void;
		deleteNote: MouseEventHandler;
		dragStop: DraggableEventHandler;
		clickNote: (e: MouseEvent) => void;
	};
}

const NoteItemView: React.FC<NoteItemViewProps> = React.memo(
	({ isEdit, data, noteAction }) => {
		const nodeRef = useRef<HTMLDivElement>(null);

		return (
			<Draggable
				nodeRef={nodeRef}
				onStop={noteAction.dragStop}
				onMouseDown={noteAction.clickNote}
				handle="#handle"
				bounds="parent"
				defaultPosition={data?.position}
			>
				<div
					ref={nodeRef}
					className="absolute flex flex-col overflow-x-auto overflow-y-hidden bg-yellow-100 rounded-[4px] shadow-md resize max-w-80 min-w-48 min-h-28 group"
				>
					<div
						id="handle"
						className="flex-none p-2 cursor-move h-7 bg-amber-300"
					/>
					<ActionButton
						className="top-2 right-2"
						name="delete"
						onClick={noteAction.deleteNote}
						icon={faTrash}
					/>
					{isEdit ? (
						<TextEditArea
							onBlur={noteAction.saveNote}
							text={data?.content}
						/>
					) : (
						<>
							<ActionButton
								className="top-2 left-2"
								name="edit"
								onClick={noteAction.editNote}
								icon={faPen}
							/>
							<p className="flex-1 w-full p-2 overflow-auto break-words whitespace-pre-wrap text-ellipsis">
								{data?.content}
							</p>
						</>
					)}
				</div>
			</Draggable>
		);
	}
);

NoteItemView.displayName = 'NoteItemView';

export default NoteItemView;
