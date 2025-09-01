# 🏢 Système Multi-Tenant LevisHub

Ce document décrit l'implémentation du système multi-tenant avec gestion des clients, invitations et préparation pour l'intégration Stripe.

## 🚀 Fonctionnalités Implémentées

### ✅ Base de données Multi-Tenant

-   **Modèle `Client`** : Gestion des entreprises clientes
-   **Modèle `Invitation`** : Système d'invitation par email
-   **Modèle `Ticket`** : Support client avec priorités
-   **Modèle `Invoice`** : Facturation (prêt pour Stripe)
-   **Relations** : User → Client, Site → Client, etc.

### ✅ Authentification & Autorisations

-   **NextAuth** avec rôles ADMIN/CLIENT
-   **Système d'invitations** : Création de comptes par l'ADMIN
-   **Séparation des données** par client
-   **Session JWT** avec `clientId`

### ✅ Interface d'Administration

-   **Dashboard ADMIN** : Vue d'ensemble des clients
-   **Gestion des clients** : CRUD complet
-   **Système d'invitations** : Création et suivi
-   **Navigation** : Sidebar et routes protégées

### ✅ API REST

-   `POST /api/admin/clients` : Créer un client
-   `GET /api/admin/clients` : Lister les clients
-   `POST /api/admin/invitations` : Créer une invitation
-   `POST /api/invitations/accept` : Accepter une invitation
-   `GET /api/invitations/validate` : Valider un token

## 🗄️ Schéma de Base de Données

```prisma
model Client {
  id                String   @id @default(cuid())
  name              String           // Contact principal
  companyName       String           // Nom de l'entreprise
  primaryEmail      String   @unique // Email principal
  stripeCustomerId  String?  @unique // ID Stripe (optionnel)
  isActive          Boolean  @default(true)

  // Relations
  users             User[]
  sites             Site[]
  invitations       Invitation[]
  tickets           Ticket[]
  invoices          Invoice[]

  createdAt         DateTime @default(now())
  updatedAt         DateTime @updatedAt
}

model User {
  id                 String    @id @default(cuid())
  name               String?
  email              String?   @unique
  role               Role      @default(CLIENT)
  clientId           String?   // Lien vers le client (nullable pour compatibilité)

  // Relations
  client             Client?   @relation(fields: [clientId], references: [id])
  createdInvitations Invitation[] @relation("InvitationCreator")
  tickets            Ticket[]

  // ... autres champs existants
}

model Invitation {
  id              String    @id @default(cuid())
  clientId        String
  email           String
  token           String    @unique
  status          InvitationStatus @default(PENDING)
  expiresAt       DateTime
  acceptedAt      DateTime?
  createdByUserId String

  // Relations
  client          Client    @relation(fields: [clientId], references: [id])
  createdBy       User      @relation("InvitationCreator", fields: [createdByUserId], references: [id])

  createdAt       DateTime  @default(now())
  updatedAt       DateTime  @updatedAt
}

model Ticket {
  id              String        @id @default(cuid())
  clientId        String
  createdByUserId String
  title           String
  description     String?
  status          TicketStatus  @default(OPEN)
  priority        TicketPriority @default(MEDIUM)

  // Relations
  client          Client        @relation(fields: [clientId], references: [id])
  createdBy       User          @relation(fields: [createdByUserId], references: [id])

  createdAt       DateTime      @default(now())
  updatedAt       DateTime      @updatedAt
}

model Invoice {
  id                 String    @id @default(cuid())
  clientId           String
  stripeInvoiceId    String?   @unique
  status             InvoiceStatus
  amountDue          Int       // en centimes
  amountPaid         Int       // en centimes
  currency           String    @default("eur")
  periodStart        DateTime?
  periodEnd          DateTime?
  hostedInvoiceUrl   String?

  // Relations
  client             Client    @relation(fields: [clientId], references: [id])

  createdAt          DateTime  @default(now())
  updatedAt          DateTime  @updatedAt
}
```

