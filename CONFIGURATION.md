# 🔧 Configuration LevisWeb

## Variables d'environnement requises

Créez un fichier `.env` à la racine du projet avec les variables suivantes :

```env
# Base de données
DATABASE_URL="file:./dev.db"

# NextAuth
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your-secret-key-here-change-in-production

# Resend (Email)
RESEND_API_KEY=re_your_resend_api_key_here
```

## 📋 Étapes de configuration

### 1. Base de données

-   La base de données SQLite sera créée automatiquement
-   Pour la production, changez `DATABASE_URL` vers PostgreSQL

### 2. NextAuth

-   `NEXTAUTH_URL` : URL de votre application
-   `NEXTAUTH_SECRET` : Clé secrète pour les sessions (générez une clé aléatoire)

### 3. Resend (Email)

-   Créez un compte sur [resend.com](https://resend.com)
-   Récupérez votre clé API
-   Remplacez `re_your_resend_api_key_here` par votre vraie clé

## 🚀 Test de la configuration

Une fois configuré, testez avec :

```bash
npm run dev
```

Puis visitez :

-   `http://localhost:3000` - Site principal
-   `http://localhost:3000/admin` - Backoffice admin
-   `http://localhost:3000/login` - Page de connexion

## 🔐 Sécurité

⚠️ **Important** :

-   Ne commitez jamais le fichier `.env` dans Git
-   Changez `NEXTAUTH_SECRET` en production
-   Utilisez des clés API différentes pour dev/prod
