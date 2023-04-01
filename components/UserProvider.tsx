"use client";

import { UserProvider } from "@auth0/nextjs-auth0/client";

const Provider = ({ children }: { children: React.ReactNode }) => {
	return <UserProvider>{children}</UserProvider>;
};
export default Provider;
