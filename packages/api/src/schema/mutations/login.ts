import { stringArg } from '@nexus/schema';
import { FieldResolver, ObjectDefinitionBlock } from '@nexus/schema/dist/core';

export function LoginMutation(t: ObjectDefinitionBlock<'Mutation'>) {
  t.int('login', {
    nullable: true,
    args: {
      pin: stringArg({ nullable: false }),
    },
    resolve: LoginResolver,
  });
}

const LoginResolver: FieldResolver<'Mutation', 'login'> = async (_, { pin }, ctx) => {
  const user = await ctx.prisma.users.findOne({
    where: { pin: pin },
    include: { accounts: true },
  });

  if (!user) {
    throw new Error('Invalid Pin');
  }

  return user.id;
};
