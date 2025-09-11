# 🎨 Système de Thème - LevisWeb

## Vue d'ensemble

LevisWeb dispose maintenant d'un système de thème complet qui permet de basculer entre un thème clair et un thème sombre, avec détection automatique des préférences du navigateur.

## ✨ Fonctionnalités

-   **Toggle de thème** : Bouton soleil/lune dans la navbar
-   **Détection automatique** : Respecte les préférences système (clair/sombre)
-   **Persistance** : Le choix de l'utilisateur est sauvegardé
-   **Contrastes optimisés** : Lisibilité garantie sur les deux thèmes
-   **Variables CSS** : Utilisation des variables CSS pour une cohérence parfaite

## 🚀 Utilisation

### Pour l'utilisateur final

1. **Toggle dans la navbar** : Cliquez sur l'icône soleil/lune pour changer de thème
2. **Préférences système** : Le thème s'adapte automatiquement aux préférences de votre navigateur
3. **Persistance** : Votre choix est sauvegardé pour les prochaines visites

### Pour les développeurs

#### Variables CSS disponibles

```css
/* Couleurs principales */
--background: Couleur de fond principale
--foreground: Couleur de texte principale
--card: Couleur de fond des cartes
--card-foreground: Couleur de texte des cartes
--muted: Couleur de fond atténuée
--muted-foreground: Couleur de texte atténuée

/* Couleurs d'accent */
--primary: Couleur primaire
--primary-foreground: Couleur de texte sur fond primaire
--secondary: Couleur secondaire
--secondary-foreground: Couleur de texte sur fond secondaire
--accent: Couleur d'accent
--accent-foreground: Couleur de texte sur fond accent

/* Couleurs utilitaires */
--border: Couleur des bordures
--input: Couleur de fond des champs de saisie
--ring: Couleur des anneaux de focus
```

#### Classes Tailwind recommandées

```tsx
// Textes
className = "text-foreground"; // Texte principal
className = "text-muted-foreground"; // Texte secondaire
className = "text-card-foreground"; // Texte sur cartes

// Arrière-plans
className = "bg-background"; // Fond principal
className = "bg-card"; // Fond des cartes
className = "bg-muted"; // Fond atténué

// Bordures
className = "border-border"; // Bordure standard
className = "border-input"; // Bordure des champs

// Focus
className = "focus-visible:ring-ring"; // Anneau de focus
```

## 🔧 Configuration

### Fichiers modifiés

1. **`src/components/ui/theme-toggle.tsx`** - Composant de basculement de thème
2. **`src/components/ui/theme-provider.tsx`** - Provider de thème
3. **`src/app/layout.tsx`** - Intégration du provider
4. **`src/app/globals.css`** - Variables CSS des thèmes
5. **`tailwind.config.ts`** - Configuration Tailwind

### Dépendances ajoutées

```bash
npm install next-themes
```

## 🎯 Bonnes pratiques

### ✅ À faire

-   Utiliser les variables CSS des thèmes (`text-foreground`, `bg-background`, etc.)
-   Tester sur les deux thèmes avant de déployer
-   Vérifier les contrastes pour l'accessibilité

### ❌ À éviter

-   Utiliser des couleurs fixes (`text-white`, `bg-black`, etc.)
-   Oublier de tester sur les deux thèmes
-   Créer des contrastes insuffisants

## 🧪 Test

### Page de test

Visitez `/test-theme` pour tester tous les composants et couleurs des thèmes.

### Vérification des contrastes

1. Basculez entre les thèmes clair et sombre
2. Vérifiez que tous les textes sont lisibles
3. Testez sur différentes tailles d'écran
4. Utilisez les outils de développement pour inspecter les couleurs

## 🐛 Dépannage

### Problèmes courants

1. **Hydratation** : Utilisez `suppressHydrationWarning` sur la balise `<html>`
2. **Flashes** : Le composant `ThemeToggle` gère l'état `mounted`
3. **Contrastes** : Vérifiez que vous utilisez les bonnes variables CSS

### Debug

```tsx
import { useTheme } from "next-themes";

const { theme, setTheme } = useTheme();
console.log("Thème actuel:", theme);
```

## 📱 Responsive

Le toggle de thème est disponible sur :

-   **Desktop** : Dans la navbar principale
-   **Mobile** : Dans le menu de navigation mobile

## 🌟 Améliorations futures

-   [ ] Animation de transition entre les thèmes
-   [ ] Plus de variantes de couleurs
-   [ ] Thèmes personnalisés par utilisateur
-   [ ] Export/import des préférences de thème
