"use client";

const error = ({ error }: { error: Error }) => (
	<div>{error.message} Something went wrong.</div>
);
export default error;
