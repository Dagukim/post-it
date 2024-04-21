import ReactTextareaAutosize from 'react-textarea-autosize';
import { TextEditAreaProps } from '@/types';

const TextEditArea: React.FC<TextEditAreaProps> = ({ onBlur, text }) => {
	return (
		<ReactTextareaAutosize
			className="flex-1 w-full p-2 overflow-auto bg-transparent outline-none resize-none"
			onBlur={(e) => onBlur(e.target.value)}
			cols={50}
			placeholder="Type your memo here..."
			defaultValue={text}
			autoFocus
		/>
	);
};

export default TextEditArea;
