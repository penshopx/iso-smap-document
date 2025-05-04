// components/document-terms-button.tsx
"use client"

import { Button } from "@/components/ui/button"
import { FileText } from 'lucide-react'

interface DocumentTermsButtonProps {
  onClick: () => void
}

export function DocumentTermsButton({ onClick }: DocumentTermsButtonProps) {
  return (
    <Button variant="outline" onClick={onClick}>
      <FileText className="mr-2 h-4 w-4" />
      Lihat Ketentuan Dokumen
    </Button>
  )
}

export default DocumentTermsButton;