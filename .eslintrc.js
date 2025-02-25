module.exports = {
    extends: [
      'next/core-web-vitals',
      // autres extensions...
    ],
    rules: {
      // Désactiver la règle des entités non échappées
      "react/no-unescaped-entities": "off",
      
      // Optionnellement, vous pourriez désactiver ou mettre en avertissement les autres règles temporairement
      "@typescript-eslint/no-unused-vars": "warn",
      "@typescript-eslint/no-explicit-any": "warn",
      "react-hooks/exhaustive-deps": "warn"
    }
  }