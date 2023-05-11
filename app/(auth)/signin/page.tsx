import Link from "next/link";
import SigninForm from "./SigninForm";

const page = () => (
	<div className="absolute top-1/2 left-1/2 flex -translate-x-1/2 -translate-y-1/2 gap-8">
		<SigninForm />
		<div className="flex flex-col gap-4 py-8">
			<h2 className="text-2xl">You do not have an account?</h2>
			<Link
				href="/register"
				className="cursor-pointer rounded-xl border-[1px] border-blue-500 bg-white py-2 px-4 text-blue-500 transition-colors hover:bg-blue-500 hover:text-white"
			>
				Sign up
			</Link>
		</div>
	</div>
);
export default page;
