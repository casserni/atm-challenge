import { PrismaClient } from '@prisma/client';

export function createDB(): PrismaClient {
  return new PrismaClient();
}

export type DBClient = PrismaClient;
