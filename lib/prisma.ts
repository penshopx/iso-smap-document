import { PrismaClient } from '@prisma/client'
import { execSync } from 'child_process'
import fs from 'fs'

// Cek apakah database sudah ada, jika tidak, jalankan migrasi
const dbExists = () => {
  try {
    return fs.existsSync('/tmp/iso37001.db')
  } catch (error) {
    return false
  }
}

// Jalankan migrasi jika database belum ada
if (!dbExists()) {
  try {
    console.log('Database tidak ditemukan, menjalankan migrasi...')
    // Pastikan direktori migrations ada di deployment
    execSync('npx prisma migrate deploy')
    console.log('Migrasi berhasil')
  } catch (error) {
    console.error('Gagal menjalankan migrasi:', error)
  }
}

// Singleton pattern untuk Prisma Client
const globalForPrisma = global as unknown as { prisma: PrismaClient }

export const prisma = globalForPrisma.prisma || new PrismaClient()

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma

export default prisma