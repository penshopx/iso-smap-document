'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

export default function DatabaseAdmin() {
  const [status, setStatus] = useState('idle')
  const [message, setMessage] = useState('')
  
  async function handleBackup() {
    setStatus('loading')
    try {
      const res = await fetch('/api/db-maintenance', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'backup' })
      })
      
      const data = await res.json()
      if (data.success) {
        setMessage(`Backup berhasil: ${data.backupUrl}`)
        setStatus('success')
      } else {
        setMessage(`Error: ${data.error}`)
        setStatus('error')
      }
    } catch (error) {
      setMessage(`Error: ${error}`)
      setStatus('error')
    }
  }
  
  async function handleRestore() {
    if (!confirm('Restore akan menimpa database saat ini. Lanjutkan?')) return
    
    setStatus('loading')
    try {
      const res = await fetch('/api/db-maintenance', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'restore' })
      })
      
      const data = await res.json()
      if (data.success) {
        setMessage('Restore berhasil')
        setStatus('success')
      } else {
        setMessage(`Error: ${data.error}`)
        setStatus('error')
      }
    } catch (error) {
      setMessage(`Error: ${error}`)
      setStatus('error')
    }
  }
  
  return (
    <div className="container mx-auto py-8">
      <h1 className="text-2xl font-bold mb-6">Database Management</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Backup Database</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="mb-4">Backup database SQLite ke Vercel Blob Storage</p>
            <Button 
              onClick={handleBackup} 
              disabled={status === 'loading'}
            >
              {status === 'loading' ? 'Processing...' : 'Backup Now'}
            </Button>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Restore Database</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="mb-4">Restore database dari backup terakhir</p>
            <Button 
              onClick={handleRestore} 
              disabled={status === 'loading'}
              variant="outline"
            >
              {status === 'loading' ? 'Processing...' : 'Restore Latest'}
            </Button>
          </CardContent>
        </Card>
      </div>
      
      {message && (
        <div className={`mt-6 p-4 rounded ${
          status === 'success' ? 'bg-green-100 text-green-800' : 
          status === 'error' ? 'bg-red-100 text-red-800' : 
          'bg-gray-100'
        }`}>
          {message}
        </div>
      )}
    </div>
  )
}