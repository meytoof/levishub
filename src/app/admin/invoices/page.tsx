import { redirect } from "next/navigation";

export default function AdminInvoicesRedirectPage() {
	redirect("/admin");
	return null;
}
