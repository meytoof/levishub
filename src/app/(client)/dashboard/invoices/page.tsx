"use client";
import {
  Calendar,
  CreditCard,
  Download,
  ExternalLink,
  Loader2,
} from "lucide-react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

interface SubscriptionData {
  customer: {
    id: string;
    email: string;
    name: string;
    created: number;
  };
  subscriptions: Array<{
    id: string;
    status: string;
    current_period_start: number;
    current_period_end: number;
    cancel_at_period_end: boolean;
    canceled_at: number | null;
    trial_start: number | null;
    trial_end: number | null;
    items: Array<{
      id: string;
      quantity: number;
      price: {
        id: string;
        amount: number;
        currency: string;
        interval: string;
        product: {
          id: string;
          name: string;
          description: string;
        };
      };
    }>;
  }>;
  invoices: Array<{
    id: string;
    number: string;
    status: string;
    amount_paid: number;
    amount_due: number;
    currency: string;
    created: number;
    due_date: number | null;
    hosted_invoice_url: string;
    invoice_pdf: string;
  }>;
}

async function createPortalSession(): Promise<string | null> {
  try {
    const res = await fetch("/api/stripe/portal", { method: "POST" });
    if (!res.ok) return null;
    const data = await res.json();
    return data.url as string;
  } catch {
    return null;
  }
}

async function fetchSubscriptionData(): Promise<SubscriptionData | null> {
  try {
    const res = await fetch("/api/stripe/subscription");
    if (!res.ok) return null;
    return await res.json();
  } catch {
    return null;
  }
}

function formatDate(timestamp: number): string {
  return new Date(timestamp * 1000).toLocaleDateString("fr-FR");
}

function formatAmount(amount: number, currency: string): string {
  return new Intl.NumberFormat("fr-FR", {
    style: "currency",
    currency: currency.toUpperCase(),
  }).format(amount / 100);
}

function getStatusColor(status: string): string {
  switch (status) {
    case "active":
      return "text-green-500";
    case "canceled":
      return "text-red-500";
    case "past_due":
      return "text-yellow-500";
    case "incomplete":
      return "text-orange-500";
    default:
      return "text-gray-500";
  }
}

function getStatusText(status: string): string {
  switch (status) {
    case "active":
      return "Actif";
    case "canceled":
      return "Annulé";
    case "past_due":
      return "En retard";
    case "incomplete":
      return "Incomplet";
    default:
      return status;
  }
}

