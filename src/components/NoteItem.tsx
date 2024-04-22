import { useAtom } from 'jotai';
import React, { useCallback, useState } from 'react';
import { DraggableData, DraggableEvent } from 'react-draggable';
import NoteItemView from '@/components/NoteItemView';
import {
	deleteNoteAtom,
	moveNoteAtom,
	updateNoteAtom,
	useNoteAtom
} from '@/state/atoms';
import { NoteItemProps } from '@/types';

const NoteItem: React.FC<NoteItemProps> = React.memo(({ id }) => {
	const note = useNoteAtom(id);
	const [, moveNoteToTop] = useAtom(moveNoteAtom);
	const [, updateNote] = useAtom(updateNoteAtom);
	const [, deleteNote] = useAtom(deleteNoteAtom);
	const [isEdit, setEdit] = useState<boolean>(false);

	const handleNoteClick = useCallback(() => {
		moveNoteToTop(id);
	}, [id, moveNoteToTop]);

	const handleDragStop = useCallback(
		(_e: DraggableEvent, data: DraggableData) => {
			const { x, y } = data;
			const newPosition = { x, y };
			updateNote({ id, position: newPosition });
		},
		[id, updateNote]
	);

	const handleDelete = useCallback(() => {
		const ok = confirm('Are you sure you want to delete it?');
		if (!ok) return;
		deleteNote(id);
		console.log(`It's been deleted`);
	}, [id, deleteNote]);

	const toggleEdit = useCallback(() => {
		setEdit(true);
	}, []);

	const updateNoteContent = useCallback(
		(e: React.FocusEvent<HTMLTextAreaElement>) => {
			const content = e.target.value;
			updateNote({ id, content });
			setEdit(false);
		},
		[id, updateNote]
	);

	const NoteItemViewProps = {
		isEdit,
		data: note,
		noteAction: {
			editNote: toggleEdit,
			saveNote: updateNoteContent,
			deleteNote: handleDelete,
			dragStop: handleDragStop,
			clickNote: handleNoteClick
		}
	};

	return <NoteItemView {...NoteItemViewProps} />;
});

NoteItem.displayName = 'NoteItem';

export default NoteItem;
