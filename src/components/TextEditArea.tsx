import ReactTextareaAutosize from 'react-textarea-autosize';
import { TextEditAreaProps } from '@/types';

const TextEditArea: React.FC<TextEditAreaProps> = ({ onBlur, text }) => {
	return (
		<ReactTextareaAutosize
			className="flex-1 w-full p-2 bg-transparent outline-none resize-none"
			onBlur={(e) => onBlur(e.target.value)}
			placeholder="Type your memo here..."
			defaultValue={text}
			autoFocus
		/>
	);
};

export default TextEditArea;
