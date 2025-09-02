# 🏫 EduMap - Page des Établissements Scolaires

Cette page permet d'explorer et rechercher parmi les **15 216 établissements scolaires du Togo** avec une interface moderne et intuitive.

## 🚀 Fonctionnalités

### 📊 Affichage des données

- **Vue Grille** : Cartes d'établissements avec informations essentielles
- **Vue Liste** : Affichage compact pour une navigation rapide
- **Vue Carte** : Visualisation géographique interactive avec Leaflet

### 🔍 Système de filtrage avancé

- **Recherche textuelle** : Par nom d'établissement
- **Filtres géographiques** : Région, préfecture
- **Filtres d'établissement** : Statut (Public, Privé...), Milieu (Urbain, Rural), Système (Préscolaire, Primaire...)
- **Filtres d'infrastructure** : Électricité, eau potable, latrines

### 🗺️ Carte interactive

- **Marqueurs colorés** par statut d'établissement
- **Popups détaillées** avec informations clés
- **Légende** pour identifier les types d'établissements
- **Filtrage en temps réel** sur la carte

### 📱 Interface responsive

- **Design moderne** avec Tailwind CSS
- **Navigation intuitive** entre les vues
- **Pagination efficace** pour de gros volumes de données
- **États de chargement** et gestion d'erreurs

## 🏗️ Architecture

### 📁 Structure des dossiers

```
src/app/ets/
├── _model/
│   └── etablissement.ts        # Types TypeScript
├── _services/
│   └── etablissementService.ts # Actions serveur & API calls
├── _components/
│   ├── EtablissementCard.tsx   # Carte d'établissement
│   ├── EtablissementMap.tsx    # Composant carte Leaflet
│   ├── FilterPanel.tsx         # Panneau de filtres
│   ├── Pagination.tsx          # Composant pagination
│   └── StatsDisplay.tsx        # Affichage des statistiques
├── page.tsx                    # Page principale
└── styles.css                  # Styles spécifiques
```

### 🔧 Technologies utilisées

- **Next.js 15** avec App Router
- **TypeScript** pour la sécurité des types
- **Tailwind CSS** pour le styling
- **Leaflet** + **react-leaflet** pour la cartographie
- **Lucide React** pour les icônes
- **Server Actions** pour les appels API

## 🌍 API Integration

### Endpoints utilisés

- `GET /api/etablissements` - Liste paginée
- `GET /api/etablissements/search` - Recherche avec filtres
- `GET /api/etablissements/filter-options` - Options de filtrage
- `GET /api/etablissements/map` - Données pour la carte

### 📡 Gestion des données

- **Cache intelligent** : Force-cache pour les options statiques, no-store pour les données dynamiques
- **Gestion d'erreurs** : Affichage d'états d'erreur avec possibilité de retry
- **Loading states** : Indicateurs visuels pendant les chargements

## 🎨 Design System

### 🏷️ Codes couleur par statut

- **Public** : Vert (`#10b981`)
- **Privé Laïc** : Bleu (`#3b82f6`)
- **Privé Catholique** : Violet (`#8b5cf6`)
- **Privé Protestant** : Orange (`#f59e0b`)
- **Privé Islamique** : Cyan (`#06b6d4`)
- **Communautaire** : Rouge (`#ef4444`)

### 🏃 Performances

- **Lazy loading** des données de carte
- **Pagination** pour limiter les requêtes
- **Debouncing** sur la recherche textuelle
- **Memoization** des composants coûteux

## 🔄 États de l'application

### 📊 Gestion des états

- **Loading** : Affichage de loaders pendant les requêtes
- **Error** : Messages d'erreur avec boutons de retry
- **Empty** : État vide avec actions suggérées
- **Success** : Affichage des données avec statistiques

### 🔍 Filtres actifs

- **Badges** affichant les filtres appliqués
- **Compteur** de filtres actifs
- **Reset rapide** de tous les filtres

## 🚀 Utilisation

### Navigation

1. **Sélection de vue** : Utilisez les boutons Grille/Liste/Carte
2. **Filtrage** : Utilisez le panneau de filtres à gauche
3. **Recherche** : Tapez dans la barre de recherche et appuyez sur Entrée
4. **Pagination** : Naviguez entre les pages en bas

### Interactions carte

1. **Zoom** : Utilisez la molette ou les boutons +/-
2. **Markers** : Cliquez sur un marqueur pour voir les détails
3. **Légende** : Consultez la légende en haut à droite
4. **Filtres** : Les filtres s'appliquent automatiquement sur la carte

## 🔧 Configuration

### Variables d'environnement

```env
API_BASE_URL=https://edumap-api.bestwebapp.tech/api
```

### Constantes importantes

- **Total établissements** : 15 116
- **Régions** : 7 (CENTRALE, GRAND LOME, KARA, MARITIME, PLATEAUX EST, PLATEAUX OUEST, SAVANES)
- **Préfectures** : 39
- **Per page par défaut** : 20
- **Per page maximum** : 100

## 🎯 Prochaines améliorations

- [ ] Export PDF/Excel des résultats
- [ ] Favoris utilisateur
- [ ] Comparaison d'établissements
- [ ] Recherche géographique (rayon)
- [ ] Statistiques avancées par région
- [ ] Mode hors-ligne avec cache
- [ ] Partage de liens filtrés

## 🐛 Résolution de problèmes

### Carte ne s'affiche pas

- Vérifiez que Leaflet CSS est bien importé
- Contrôlez la console pour les erreurs JavaScript

### Données ne se chargent pas

- Vérifiez la connexion internet
- Contrôlez l'URL de l'API dans la console réseau

### Filtres ne fonctionnent pas

- Utilisez le bouton "Réinitialiser" pour remettre à zéro
- Vérifiez que les paramètres de filtrage sont valides
