module.exports = {
  arrowParens: 'avoid',
  printWidth: 500,
  proseWrap: 'always',
  singleQuote: true,
  semi: true,
  trailingComma: 'all',
  printWidth: 120,
  overrides: [
    {
      files: 'package*.json',
      options: {
        printWidth: 1000,
      },
    },
  ],
};
