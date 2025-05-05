import { restoreDatabase } from '@/lib/db-backup'

// Inisialisasi database saat aplikasi startup
export async function generateMetadata() {
  // Coba restore database dari backup
  await restoreDatabase()
  
  return {
    title: 'ISO 37001 Documents',
    description: 'Sistem Manajemen Dokumen ISO 37001',
  }
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}