// @ts-ignore missing types
import faker from 'faker';
// @ts-ignore missing types
import postgres from 'postgres';

const USER_COUNT = 4;
const STABLE_USERNAMES = ['George Costanza', 'Jerry Seinfeld', 'Elaine Benes', 'Cosmo Kramer'];

const createFakeUser = (count: number) => ({
  name: STABLE_USERNAMES[count] || `${faker.internet.userName().toLowerCase().replace(/\./g, '-')}${count}`,
  pin: String(1234 + count),
});

const createFakeAccount = (userId: number) => ({
  type: 'checkings',
  balance: 10000,
  user_id: userId,
  daily_withdrawal_limit: 1000,
});

const seed = async () => {
  const start = Date.now();

  const sql = postgres('postgres://bank:bank@localhost:5432/bank');

  const [users, workspaces] = await sql.begin(async (sql: any) => {
    await sql`SET client_min_messages TO WARNING;`;

    console.log(`-- truncate tables`);

    await sql`TRUNCATE users RESTART IDENTITY CASCADE;`;
    await sql`TRUNCATE accounts RESTART IDENTITY CASCADE;`;
    await sql`TRUNCATE transactions;`;

    console.log(`-- creating ${USER_COUNT} users`);

    let users: any[] = [];
    for (let y = 0; y < USER_COUNT; y++) {
      const [user] = await sql`INSERT INTO users ${sql(createFakeUser(y))} RETURNING id;`;
      users.push(user);
    }

    console.log(`-- creating ${USER_COUNT} accounts`);

    let accounts: any[] = [];
    for (const user of users) {
      const [account] = await sql`INSERT INTO accounts ${sql(createFakeAccount(user.id))} RETURNING id;`;
      accounts.push(account);
    }

    return [users, accounts];
  });

  console.log(`
** Done in ${Math.round((Date.now() - start) / 1000)} seconds. Created:

- ${users.length} users
- ${workspaces.length} accounts
`);

  await sql.end({ timeout: 5 });
};

(async () => {
  try {
    await seed();
    process.exit();
  } catch (e) {
    console.log('Error during seed.');
    console.error(e);
    process.exit(1);
  }
})();
