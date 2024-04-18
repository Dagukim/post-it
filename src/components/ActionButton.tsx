import { IconDefinition, SizeProp } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

interface ActionButtonProps {
	name: string;
	className: string;
	icon: IconDefinition;
	onClick: () => void;
	size?: SizeProp;
}

const ActionButton: React.FC<ActionButtonProps> = ({
	name,
	className,
	icon,
	onClick,
	size
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
				size={size ?? 'sm'}
			/>
		</button>
	);
};

export default ActionButton;
