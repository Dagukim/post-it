import ReactTextareaAutosize from 'react-textarea-autosize';
import { TextEditAreaProps } from '@/types';

const TextEditArea: React.FC<TextEditAreaProps> = ({ onBlur, text }) => {
	return (
		<ReactTextareaAutosize
			className="flex-grow w-full p-2 overflow-auto bg-transparent outline-none resize-none"
			onBlur={onBlur}
			cols={50}
			placeholder="Type your memo here..."
			defaultValue={text}
			autoFocus
		/>
	);
};

export default TextEditArea;
