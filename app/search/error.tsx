"use client";

const Error = ({ error }: { error: Error }) => {
	console.log(error);
	return <div>Invalid search request.</div>;
};
export default Error;
