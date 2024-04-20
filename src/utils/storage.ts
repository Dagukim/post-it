import { Note } from '@/types';

const key = 'post-it';

export const loadNotes = (): Note[] => {
	const notesData = localStorage.getItem(key);
	return notesData ? JSON.parse(notesData) : [];
};

export const saveNotes = (notes: Note[]) => {
	localStorage.setItem(key, JSON.stringify(notes));
};
