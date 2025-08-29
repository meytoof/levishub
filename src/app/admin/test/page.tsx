export default function AdminTestPage() {
	return (
		<div className="bo-container bo-py-8">
			<h1 className="bo-text-3xl bo-font-bold bo-text-primary bo-mb-4">
				Page de test Admin
			</h1>
			<p className="bo-text-neutral-500">
				Si vous voyez cette page, le routing admin fonctionne
				correctement !
			</p>
			<div className="bo-mt-6 bo-p-4 bo-bg-success-50 bo-border bo-border-success-200 bo-rounded-lg">
				<p className="bo-text-success-800">
					✅ Le layout admin et le CSS isolé fonctionnent parfaitement
					!
				</p>
			</div>
		</div>
	);
}
