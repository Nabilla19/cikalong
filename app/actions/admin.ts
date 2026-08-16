'use server'

import prisma from '@/lib/prisma';
import { cookies } from 'next/headers';
import { decrypt } from '@/lib/auth';
import { revalidatePath } from 'next/cache';

async function checkAuth() {
  const cookieStore = await cookies();
  const session = cookieStore.get('session')?.value;
  if (!session) throw new Error('Unauthorized');
  const payload = await decrypt(session);
  if (!payload) throw new Error('Unauthorized');
}

export async function dbAction(model: string, operation: string, args: any = {}) {
  await checkAuth();
  try {
    // @ts-ignore
    const result = await prisma[model][operation](args);
    
    // Revalidate paths so public site updates immediately
    revalidatePath('/', 'layout');
    
    return { data: result, error: null };
  } catch (error: any) {
    console.error(`DB Action Error (${model}.${operation}):`, error);
    return { data: null, error: error.message };
  }
}
