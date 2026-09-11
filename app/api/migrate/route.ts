import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET() {
  try {
    await prisma.$executeRawUnsafe(`
      CREATE TABLE IF NOT EXISTS "SliderBeranda" (
        "id" TEXT NOT NULL,
        "judul" TEXT,
        "deskripsi" TEXT,
        "foto_url" TEXT NOT NULL,
        "urutan" INTEGER NOT NULL DEFAULT 0,
        "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
        CONSTRAINT "SliderBeranda_pkey" PRIMARY KEY ("id")
      );
    `);
    return NextResponse.json({ success: true, message: "Database migrated successfully" });
  } catch (error: any) {
    console.error('Migration error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
