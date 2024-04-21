import { faPen, faTrash } from '@fortawesome/free-solid-svg-icons';
import React, { useRef } from 'react';
import Draggable from 'react-draggable';
import ActionButton from '@/components/ActionButton';
import TextEditArea from '@/components/TextEditArea';
import { NoteItemViewProps } from '@/types';

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
					className="absolute flex flex-col overflow-hidden bg-yellow-100 rounded-[4px] shadow-md resize max-w-80 min-w-48 min-h-28 group"
				>
					<div
						id="handle"
						className="flex-none cursor-move bg-amber-300 h-7"
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
							<p className="flex-grow p-2 overflow-y-auto break-words whitespace-pre-wrap">
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
