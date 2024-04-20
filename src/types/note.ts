export interface Note {
	id: number;
	content?: string;
	position?: Position;
}

interface Position {
	x: number;
	y: number;
}