## 📧 Système d'Emails

### Configuration Resend

LevisHub utilise **Resend** pour l'envoi d'emails professionnels :

1. **Créer un compte** : https://resend.com
2. **Récupérer la clé API** dans les paramètres
3. **Ajouter dans `.env.local`** : `RESEND_API_KEY=re_...`

### Types d'Emails

#### 📧 Emails d'Invitation

-   **Déclencheur** : Création d'invitation par l'admin
-   **Destinataire** : Nouveau client
-   **Contenu** : Lien d'invitation, informations entreprise
-   **Expiration** : 7 jours

#### 🎫 Notifications de Tickets

-   **Déclencheur** : Création ou mise à jour de ticket
-   **Destinataire** : Admin (nouveaux tickets) / Client (mises à jour)
-   **Contenu** : Statut, priorité, lien vers le ticket

### Templates d'Emails

-   **Design moderne** avec gradients et animations
-   **Responsive** pour tous les appareils
-   **Branding LevisHub** cohérent
-   **Liens directs** vers l'application

### Test et Validation

```bash
# Test complet des emails
node scripts/test-email-workflow.js

# Interface web de test
http://localhost:3000/test-email
```

## 🔐 Workflow d'Authentification

### 1. Création d'un Client (ADMIN)

```typescript
// L'ADMIN crée un client via /admin/clients
POST /api/admin/clients
{
  "name": "Contact Principal",
  "companyName": "Entreprise SARL",
  "primaryEmail": "contact@entreprise.com"
}
```

### 2. Invitation d'un Utilisateur (ADMIN)

```typescript
// L'ADMIN invite un utilisateur
POST /api/admin/invitations
{
  "clientId": "client_id",
  "email": "user@entreprise.com"
}
```

### 3. Acceptation de l'Invitation (Utilisateur)

```typescript
// L'utilisateur accepte l'invitation
POST /api/invitations/accept
{
  "token": "invitation_token",
  "password": "nouveau_mot_de_passe",
  "name": "Nom de l'utilisateur"
}
```

### 4. Connexion et Session

-   L'utilisateur se connecte via `/login`
-   NextAuth crée une session avec `clientId`
-   Les données sont filtrées par `clientId`

## 🧪 Tests et Validation

### Script de Test Basique

```bash
node scripts/test-multitenant-workflow.js
```

### Script de Test Email

```bash
node scripts/test-email-workflow.js
```

### Script de Test Complet (avec Stripe)

```bash
node scripts/test-stripe-workflow.js
```

### Test via Interface Web

-   URL : http://localhost:3000/test-email
-   Interface graphique pour tester les emails
-   Vérification de la configuration Resend

### Données de Test Créées

-   **Client** : Entreprise Test SARL
-   **Utilisateur** : test-user@test-entreprise.com (password123)
-   **Site** : test-entreprise.com
-   **Ticket** : Question sur l'analytics
-   **Facture** : 29€

## 🔗 URLs de Test

-   **Admin Dashboard** : http://localhost:3000/dashboard/admin
-   **Gestion Clients** : http://localhost:3000/admin/clients
-   **Connexion** : http://localhost:3000/login
-   **Dashboard Client** : http://localhost:3000/dashboard

## 🚧 Prochaines Étapes

### Phase 1 : Finalisation Multi-Tenant

-   [ ] Interface de gestion des tickets
-   [ ] Dashboard client avec analytics
-   [ ] Gestion des factures
-   [ ] Système de notifications

### Phase 2 : Intégration Stripe

-   [ ] Configuration des clés Stripe
-   [ ] Modification de `/api/stripe/checkout` pour inclure `clientId`
-   [ ] Implémentation des webhooks Stripe
-   [ ] Synchronisation des abonnements et factures

### Phase 3 : Emails ✅

-   [x] Intégration Resend pour les invitations
-   [x] Templates d'emails personnalisés
-   [x] Notifications automatiques
-   [x] Système de test d'emails

