"use client";

const error = ({ error, reset }: { error: Error; reset: () => void }) => {
	return (
		<div>
			{error.message ?? "Something went wrong"}{" "}
			<button onClick={reset}>Try again</button>
		</div>
	);
};
export default error;
