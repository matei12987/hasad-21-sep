import js from '@eslint/js';
import globals from 'globals';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import react from 'eslint-plugin-react';
import jsxA11y from 'eslint-plugin-jsx-a11y';
import tseslint from 'typescript-eslint';

export default tseslint.config(
  { ignores: ['dist'] },
  {
    extends: [js.configs.recommended, ...tseslint.configs.recommended],
    files: ['**/*.{ts,tsx}'],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
      },
    },
    plugins: {
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
      'react': react,
      'jsx-a11y': jsxA11y,
    },
    settings: {
      react: {
        version: 'detect',
      },
    },
    rules: {
      ...reactHooks.configs.recommended.rules,
      ...react.configs.recommended.rules,
      ...jsxA11y.configs.recommended.rules,
      'react-refresh/only-export-components': [
        'warn',
        { allowConstantExport: true },
      ],
      // JSX-specific rules to catch syntax errors
      'react/jsx-uses-react': 'error',
      'react/jsx-uses-vars': 'error',
      'react/jsx-no-undef': 'error',
      'react/jsx-closing-bracket-location': 'error',
      'react/jsx-closing-tag-location': 'error',
      'react/jsx-tag-spacing': 'error',
      'react/jsx-wrap-multilines': ['error', {
        declaration: 'parens-new-line',
        assignment: 'parens-new-line',
        return: 'parens-new-line',
        arrow: 'parens-new-line',
        condition: 'parens-new-line',
        logical: 'parens-new-line',
        prop: 'parens-new-line',
      }],
      'react/jsx-first-prop-new-line': ['error', 'multiline-multiprop'],
      'react/jsx-max-props-per-line': ['error', { maximum: 1, when: 'multiline' }],
      'react/jsx-indent': ['error', 2],
      'react/jsx-indent-props': ['error', 2],
      'react/jsx-no-duplicate-props': 'error',
      'react/jsx-boolean-value': ['error', 'never'],
      'react/jsx-fragments': ['error', 'syntax'],
      'react/jsx-no-useless-fragment': 'error',
      'react/self-closing-comp': ['error', {
        component: true,
        html: true,
      }],
      // Prevent common JSX syntax errors
      'react/jsx-curly-brace-presence': ['error', {
        props: 'never',
        children: 'never',
      }],
      'react/jsx-equals-spacing': ['error', 'never'],
      'react/jsx-props-no-multi-spaces': 'error',
      'react/jsx-no-comment-textnodes': 'error',
      // TypeScript-specific JSX rules
      '@typescript-eslint/no-unused-vars': ['error', {
        varsIgnorePattern: '^React$',
      }],
    },
  }
);
