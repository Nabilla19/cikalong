import { NextRequest, NextResponse } from 'next/server';
import { readFileSync, existsSync } from 'fs';
import { join, extname } from 'path';

export async function GET(req: NextRequest, { params }: { params: Promise<{ path: string[] }> }) {
  const resolvedParams = await params;
  
  // process.cwd() in standalone mode points to the standalone folder
  const filePath = join(process.cwd(), 'public', 'uploads', ...resolvedParams.path);
  
  if (existsSync(filePath)) {
    const file = readFileSync(filePath);
    const ext = extname(filePath).toLowerCase();
    
    let contentType = 'application/octet-stream';
    if (ext === '.jpg' || ext === '.jpeg') contentType = 'image/jpeg';
    else if (ext === '.png') contentType = 'image/png';
    else if (ext === '.gif') contentType = 'image/gif';
    else if (ext === '.webp') contentType = 'image/webp';
    else if (ext === '.pdf') contentType = 'application/pdf';
    
    return new NextResponse(file, { headers: { 'Content-Type': contentType } });
  }
  
  return new NextResponse('File Not Found', { status: 404 });
}
