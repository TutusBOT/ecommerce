interface IconButton extends React.HTMLAttributes<HTMLButtonElement> {
	children?: React.ReactNode;
	type?: "button" | "submit" | "reset";
	className?: string;
	disabled?: boolean;
}

const IconButton = ({
	children,
	type,
	className,
	disabled,
	...props
}: IconButton) => {
	return (
		<button
			type={type}
			className={`flex items-center justify-center gap-2 rounded-full p-2 transition-colors hover:bg-gray-400 hover:text-white ${
				className ?? ""
			}`}
			disabled={disabled}
			{...props}
		>
			{children}
		</button>
	);
};
export default IconButton;
