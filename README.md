### Starting the Application

Install any dependencies with yarn
```
yarn install
```

Start the DB. This will build the container, run any inital migrations, and seed in some fake data
```
yarn db docker:up
```

Run the app! This will generate any required files, then start both api and app.
```
yarn start
```

Login with pin: `1234`

### Packages

Leveraging yarn workspaces, this application was split into three different packages.

- `db`: Contains all code related to the database. The DB is a postgres database that runs locally using docker. This package also initializes the `Prisma` client which is a database toolkit to easy make queries to the database. Ideally this package would contain another wrapper around Prisma to absctract away any specific prisma logic. Then if we ever wanted to change db clients we can just update this package and leave everything else untouched.

- `api`: Contains the graphql-api. This package leverages GraphQL-Nexus, which is a declaritive way to create our graphql schema. Nexus also integrates nicely with Prisma in the form of a plugin which quickly creates crud endpoints for our models.

- `app`: Contains the React app. Decided to opt for using `create-react-app` to quicken development pace. Eventually this should be removed to support SSR and more custom build scripts. Other notable features are the usage of `Overmind` for state management, `Urql` which is an `ApolloClient` replacement, `Tailwind` as a CSS Framework, and `Blueprintjs` (mainly for icon usage)
