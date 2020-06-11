import { FieldResolver, intArg, ObjectDefinitionBlock } from '@nexus/schema/dist/core';

export function DepositMutation(t: ObjectDefinitionBlock<'Mutation'>) {
  t.field('deposit', {
    type: 'accounts',
    nullable: true,
    args: {
      amount: intArg({ nullable: false }),
      accountId: intArg({ nullable: false }),
    },
    resolve: DepositResolver,
  });
}

const DepositResolver: FieldResolver<'Mutation', 'deposit'> = async (_, { accountId, amount }, ctx) => {
  let account = await ctx.prisma.accounts.findOne({
    where: { id: accountId },
  });

  if (!account) {
    throw new Error('Account not found');
  }

  await ctx.prisma.transactions.create({
    data: {
      amount,
      transaction_type: {
        connect: { value: 'deposit' },
      },
      accounts: {
        connect: { id: accountId },
      },
    },
  });

  return await ctx.prisma.accounts.update({
    where: { id: accountId },
    data: { balance: amount + account.balance },
  });
};
