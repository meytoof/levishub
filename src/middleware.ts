import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

export async function middleware(request: NextRequest) {
	const { pathname } = request.nextUrl;

	// Routes protégées par authentification
	const protectedRoutes = ["/admin", "/dashboard"];
	const isProtected = protectedRoutes.some((route) =>
		pathname.startsWith(route)
	);

	if (!isProtected) {
		return NextResponse.next();
	}

	const token = await getToken({
		req: request,
		secret: process.env.NEXTAUTH_SECRET,
	});

	// Pas connecté → redirection login
	if (!token) {
		const loginUrl = new URL("/login", request.url);
		loginUrl.searchParams.set("callbackUrl", pathname);
		return NextResponse.redirect(loginUrl);
	}

	// Routes admin → vérification du rôle ADMIN
	if (pathname.startsWith("/admin") && token.role !== "ADMIN") {
		return NextResponse.redirect(new URL("/dashboard", request.url));
	}

	return NextResponse.next();
}

export const config = {
	matcher: ["/admin/:path*", "/dashboard/:path*"],
};
