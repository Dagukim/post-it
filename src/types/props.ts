import { IconDefinition, SizeProp } from '@fortawesome/fontawesome-svg-core';
import { DraggableEventHandler } from 'react-draggable';
import { Note } from './note';

export interface NoteItemProps {
	id: number;
}

export interface NoteItemViewProps {
	isEdit: boolean;
	data?: Note;
	noteAction: {
		editNote: React.MouseEventHandler;
		saveNote: (e: React.FocusEvent<HTMLTextAreaElement>) => void;
		deleteNote: React.MouseEventHandler;
		dragStop: DraggableEventHandler;
		clickNote: (e: MouseEvent) => void;
	};
}

export interface AddNoteButtonProps {
	onClick: React.MouseEventHandler;
}

export interface ActionButtonProps {
	name: string;
	className: string;
	icon: IconDefinition;
	onClick: React.MouseEventHandler;
	iconSize?: SizeProp;
}

export interface TextEditAreaProps {
	onBlur: (e: React.FocusEvent<HTMLTextAreaElement>) => void;
	text?: string;
}
