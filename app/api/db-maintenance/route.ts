import { NextResponse } from 'next/server'
import { backupDatabase, restoreDatabase } from '@/lib/db-backup'

// API endpoint untuk backup manual
export async function POST(req: Request) {
  try {
    const { action } = await req.json()
    
    if (action === 'backup') {
      const backupUrl = await backupDatabase()
      return NextResponse.json({ success: true, backupUrl })
    } 
    
    if (action === 'restore') {
      const success = await restoreDatabase()
      return NextResponse.json({ success })
    }
    
    return NextResponse.json({ error: 'Invalid action' }, { status: 400 })
  } catch (error) {
    console.error('Database maintenance error:', error)
    return NextResponse.json({ error: 'Failed to perform database action' }, { status: 500 })
  }
}