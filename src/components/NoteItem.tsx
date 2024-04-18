import { useAtom } from 'jotai';
import React, { useRef, useState } from 'react';
import Draggable, { DraggableData, DraggableEvent } from 'react-draggable';
import NoteItemView from '@/components/NoteItemView';
import { deleteNoteAtom, updateNoteAtom, useNoteAtom } from '@/state/atoms';

interface NoteItemProps {
	id: number;
}

const NoteItem: React.FC<NoteItemProps> = React.memo(({ id }) => {
	const nodeRef = useRef<HTMLDivElement>(null);
	const note = useNoteAtom(id);
	const [, updateNote] = useAtom(updateNoteAtom);
	const [, deleteNote] = useAtom(deleteNoteAtom);
	const [isEdit, setEdit] = useState<boolean>(false);

	const handleDrag = (_e: DraggableEvent, data: DraggableData) => {
		const { x, y } = data;
		const newPosition = { x, y };
		updateNote({ id, position: newPosition });
	};

	const handleDelete = () => {
		const ok = confirm('Are you sure you want to delete it?');
		if (!ok) return;
		deleteNote(id);
		console.log(`It's been deleted`);
	};

	const toggleEdit = () => {
		setEdit(true);
	};

	const updateNoteContent = (content: string) => {
		updateNote({ id, content });
		setEdit(false);
	};

	const NoteItemViewProps = {
		ref: nodeRef,
		isEdit,
		content: note?.content,
		editNote: toggleEdit,
		saveNote: updateNoteContent,
		deleteNote: handleDelete
	};

	return (
		<Draggable
			nodeRef={nodeRef}
			onStop={handleDrag}
			handle="#handle"
			bounds="parent"
			defaultPosition={note?.position}
		>
			<NoteItemView {...NoteItemViewProps} />
		</Draggable>
	);
});

NoteItem.displayName = 'NoteItem';

export default NoteItem;
