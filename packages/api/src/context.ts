import * as db from '@demo/db';
import { Request, Response } from 'express';

export interface Context {
  refreshToken?: string;
  req: Request;
  res: Response;
  prisma: db.DBClient;
}

export function createContext(context: any): Context {
  return {
    prisma: db.createDB(),
    req: context.req,
    res: context.res,
  };
}
