import { faPen, faTrash } from '@fortawesome/free-solid-svg-icons';
import React from 'react';
import ActionButton from '@/components/ActionButton';
import TextEditArea from '@/components/TextEditArea';

interface NoteItemViewProps {
	isEdit: boolean;
	content?: string;
	editNote: () => void;
	saveNote: (content: string) => void;
	deleteNote: () => void;
}

const NoteItemView = React.forwardRef<HTMLDivElement, NoteItemViewProps>(
	(props, ref) => {
		const {
			isEdit,
			content,
			editNote,
			saveNote,
			deleteNote,
			...restProps
		} = props;

		return (
			<div
				ref={ref}
				{...restProps}
				className="absolute flex flex-col overflow-x-auto overflow-y-hidden bg-yellow-100 rounded-[4px] shadow-md resize max-w-80 min-w-48 min-h-28 group"
			>
				<div
					id="handle"
					className="flex-none p-2 cursor-move h-7 bg-amber-300"
				/>
				<ActionButton
					className="top-2 right-2"
					name="delete"
					onClick={deleteNote}
					icon={faTrash}
				/>
				{isEdit ? (
					<TextEditArea onBlur={saveNote} text={content} />
				) : (
					<>
						<ActionButton
							className="top-2 left-2"
							name="edit"
							onClick={editNote}
							icon={faPen}
						/>
						<p className="flex-1 w-full p-2 overflow-auto break-words whitespace-pre-wrap text-ellipsis">
							{content}
						</p>
					</>
				)}
			</div>
		);
	}
);

NoteItemView.displayName = 'NoteItemView';

export default NoteItemView;
