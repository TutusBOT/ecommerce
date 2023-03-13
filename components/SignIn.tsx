import { useUser } from "@auth0/nextjs-auth0/client";
import Link from "next/link";

const SignIn = () => {
	const { user } = useUser();
	if (user) return <Link href="/api/auth/logout">Sign out</Link>;
	return <Link href="/api/auth/login">Sign in</Link>;
};
export default SignIn;
