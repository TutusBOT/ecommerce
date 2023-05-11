"use client";

const error = ({ error, reset }: { error: Error; reset: () => void }) => (
	<div>
		{error.message ?? "Something went wrong"}{" "}
		<button onClick={reset} type="button">
			Try again
		</button>
	</div>
);
export default error;
