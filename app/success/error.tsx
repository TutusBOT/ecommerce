"use client";

const error = ({ error }: { error: Error }) => {
	return <div>{error.message} Something went wrong.</div>;
};
export default error;
