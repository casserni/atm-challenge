import { FieldResolver, objectType } from '@nexus/schema';

export const Account = objectType({
  name: 'accounts',
  definition(t) {
    t.model.id();
    t.model.balance();
    t.model.type();
    t.model.user_id();
    t.model.daily_withdrawal_limit();
    t.model.transactions();
    t.int('remaining_withdrawal_limit', {
      resolve: RemainingWithdrawalLimitResolver,
    });
  },
});

/**
 * Field Resolvers
 */
const RemainingWithdrawalLimitResolver: FieldResolver<'accounts', 'remaining_withdrawal_limit'> = async (
  root,
  _,
  ctx,
) => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  let withdrawalMax = root.daily_withdrawal_limit;

  let transactions = await ctx.prisma.transactions.findMany({
    where: {
      account_id: root.id,
      type: 'withdrawal',
      created_at: {
        gte: today.toISOString(),
      },
    },
  });

  for (const transaction of transactions) {
    withdrawalMax -= transaction.amount;
  }

  return withdrawalMax;
};
