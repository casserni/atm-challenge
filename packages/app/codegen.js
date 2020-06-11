module.exports = {
  overwrite: true,

  generates: {
    'src/generated/urql.tsx': {
      schema: ['../api/**/*.graphql'],
      documents: ['src/**/*.graphql'],
      config: {
        withHooks: true,
        withComponent: false,
      },
      plugins: ['typescript', 'typescript-operations', 'typescript-urql'],
    },
  },
};
