import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

interface AddNoteButtonProps {
	onClick: React.MouseEventHandler;
}

const AddNoteButton: React.FC<AddNoteButtonProps> = ({ onClick }) => {
	return (
		<button
			className="absolute w-12 h-12 rounded-[4px] bg-amber-300 right-8 bottom-8 hover:scale-110 duration-300"
			onClick={onClick}
		>
			<FontAwesomeIcon icon={faPlus} />
		</button>
	);
};

export default AddNoteButton;
