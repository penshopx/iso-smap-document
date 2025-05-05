import { put, get, del } from '@vercel/blob'
import fs from 'fs'
import { promisify } from 'util'
import prisma from './prisma'

const readFile = promisify(fs.readFile)
const writeFile = promisify(fs.writeFile)

// Backup database ke Vercel Blob
export async function backupDatabase() {
  try {
    // Pastikan koneksi database ditutup sebelum backup
    await prisma.$disconnect()
    
    // Baca file database
    const dbBuffer = await readFile('/tmp/iso37001.db')
    
    // Upload ke Vercel Blob
    const blob = await put(`iso37001-${Date.now()}.db`, dbBuffer, {
      access: 'private',
    })
    
    // Simpan referensi ke backup terbaru
    await put('latest-backup.txt', Buffer.from(blob.url), {
      access: 'private',
    })
    
    console.log('Database berhasil di-backup:', blob.url)
    return blob.url
  } catch (error) {
    console.error('Gagal melakukan backup database:', error)
    throw error
  }
}

// Restore database dari Vercel Blob
export async function restoreDatabase() {
  try {
    // Cek apakah ada backup terbaru
    let latestBackupUrl
    try {
      const latestBackup = await get('latest-backup.txt')
      latestBackupUrl = await latestBackup.text()
    } catch (error) {
      console.log('Tidak ada backup terbaru')
      return false
    }
    
    // Download backup terbaru
    const backupBlob = await get(latestBackupUrl)
    const backupBuffer = Buffer.from(await backupBlob.arrayBuffer())
    
    // Tulis ke filesystem
    await writeFile('/tmp/iso37001.db', backupBuffer)
    
    console.log('Database berhasil di-restore dari:', latestBackupUrl)
    return true
  } catch (error) {
    console.error('Gagal melakukan restore database:', error)
    return false
  }
}

// Jadwalkan backup secara berkala
export async function scheduleBackups() {
  // Backup setiap kali ada perubahan signifikan
  setInterval(async () => {
    await backupDatabase()
  }, 1000 * 60 * 60) // Setiap jam
}