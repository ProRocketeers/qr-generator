// @ts-check
import { FlatCompat } from '@eslint/eslintrc';
import pkg from '@eslint/js';
const { configs: jsConfigs } = pkg;
import prettierRecommended from 'eslint-plugin-prettier/recommended';
import globals from 'globals';

const compat = new FlatCompat({
  baseDirectory: new URL('.', import.meta.url).pathname,
});

export default [
  // JS doporučená pravidla
  jsConfigs.recommended,

  // TypeScript rules přes compat
  ...compat.extends('plugin:@typescript-eslint/recommended'),
  ...compat.extends('plugin:@typescript-eslint/recommended-requiring-type-checking'),

  // Prettier
  prettierRecommended,

  {
    ignores: ['eslint.config.mjs'],

    languageOptions: {
      globals: {
        ...globals.node,
        ...globals.jest,
      },
      parserOptions: {
        project: './tsconfig.json',
        tsconfigRootDir: new URL('.', import.meta.url).pathname,
        sourceType: 'module',
      },
    },

    rules: {
      '@typescript-eslint/no-explicit-any': 'off',
      '@typescript-eslint/no-floating-promises': 'warn',
      '@typescript-eslint/no-unsafe-argument': 'warn',
    },
  },
];