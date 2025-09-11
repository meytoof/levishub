# 🎨 Système de Thèmes LevisWeb

## Vue d'ensemble

Le système de thèmes a été refactorisé pour éliminer le "spaghetti code" et créer une architecture plus maintenable et réutilisable.

## 🏗️ Architecture

### 1. Variables CSS (`globals.css`)

```css
:root {
	/* Thème Light - Cyan */
	--light-primary: #06b6d4;
	--light-primary-dark: #0891b2;
	--light-primary-darker: #0e7490;
	--light-primary-darkest: #155e75;

	/* Thème Dark - Violet/Rose */
	--dark-primary: #a855f7;
	--dark-primary-dark: #ec4899;
	--dark-primary-darker: #f43f5e;
	--dark-primary-darkest: #e11d48;
}
```

### 2. Classes CSS Organisées

-   **`.text-gradient-cyan`** : Gradient cyan en light, violet en dark
-   **`.btn-cyan-gradient`** : Bouton adaptatif au thème
-   **`.process-circle-*`** : Cercles de processus adaptatifs
-   **`.feature-shadow-*`** : Ombres adaptatives
-   **`.pricing-*`** : Composants de tarifs adaptatifs

### 3. Composants React Réutilisables (`theme-components.tsx`)

## 🚀 Utilisation

### Composants de Base

#### ThemeText

```tsx
import { ThemeText } from "@/components/ui/theme-components";

// Gradient adaptatif au thème
<ThemeText variant="auto">Titre principal</ThemeText>

// Gradient cyan fixe
<ThemeText variant="cyan">Titre cyan</ThemeText>

// Gradient violet fixe
<ThemeText variant="violet">Titre violet</ThemeText>
```

#### ThemeButton

```tsx
import { ThemeButton } from "@/components/ui/theme-components";

// Bouton avec gradient adaptatif
<ThemeButton variant="primary" size="lg">
  Cliquez ici
</ThemeButton>

// Bouton avec lien
<ThemeButton href="/contact" variant="secondary">
  Contact
</ThemeButton>
```

#### ThemeCard

```tsx
import { ThemeCard } from "@/components/ui/theme-components";

// Carte avec ombre adaptative
<ThemeCard shadow={1}>
  <h3>Contenu de la carte</h3>
</ThemeCard>

// Carte de tarifs
<ThemeCard variant="pricing">
  <h3>Plan Pro</h3>
</ThemeCard>
```

#### ThemeBadge

```tsx
import { ThemeBadge } from "@/components/ui/theme-components";

// Badge populaire
<ThemeBadge variant="popular">⭐ Populaire</ThemeBadge>

// Badge offre limitée
<ThemeBadge variant="limited">🔥 -20%</ThemeBadge>

// Badge tech
<ThemeBadge variant="tech1">React</ThemeBadge>
```

#### ThemeProcessStep

```tsx
import { ThemeProcessStep } from "@/components/ui/theme-components";

// Étape avec ligne de connexion
<ThemeProcessStep
  number={1}
  title="Diagnostic"
  description="Analyse de vos besoins"
/>

// Dernière étape (sans ligne)
<ThemeProcessStep
  number={3}
  title="Lancement"
  showLine={false}
/>
```

### Classes CSS Directes

#### Textes

```tsx
// Gradient adaptatif au thème
<h1 className="text-gradient-cyan">Titre principal</h1>

// Gradient violet fixe
<h2 className="text-gradient-violet">Sous-titre</h2>
```

#### Boutons

```tsx
// Bouton avec gradient adaptatif
<button className="btn-cyan-gradient px-6 py-3">Action</button>
```

#### Processus

```tsx
// Cercles numérotés
<div className="w-16 h-16 process-circle-1 rounded-full flex items-center justify-center">
  1
</div>

// Lignes de connexion
<div className="h-1 w-full process-line-1 rounded-full"></div>
```

#### Ombres

```tsx
// Ombres adaptatives
<div className="feature-shadow-1">Contenu avec ombre</div>
```

## 🎯 Avantages du Nouveau Système

### ✅ Avant (Spaghetti Code)

-   Duplication de code CSS
-   Sélecteurs `html.dark` partout
-   Difficile à maintenir
-   Risque d'incohérences

### ✅ Après (Code Propre)

-   Variables CSS centralisées
-   Classes réutilisables
-   Composants React typés
-   Maintenance facilitée
-   Cohérence garantie

## 🔧 Maintenance

### Ajouter une nouvelle couleur

1. Ajouter la variable dans `:root`
2. Utiliser dans les classes existantes
3. Pas besoin de modifier les composants React

### Ajouter un nouveau composant

1. Créer la classe CSS avec les variables
2. Ajouter le composant React dans `theme-components.tsx`
3. Réutiliser partout dans l'application

### Modifier un thème

1. Modifier les variables CSS dans `:root`
2. Tous les composants s'adaptent automatiquement
3. Pas de modification de code nécessaire

## 📱 Responsive et Accessibilité

-   **Contraste 3:1** garanti entre texte et fond
-   **Transitions fluides** entre les thèmes
-   **Support des préférences système** via `next-themes`
-   **Classes utilitaires** pour tous les cas d'usage

## 🚨 Bonnes Pratiques

### ✅ À faire

-   Utiliser les composants `Theme*` pour la cohérence
-   Utiliser les variables CSS pour les couleurs personnalisées
-   Tester sur les deux thèmes avant déploiement

### ❌ À éviter

-   Créer des classes CSS personnalisées sans utiliser les variables
-   Dupliquer le code de thème
-   Oublier de tester le contraste

## 🔍 Dépannage

### Le thème ne change pas

1. Vérifier que `next-themes` est bien configuré
2. Vérifier que la classe `dark` est bien ajoutée au `<html>`
3. Vérifier que les variables CSS sont bien définies

### Couleurs incohérentes

1. Vérifier l'utilisation des bonnes classes CSS
2. Vérifier que les composants `Theme*` sont bien importés
3. Vérifier la cohérence des variables CSS

### Performance

1. Les composants `Theme*` sont optimisés avec `React.memo`
2. Les classes CSS utilisent des variables pour éviter la duplication
3. Le système est conçu pour être léger et rapide
