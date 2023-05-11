import React from "react";

interface IconButtonProps extends React.HTMLAttributes<HTMLButtonElement> {
	children?: React.ReactNode;
	type: "button" | "submit";
	className?: string;
	disabled?: boolean;
}

const IconButton = ({
	children = null,
	type,
	className = "",
	disabled,
	...props
}: IconButtonProps) => (
	<button
		type={type === "button" ? "button" : "submit"}
		className={`flex items-center justify-center gap-2 rounded-full p-2 transition-colors hover:bg-gray-400 hover:text-white ${
			className ?? ""
		}`}
		disabled={disabled}
		{...props}
	>
		{children}
	</button>
);
export default IconButton;
