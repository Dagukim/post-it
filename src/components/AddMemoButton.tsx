interface AddMemoButtonProps {
	onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

const AddMemoButton: React.FC<AddMemoButtonProps> = ({ onClick }) => {
	return (
		<button
			className="absolute w-12 h-12 rounded-[4px] bg-slate-600 right-8 bottom-8"
			onClick={onClick}
		>
			+
		</button>
	);
};

export default AddMemoButton;
