import { redirect } from "next/navigation";

export default function AdminPaymentsRedirectPage() {
	redirect("/admin");
	return null;
}
