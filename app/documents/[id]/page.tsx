// app/documents/[id]/page.tsx
import { notFound } from "next/navigation";
import DocumentViewer from "@/components/document-viewer/document-viewer";

interface DocumentPageProps {
  params: {
    id: string;
  };
}

export default function DocumentPage({ params }: DocumentPageProps) {
  // Validasi ID jika perlu
  if (!params.id || params.id.length < 3) {
    notFound();
  }

  return <DocumentViewer documentId={params.id} />;
}