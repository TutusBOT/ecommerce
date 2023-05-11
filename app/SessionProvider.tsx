"use client";

import { SessionProvider } from "next-auth/react";
import React from "react";

const Provider = ({
	children,
	session,
}: {
	children: React.ReactNode;
	session: any;
}) => <SessionProvider session={session}>{children}</SessionProvider>;
export default Provider;
