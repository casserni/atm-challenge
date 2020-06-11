import { intArg } from '@nexus/schema';
import { FieldResolver, ObjectDefinitionBlock } from '@nexus/schema/dist/core';

export function WithdrawMutation(t: ObjectDefinitionBlock<'Mutation'>) {
  t.field('withdraw', {
    type: 'accounts',
    nullable: true,
    args: {
      amount: intArg({ nullable: false }),
      accountId: intArg({ nullable: false }),
    },
    resolve: WithdrawResolver,
  });
}

const WithdrawResolver: FieldResolver<'Mutation', 'withdraw'> = async (_, { accountId, amount }, ctx) => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  let account = await ctx.prisma.accounts.findOne({
    where: { id: accountId },
    include: {
      transactions: {
        where: {
          AND: {
            type: 'withdrawal',
            created_at: {
              gte: today.toISOString(),
            },
          },
        },
      },
    },
  });

  if (!account) {
    throw new Error('Account not found');
  }

  if (amount > account.balance) {
    throw new Error('Possible overdraft detected, cannot withdraw more money than is in account');
  }

  let dailyWithdrawal = account.daily_withdrawal_limit;
  for (const transaction of account.transactions) {
    dailyWithdrawal = dailyWithdrawal - transaction.amount;
  }

  if (dailyWithdrawal - amount < 0) {
    throw new Error('Excceeding daily withdrawal limit, transaction cancelled');
  }

  await ctx.prisma.transactions.create({
    data: {
      amount,
      transaction_type: {
        connect: { value: 'withdrawal' },
      },
      accounts: {
        connect: { id: accountId },
      },
    },
  });

  return await ctx.prisma.accounts.update({
    where: { id: accountId },
    data: { balance: account.balance - amount },
  });
};
