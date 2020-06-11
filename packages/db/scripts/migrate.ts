import * as path from 'path';
import { createDb, migrate } from 'postgres-migrations';

async function runMigrations() {
  try {
    const dbConfig = {
      database: 'bank',
      user: 'bank',
      password: 'bank',
      host: 'localhost',
      port: 5432,
    };

    console.log('...Creating Database.');
    await createDb(dbConfig.database, dbConfig);

    console.log('...Running Migrations');
    await migrate(dbConfig, path.join(__dirname, '../migrations'));

    console.log('Database Migrated!');
  } catch (e) {
    console.error(e);
  }
}

runMigrations();
