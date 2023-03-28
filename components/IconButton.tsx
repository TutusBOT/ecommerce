interface IconButton {
	children?: React.ReactNode;
	type?: "button" | "submit" | "reset";
	className?: string;
	onClick?: () => void;
	disabled?: boolean;
}

const IconButton = ({
	children,
	type,
	className,
	onClick,
	disabled,
}: IconButton) => {
	return (
		<button
			type={type}
			onClick={onClick}
			className={`flex items-center justify-center gap-2 rounded-full p-2 transition-colors hover:bg-gray-400 hover:text-white ${
				className ?? ""
			}`}
			disabled={disabled}
		>
			{children}
		</button>
	);
};
export default IconButton;
