import Link from "next/link";
import RegisterForm from "./RegisterForm";

const page = async () => (
	<div className="absolute top-1/2 left-1/2 flex -translate-x-1/2 -translate-y-1/2 gap-8">
		<RegisterForm />
		<div className="flex flex-col gap-4 py-8">
			<h2 className="text-2xl">Already have an account?</h2>
			<Link
				href="/signin"
				className="cursor-pointer rounded-xl border-[1px] border-blue-500 bg-white py-2 px-4 text-blue-500 transition-colors hover:bg-blue-500 hover:text-white"
			>
				Sign in
			</Link>
		</div>
	</div>
);
export default page;