### Phase 4 : Production

-   [ ] Migration vers PostgreSQL
-   [ ] Désactivation de `/register` public
-   [ ] Tests de charge et sécurité
-   [ ] Monitoring et logs

## 🔧 Configuration

### Variables d'Environnement

```bash
# Base de données
DATABASE_URL="file:./dev.db"  # SQLite pour le développement

# NextAuth
NEXTAUTH_SECRET="your-secret-key"
NEXTAUTH_URL="http://localhost:3000"

# Stripe (pour plus tard)
STRIPE_SECRET_KEY="sk_test_..."
STRIPE_PRICE_ID="price_..."
STRIPE_WEBHOOK_SECRET="whsec_..."

# Resend (pour les emails)
RESEND_API_KEY="re_..."
```

### Commandes Prisma

```bash
# Générer le client
npx prisma generate

# Appliquer les migrations
npx prisma migrate dev

# Réinitialiser la base (dev uniquement)
npx prisma migrate reset --force

# Ouvrir Prisma Studio
npx prisma studio
```

## 🏗️ Architecture

### Structure des Dossiers

```
src/
├── app/
│   ├── admin/           # Routes ADMIN
│   │   ├── clients/     # Gestion des clients
│   │   └── tickets/     # Gestion des tickets
│   ├── dashboard/       # Dashboard client
│   └── invite/          # Acceptation d'invitation
├── api/
│   ├── admin/           # APIs ADMIN
│   └── invitations/     # APIs d'invitation
└── components/
    └── ui/              # Composants shadcn/ui
```

### Sécurité

-   **Middleware** : Vérification des rôles et accès client
-   **Prisma** : Filtrage automatique par `clientId`
-   **NextAuth** : Session JWT avec informations de sécurité
-   **Validation** : Vérification des tokens d'invitation

## 📊 Métriques et Monitoring

### Données Suivies

-   Nombre de clients actifs
-   Utilisateurs par client
-   Tickets ouverts/fermés
-   Factures et abonnements
-   Taux d'acceptation des invitations

### Logs

-   Création/modification de clients
-   Invitations envoyées/acceptées
-   Connexions utilisateurs
-   Actions administratives

## 🎯 Objectifs Atteints

✅ **Multi-tenant** : Chaque client a ses données isolées  
✅ **Invitations** : Système sécurisé de création de comptes  
✅ **Rôles** : ADMIN et CLIENT avec permissions appropriées  
✅ **Base de données** : Schéma extensible et performant  
✅ **API** : Endpoints REST sécurisés  
✅ **Interface** : Dashboard admin fonctionnel  
✅ **Tests** : Scripts de validation complets

## 🚀 Démarrage Rapide

1. **Cloner et installer**

    ```bash
    npm install
    ```

2. **Générer Prisma**

    ```bash
    npx prisma generate
    ```

3. **Lancer les migrations**

    ```bash
    npx prisma migrate dev
    ```

4. **Créer un admin**

    ```bash
    node scripts/create-admin.js
    ```

5. **Configurer Resend**

    - Créer un compte sur https://resend.com
    - Récupérer la clé API
    - Ajouter `RESEND_API_KEY=re_...` dans `.env.local`

6. **Tester les emails**

    ```bash
    node scripts/test-email-workflow.js
    ```

7. **Tester le workflow complet**

    ```bash
    node scripts/test-multitenant-workflow.js
    ```

8. **Démarrer l'application**

    ```bash
    npm run dev
    ```

9. **Se connecter en admin**

    - URL : http://localhost:3000/login
    - Email : admin@levishub.com
    - Mot de passe : admin123

10. **Tester les emails via l'interface**
    - URL : http://localhost:3000/test-email

---

**LevisHub Multi-Tenant** - Système de gestion client professionnel  
_Développé avec Next.js, Prisma, NextAuth et Tailwind CSS_
