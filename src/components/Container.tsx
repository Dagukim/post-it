import { useAtomValue, useSetAtom } from 'jotai';
import AddNoteButton from '@/components/AddNoteButton';
import NoteItem from '@/components/NoteItem';
import { addNoteAtom, notesAtom } from '@/state/atoms';

const Container: React.FC = () => {
	const notes = useAtomValue(notesAtom);
	const addNote = useSetAtom(addNoteAtom);

	return (
		<div className="relative w-full h-screen overflow-hidden bg-[#f3e5c9]">
			{notes.map((note) => (
				<NoteItem key={note.id} id={note.id} />
			))}
			<AddNoteButton onClick={addNote} />
		</div>
	);
};

export default Container;
