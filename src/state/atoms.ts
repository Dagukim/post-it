import { atom, useAtomValue } from 'jotai';
import { isEqual } from 'lodash';
import { useMemo } from 'react';
import { Note } from '@/types';
import { loadNotes, saveNotes } from '@/utils/storage';

export const notesAtom = atom<Note[]>(loadNotes());

export const addNoteAtom = atom(null, (get, set) => {
	const newNote: Note = {
		id: Date.now(),
		content: '',
		position: { x: 100, y: 100 }
	};
	const updatedNotes = [...get(notesAtom), newNote];
	set(notesAtom, updatedNotes);
	saveNotes(updatedNotes);
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
	if (noteIndex === -1 || notes.length - 1 === noteIndex) return;
	const cpNotes = [...notes];
	const [clickedNote] = cpNotes.splice(noteIndex, 1);
	const updatedNotes = [...cpNotes, clickedNote];
	set(notesAtom, updatedNotes);
	saveNotes(updatedNotes);
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
		saveNotes(updatedNotes);
	}
);

export const deleteNoteAtom = atom(null, (get, set, id: number) => {
	const updatedNotes = get(notesAtom).filter((note) => note.id !== id);
	set(notesAtom, updatedNotes);
	saveNotes(updatedNotes);
});
