import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { ActionButtonProps } from '@/types';

const ActionButton: React.FC<ActionButtonProps> = ({
	name,
	className,
	icon,
	onClick,
	iconSize
}) => {
	return (
		<button
			className={`absolute transition-all duration-300 opacity-0 group-hover:opacity-100 ${className}`}
			aria-label={name}
			onClick={onClick}
		>
			<FontAwesomeIcon
				className="block"
				icon={icon}
				size={iconSize ?? 'sm'}
			/>
		</button>
	);
};

export default ActionButton;
