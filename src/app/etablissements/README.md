# Architecture des Composants - Page Établissements

## Vue d'ensemble

La page des établissements a été refactorisée pour être plus modulaire et maintenable. La vue "liste" a été supprimée pour ne garder que les vues "grille" et "carte".

## Structure des Composants

### Composants Principaux

#### `page.tsx`

- **Rôle** : Composant principal orchestrant toute la logique de la page
- **Responsabilités** :
  - Gestion des états (établissements, filtres, pagination)
  - Appels API via les services
  - Coordination entre tous les composants

#### `PageHeader.tsx`

- **Rôle** : En-tête de page avec gradient et statistiques
- **Props** :
  - `totalEstablishments: number` - Nombre total d'établissements

#### `ModernSearchBar.tsx`

- **Rôle** : Barre de recherche avancée avec filtres
- **Props** :
  - `filterOptions` - Options disponibles pour les filtres
  - `filters` - Filtres actuellement actifs
  - `onFiltersChange` - Callback pour modification des filtres
  - `onReset` - Callback pour réinitialiser les filtres
  - `isLoading` - État de chargement

#### `ViewControls.tsx`

- **Rôle** : Contrôles pour changer de vue et afficher les résultats
- **Props** :
  - `viewMode` - Mode de vue actuel ("grid" | "map")
  - `onViewModeChange` - Callback pour changer de vue
  - `hasActiveFilters` - Indique si des filtres sont actifs
  - `onResetFilters` - Callback pour réinitialiser
  - `filters` - Filtres actuels
  - `totalResults` - Nombre total de résultats

### Composants de Contenu

#### `EtablissementGrid.tsx`

- **Rôle** : Grille des établissements avec pagination
- **Props** :
  - `etablissements` - Liste des établissements
  - `pagination` - Informations de pagination
  - `onViewDetails` - Callback pour voir les détails
  - `onViewOnMap` - Callback pour voir sur la carte
  - `onPageChange` - Callback pour changer de page
  - `isLoading` - État de chargement

#### `ModernEtablissementCard.tsx`

- **Rôle** : Carte moderne pour afficher un établissement
- **Features** : Design moderne avec gradients et animations

#### `GoogleMapComponent.tsx`

- **Rôle** : Composant de carte interactive Google Maps
- **Features** : Marqueurs personnalisés, popups, filtrage

### Composants d'États

#### `LoadingState.tsx`

- **Rôle** : Affichage de l'état de chargement
- **Features** : Spinner avec message

#### `ErrorState.tsx`

- **Rôle** : Affichage des erreurs
- **Props** :
  - `error: string` - Message d'erreur
  - `onRetry: () => void` - Callback pour réessayer

#### `EmptyState.tsx`

- **Rôle** : Affichage quand aucun résultat n'est trouvé
- **Props** :
  - `onReset: () => void` - Callback pour réinitialiser

#### `Pagination.tsx`

- **Rôle** : Composant de pagination
- **Features** : Navigation entre les pages

## Types de Vue

### Vue Grille (`grid`)

- Affichage en grille responsive (1-3 colonnes selon l'écran)
- Cartes modernes avec effets hover
- Pagination en bas de page

### Vue Carte (`map`)

- Carte Google Maps plein écran
- Marqueurs interactifs
- Popups avec informations de base

## Avantages de cette Architecture

1. **Modularité** : Chaque composant a une responsabilité claire
2. **Réutilisabilité** : Les composants peuvent être réutilisés ailleurs
3. **Maintenabilité** : Plus facile de modifier un composant spécifique
4. **Testabilité** : Chaque composant peut être testé individuellement
5. **Performance** : Possibilité d'optimiser chaque composant séparément

## Flux de Données

```
page.tsx (état global)
├── PageHeader (affichage)
├── ModernSearchBar (filtres)
├── ViewControls (mode de vue)
└── Contenu conditionnel
    ├── GoogleMapComponent (vue carte)
    └── Vue grille
        ├── LoadingState
        ├── ErrorState
        ├── EtablissementGrid
        └── EmptyState
```

## Notes Techniques

- Suppression de la vue "liste" pour simplifier l'interface
- Utilisation de TypeScript strict pour la sécurité des types
- Composants "use client" pour l'interactivité côté client
- Intégration Google Maps avec marqueurs personnalisés
- Design responsive avec Tailwind CSS
