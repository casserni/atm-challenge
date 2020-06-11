module.exports = {
  parser: '@typescript-eslint/parser',

  extends: ['plugin:react/recommended', 'prettier/@typescript-eslint', 'plugin:prettier/recommended', 'prettier/react'],

  plugins: ['simple-import-sort', '@typescript-eslint', 'react-hooks', 'react', 'prettier', 'import'],

  ignorePatterns: ['**/dist', 'node_modules'],

  parserOptions: {
    ecmaVersion: 2018,
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true,
    },
  },

  settings: {
    react: {
      version: 'detect',
    },
  },

  env: {
    es6: true,
  },

  rules: {
    // Imports
    'simple-import-sort/sort': 'error',
    'import/first': 'error',
    'import/newline-after-import': 'error',
    'import/no-duplicates': 'error',

    // Prettier
    'prettier/prettier': 'error',

    // Typescript
    '@typescript-eslint/no-unused-expressions': ['error', { allowShortCircuit: true, allowTernary: true }],
    '@typescript-eslint/no-unused-vars': [
      'error',
      {
        argsIgnorePattern: '^_',
        varsIgnorePattern: '^_',
        args: 'after-used',
        ignoreRestSiblings: true,
      },
    ],

    // React
    'react-hooks/rules-of-hooks': 'error',
    'react/prop-types': 'off',
  },
};
