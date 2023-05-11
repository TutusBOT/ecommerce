import React, { FC } from "react";

const variants = {
	filled:
		"rounded-xl bg-blue-500 py-2 px-4 text-white transition-colors hover:bg-blue-600",
	outlined:
		"rounded-xl border-[1px] border-blue-500 bg-white py-2 px-4 text-blue-500 transition-colors hover:bg-blue-500 hover:text-white",
};

interface Button extends React.ButtonHTMLAttributes<HTMLButtonElement> {
	type: "button" | "submit";
	children: React.ReactNode;
	variant: keyof typeof variants;
}

const Component: FC<Button> = ({
	type,
	children = null,
	variant,
	className,
	...props
}) => (
	<button
		type={type === "button" ? "button" : "submit"}
		className={`cursor-pointer ${variants[variant]} ${className}`}
		{...props}
	>
		{children}
	</button>
);

export default Component;
