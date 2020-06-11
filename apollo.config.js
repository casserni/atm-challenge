module.exports = {
  client: {
    includes: [`${__dirname}/packages/app/src/**/*.graphql`],
    service: {
      name: 'api',
      localSchemaFile: `${__dirname}/packages/api/schema.graphql`,
    },
  },
};
