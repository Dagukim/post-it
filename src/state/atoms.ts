import { atom, useAtomValue } from 'jotai';
import { isEqual } from 'lodash';
import { useMemo } from 'react';

interface Position {
	x: number;
	y: number;
}

export interface Note {
	id: number;
	content?: string;
	position?: Position;
}

export const notesAtom = atom<Note[]>([]);

export const addNoteAtom = atom(null, (get, set) => {
	const newNote: Note = {
		id: Date.now(),
		content: '',
		position: { x: 100, y: 100 }
	};
	set(notesAtom, [...get(notesAtom), newNote]);
});

const noteAtom = (id: number) =>
	atom((get) => get(notesAtom).find((note) => note.id === id));

export const useNoteAtom = (id: number) => {
	const noteSelector = useMemo(() => noteAtom(id), [id]);
	const note = useAtomValue(noteSelector);
	return note;
};

export const moveNoteAtom = atom(null, (get, set, id: number) => {
	const notes = get(notesAtom);
	const noteIndex = notes.findIndex((note) => note.id === id);
	if (notes.length - 1 === noteIndex) return;
	const newNotes = [...notes];
	const [clickedNote] = newNotes.splice(noteIndex, 1);
	set(notesAtom, [...newNotes, clickedNote]);
});

export const updateNoteAtom = atom(
	null,
	(get, set, { id, content, position }: Note) => {
		const notes = get(notesAtom);
		const noteIndex = notes.findIndex((note) => note.id === id);

		if (noteIndex === -1) return;
		const contentUnchanged = notes[noteIndex].content === content;
		const positionUnchanged = isEqual(notes[noteIndex].position, position);
		if (contentUnchanged || positionUnchanged) return;

		const updatedNote = {
			...notes[noteIndex],
			content: content ?? notes[noteIndex].content,
			position: position ?? notes[noteIndex].position
		};

		const updatedNotes = [...notes];
		updatedNotes[noteIndex] = updatedNote;

		set(notesAtom, updatedNotes);
	}
);

export const deleteNoteAtom = atom(null, (get, set, id: number) => {
	const updatedNotes = get(notesAtom).filter((note) => note.id !== id);
	set(notesAtom, updatedNotes);
});
