import { testResendConnection } from "@/lib/email";
import { NextResponse } from "next/server";

export async function GET() {
	try {
		const result = await testResendConnection();

		if (result.success) {
			return NextResponse.json({
				success: true,
				message: "Test de connexion Resend réussi !",
				data: result.data,
			});
		} else {
			return NextResponse.json(
				{
					success: false,
					message: "Test de connexion Resend échoué",
					error: result.error,
				},
				{ status: 500 }
			);
		}
	} catch (error) {
		console.error("Erreur test email:", error);
		return NextResponse.json(
			{
				success: false,
				message: "Erreur lors du test",
				error: error,
			},
			{ status: 500 }
		);
	}
}

export async function POST() {
	try {
		const result = await testResendConnection();

		if (result.success) {
			return NextResponse.json({
				success: true,
				message: "Test de connexion Resend réussi !",
				data: result.data,
			});
		} else {
			return NextResponse.json(
				{
					success: false,
					message: "Test de connexion Resend échoué",
					error: result.error,
				},
				{ status: 500 }
			);
		}
	} catch (error) {
		console.error("Erreur test email:", error);
		return NextResponse.json(
			{
				success: false,
				message: "Erreur lors du test",
				error: error,
			},
			{ status: 500 }
		);
	}
}
