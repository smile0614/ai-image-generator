import NextAuth from 'next-auth';
import type { NextApiRequest, NextApiResponse } from 'next';
import { authOptions } from '../authOptions';

type CombineRequest = Request & NextApiRequest;
type CombineResponse = Response & NextApiResponse;

async function handler(req: CombineRequest, res: CombineResponse) {
  try {
    return await NextAuth(req, res, authOptions(req));
  } catch (error) {
    console.error("Error in NextAuth handler:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
}

export { handler as GET, handler as POST };