export default function InvoicesPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [subscriptionData, setSubscriptionData] =
    useState<SubscriptionData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (status === "loading") return;
    if (!session) router.push("/login");
    if (session?.user.role !== "CLIENT") router.push("/");
  }, [session, status, router]);

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      setError(null);
      const data = await fetchSubscriptionData();
      if (data) {
        setSubscriptionData(data);
      } else {
        setError("Impossible de charger les données d'abonnement");
      }
      setLoading(false);
    };

    if (session?.user.role === "CLIENT") {
      loadData();
    }
  }, [session]);

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-center p-8">
          <Loader2 className="w-8 h-8 animate-spin text-blue-500" />
          <span className="ml-2 text-[#a0a0a0]">Chargement des données...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Gestion du portail */}
      <div className="card">
        <div className="card-content p-6 flex items-center justify-between gap-4">
          <div>
            <h2 className="text-xl font-semibold">Gérer mon abonnement</h2>
            <p className="text-[#a0a0a0]">
              Mettre à jour le moyen de paiement, consulter les factures,
              modifier ou annuler l&apos;abonnement.
            </p>
          </div>
          <button
            type="button"
            className="btn-primary p-40px"
            onClick={async () => {
              const url = await createPortalSession();
              if (url) window.open(url, "_blank");
            }}
          >
            {/* <ExternalLink className="w-4 h-4 mr-2" /> */}
            Ouvrir le portail Stripe
          </button>
        </div>
      </div>

      {error && (
        <div className="card">
          <div className="card-content p-6">
            <div className="text-red-500 text-center">{error}</div>
          </div>
        </div>
      )}

      {subscriptionData && (
        <>
        <div className="grid grid-cols-2 gap-4 mt-2">
          <div className="card">
            <div className="card-header">
              <h3 className="card-title flex items-center gap-2">
                <CreditCard className="w-5 h-5 text-blue-500" />
                Informations du compte
              </h3>
            </div>
            <div className="card-content">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-[#a0a0a0]">Nom</p>
                  <p className="font-semibold">
                    {subscriptionData.customer.name || "Non défini"}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-[#a0a0a0]">Email</p>
                  <p className="font-semibold">
                    {subscriptionData.customer.email}
                  </p>
                </div>

              </div>
            </div>
          </div>

          {/* Abonnements actifs */}
          {subscriptionData.subscriptions.length > 0 && (
            <div className="card">
              <div className="card-header">
                <h3 className="card-title flex items-center gap-2">
                  <Calendar className="w-5 h-5 text-green-500" />
                  Mes abonnements
                </h3>
              </div>
              <div className="card-content">
                <div className="space-y-4">
                  {subscriptionData.subscriptions.map((subscription) => (
                    <div
                      key={subscription.id}
                      className="border border-gray-700 rounded-lg p-4"
                    >
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-2">
                          <span
                            className={`font-semibold ${getStatusColor(
                              subscription.status
                            )}`}
                          >
                            {getStatusText(subscription.status)}
                          </span>
                          {subscription.cancel_at_period_end && (
                            <span className="text-yellow-500 text-sm">
                              (Annulation à la fin de la période)
                            </span>
                          )}
                        </div>
                        <span className="text-sm text-[#a0a0a0]">
                          ID: {subscription.id}
                        </span>
                      </div>

                      {subscription.items.map((item) => (
                        <div key={item.id} className="mb-3">
                          <h4 className="font-semibold">
                            {item.price.product.name}
                          </h4>
                          <p className="text-sm text-[#a0a0a0] mb-2">
                            {item.price.product.description}
                          </p>
                          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                            <div>
                              <span className="text-[#a0a0a0]">Prix:</span>
                              <p className="font-semibold">
                                {formatAmount(
                                  item.price.amount,
                                  item.price.currency
                                )}
                              </p>
                            </div>
                            <div>
                              <span className="text-[#a0a0a0]">
                                Facturation:
                              </span>
                              <p className="font-semibold">
                                {item.price.interval === "month" ? "Mensuel" : "Annuel"}
                              </p>
                            </div>
                            <div>
                              <span className="text-[#a0a0a0]">Quantité:</span>
                              <p className="font-semibold">{item.quantity}</p>
                            </div>
                            <div>
                              <span className="text-[#a0a0a0]">
                                Prochaine facture:
                              </span>
                              <p className="font-semibold">
                                {formatDate(subscription.current_period_end)}
                              </p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
          </div>

          {/* Factures récentes */}
          {subscriptionData.invoices.length > 0 && (
            <div className="card mt-2">
              <div className="card-header">
                <h3 className="card-title flex items-center gap-2">
                  <Download className="w-5 h-5 text-blue-500" />
                  Factures récentes
                </h3>
              </div>
              <div className="card-content">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-gray-700">
                        <th className="text-left py-2">Numéro</th>
                        <th className="text-left py-2">Statut</th>
                        <th className="text-left py-2">Montant</th>
                        <th className="text-left py-2">Date</th>
                        <th className="text-left py-2">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {subscriptionData.invoices.map((invoice) => (
                        <tr
                          key={invoice.id}
                          className="border-b border-gray-800"
                        >
                          <td className="py-2 font-mono text-sm">
                            {invoice.number}
                          </td>
                          <td className="py-2">
                            <span
                              className={`font-semibold ${getStatusColor(
                                invoice.status
                              )}`}
                            >
                              {getStatusText(invoice.status)}
                            </span>
                          </td>
                          <td className="py-2 font-semibold">
                            {formatAmount(
                              invoice.amount_paid || invoice.amount_due,
                              invoice.currency
                            )}
                          </td>
                          <td className="py-2">
                            {formatDate(invoice.created)}
                          </td>
                          <td className="py-2">
                            <div className="flex gap-2">
                              {invoice.hosted_invoice_url && (
                                <a
                                  href={invoice.hosted_invoice_url}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="text-blue-500 hover:underline text-sm"
                                >
                                  Voir
                                </a>
                              )}
                              {invoice.invoice_pdf && (
                                <a
                                  href={invoice.invoice_pdf}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="text-green-500 hover:underline text-sm"
                                >
                                  PDF
                                </a>
                              )}
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}
