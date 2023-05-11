import { connectMongo } from "@/lib/connectMongo";
import User, { userSchema } from "@/models/user";
import NextAuth from "next-auth";
import type { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { compare } from "bcrypt";

export const authOptions: NextAuthOptions = {
	session: {
		strategy: "jwt",
	},
	providers: [
		CredentialsProvider({
			name: "Sign in",
			credentials: {
				email: {
					label: "Email",
					type: "email",
					placeholder: "example@example.com",
				},
				password: { label: "Password", type: "password" },
			},
			async authorize(credentials) {
				try {
					if (!credentials?.password || !credentials?.email)
						throw new Error("Provide user credentials.");
					await connectMongo();
					const user = await User.findOne({ email: credentials?.email });
					if (!user) throw new Error("User doesn't exist");
					const parsedUser = userSchema.parse(user);
					if (await compare(credentials.password, parsedUser.hashedPassword)) {
						return user;
					}
					throw new Error("Wrong password");
				} catch (error) {
					return null;
				}
			},
		}),
	],
	pages: {
		signIn: "/signin",
	},
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
