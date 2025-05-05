import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// Simpan counter request dalam memory
const API_COUNTER = new Map<string, { count: number, timestamp: number }>()

// Rate limit: 10 request per 10 detik per IP
const RATE_LIMIT = 10
const RATE_LIMIT_WINDOW = 10000 // 10 detik

export function middleware(request: NextRequest) {
  // Hanya terapkan rate limiting untuk API routes
  if (!request.nextUrl.pathname.startsWith('/api')) {
    return NextResponse.next()
  }

  // Dapatkan IP address
  const ip = request.ip || 'anonymous'
  
  // Cek apakah sudah ada di counter
  const counter = API_COUNTER.get(ip) || { count: 0, timestamp: Date.now() }
  
  // Reset counter jika sudah melewati window
  if (Date.now() - counter.timestamp > RATE_LIMIT_WINDOW) {
    counter.count = 0
    counter.timestamp = Date.now()
  }
  
  // Increment counter
  counter.count++
  API_COUNTER.set(ip, counter)
  
  // Cek apakah melebihi rate limit
  if (counter.count > RATE_LIMIT) {
    return new NextResponse(
      JSON.stringify({ error: 'Too many requests' }),
      { status: 429, headers: { 'Content-Type': 'application/json' } }
    )
  }
  
  return NextResponse.next()
}