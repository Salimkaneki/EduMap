// Système de couleurs uniforme pour EduMap
export const COLORS = {
  // Couleur principale - Indigo
  primary: {
    50: "#eef2ff",
    100: "#e0e7ff",
    200: "#c7d2fe",
    300: "#a5b4fc",
    400: "#818cf8",
    500: "#6366f1", // Couleur principale
    600: "#4f46e5", // Couleur de base
    700: "#4338ca",
    800: "#3730a3",
    900: "#312e81",
  },

  // Couleurs secondaires
  secondary: {
    purple: "#8b5cf6",
    pink: "#ec4899",
    blue: "#3b82f6",
    cyan: "#06b6d4",
    emerald: "#10b981",
    yellow: "#f59e0b",
    orange: "#f97316",
    red: "#ef4444",
  },

  // Niveaux de gris
  gray: {
    50: "#f9fafb",
    100: "#f3f4f6",
    200: "#e5e7eb",
    300: "#d1d5db",
    400: "#9ca3af",
    500: "#6b7280",
    600: "#4b5563",
    700: "#374151",
    800: "#1f2937",
    900: "#111827",
  },

  // États
  success: "#10b981",
  warning: "#f59e0b",
  error: "#ef4444",
  info: "#3b82f6",
};

// Classes Tailwind pré-définies
export const THEME_CLASSES = {
  // Gradients principaux
  gradients: {
    primary: "bg-gradient-to-r from-indigo-600 to-purple-600",
    primaryHover: "hover:from-indigo-700 hover:to-purple-700",
    secondary: "bg-gradient-to-r from-blue-500 to-cyan-500",
    success: "bg-gradient-to-r from-emerald-500 to-green-500",
    warning: "bg-gradient-to-r from-yellow-500 to-orange-500",
    error: "bg-gradient-to-r from-red-500 to-pink-500",
  },

  // Backgrounds avec effet glassmorphism
  glass: {
    primary: "bg-white/70 backdrop-blur-sm border border-indigo-100",
    secondary: "bg-indigo-50/50 backdrop-blur-sm border border-indigo-200",
    overlay: "bg-white/10 backdrop-blur-sm border border-white/20",
  },

  // Ombres
  shadows: {
    sm: "shadow-sm",
    md: "shadow-md",
    lg: "shadow-lg",
    xl: "shadow-xl",
    "2xl": "shadow-2xl",
  },

  // Effets de transition
  transitions: {
    default: "transition-all duration-300",
    fast: "transition-all duration-150",
    slow: "transition-all duration-500",
    hover: "hover:scale-105 hover:shadow-lg",
  },

  // Bordures arrondies
  rounded: {
    sm: "rounded-lg",
    md: "rounded-xl",
    lg: "rounded-2xl",
    xl: "rounded-3xl",
  },

  // Text colors
  text: {
    primary: "text-indigo-900",
    secondary: "text-indigo-600",
    muted: "text-indigo-400",
    white: "text-white",
    gray: "text-gray-600",
  },
};

// Utilitaires pour combiner les classes
export const createThemeClass = (...classes: string[]) => classes.join(" ");

// Couleurs par type d'établissement
export const ESTABLISHMENT_COLORS = {
  PRESCOLAIRE: {
    bg: "bg-pink-50 border-pink-200 text-pink-800",
    badge: "bg-pink-100 text-pink-800 border-pink-200",
    emoji: "🎨",
  },
  PRIMAIRE: {
    bg: "bg-blue-50 border-blue-200 text-blue-800",
    badge: "bg-blue-100 text-blue-800 border-blue-200",
    emoji: "📚",
  },
  "SECONDAIRE I": {
    bg: "bg-indigo-50 border-indigo-200 text-indigo-800",
    badge: "bg-indigo-100 text-indigo-800 border-indigo-200",
    emoji: "🎓",
  },
  "SECONDAIRE II": {
    bg: "bg-purple-50 border-purple-200 text-purple-800",
    badge: "bg-purple-100 text-purple-800 border-purple-200",
    emoji: "🏛️",
  },
};

// Couleurs par statut
export const STATUS_COLORS = {
  PUBLIC: {
    bg: "bg-green-50 border-green-200 text-green-800",
    badge: "bg-green-100 text-green-800 border-green-200",
  },
  PRIVE: {
    bg: "bg-orange-50 border-orange-200 text-orange-800",
    badge: "bg-orange-100 text-orange-800 border-orange-200",
  },
};
