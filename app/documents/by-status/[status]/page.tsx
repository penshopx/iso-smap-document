import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { DocumentList } from "@/components/workflow/document-list"
import { formatStatus } from "@/utils/workflow"
import type { DocumentStatus } from "@/types/workflow"

interface DocumentsByStatusPageProps {
  params: {
    status: string
  }
}

export const metadata: Metadata = {
  title: "Dokumen | ISO 37001",
  description: "Daftar dokumen SMAP berdasarkan status",
}

// Validasi status yang valid
const validStatuses: DocumentStatus[] = ["draft", "review", "approved", "published", "rejected", "archived"]

export default function DocumentsByStatusPage({ params }: DocumentsByStatusPageProps) {
  const { status } = params

  // Validasi status
  if (!validStatuses.includes(status as DocumentStatus)) {
    notFound()
  }

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Dokumen dengan Status: {formatStatus(status as DocumentStatus)}</h1>
      <DocumentList status={status as DocumentStatus} />
    </div>
  )
}