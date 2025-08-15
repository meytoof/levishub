import { prisma } from "@/lib/prisma";
import { compare } from "bcrypt";
import type { DefaultSession, NextAuthOptions } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { z } from "zod";

declare module "next-auth" {
	interface Session extends DefaultSession {
		user: DefaultSession["user"] & {
			id: string;
			role: "ADMIN" | "CLIENT";
		};
	}
}

export const authOptions: NextAuthOptions = {
	session: {
		strategy: "jwt",
	},
	providers: [
		Credentials({
			name: "Credentials",
			credentials: {
				email: { label: "Email", type: "email" },
				password: { label: "Password", type: "password" },
			},
			async authorize(credentials) {
				const cred = z
					.object({
						email: z.string().email(),
						password: z.string().min(6),
					})
					.safeParse(credentials);
				if (!cred.success) return null;
				const user = await prisma.user.findUnique({
					where: { email: cred.data.email },
				});
				if (!user || !user.hashedPassword) return null;
				const ok = await compare(
					cred.data.password,
					user.hashedPassword
				);
				if (!ok) return null;
				return {
					id: user.id,
					name: user.name,
					email: user.email,
					image: user.image,
					role: user.role,
				};
			},
		}),
	],
	callbacks: {
		async jwt({ token, user }) {
			if (user) {
				token.role = (user as any).role;
				token.id = user.id;
			}
			return token;
		},
		async session({ session, token }) {
			if (session.user) {
				session.user.id = token.id as string;
				session.user.role = token.role as "ADMIN" | "CLIENT";
			}
			return session;
		},
	},
	pages: {
		signIn: "/login",
		error: "/login",
	},
	secret: process.env.NEXTAUTH_SECRET,
};
