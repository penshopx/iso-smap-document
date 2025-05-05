import { notFound } from "next/navigation";
import DocumentViewer from "@/components/document-viewer/document-viewer";
import { DocumentList } from "@/components/workflow/document-list";
import { formatStatus } from "@/utils/workflow";
import type { DocumentStatus } from "@/types/workflow";

interface DocumentsPageProps {
  params: {
    slug: string[];
  };
}

// Validasi status yang valid
const validStatuses: DocumentStatus[] = ["draft", "review", "approved", "published", "rejected", "archived"];

export default function DocumentsPage({ params }: DocumentsPageProps) {
  const { slug } = params;
  
  // Jika tidak ada slug, tampilkan halaman default
  if (!slug || slug.length === 0) {
    notFound();
  }
  
  // Cek apakah slug adalah status yang valid
  if (slug.length === 1 && validStatuses.includes(slug[0] as DocumentStatus)) {
    const status = slug[0] as DocumentStatus;
    
    // Simulasi data dokumen
    const documents = [
      {
        id: "doc-1",
        title: "Prosedur Penilaian Risiko Penyuapan",
        type: "prosedur",
        clause: "4.5",
        status: status,
        canEdit: status === "draft" || status === "rejected",
        canApprove: status === "review",
        canReject: status === "review",
        canPublish: status === "approved",
      },
      // ... dokumen lainnya
    ];
    
    // Simulasi peran pengguna
    const userRoles = ["admin", "editor"];
    
    return (
      <div className="container mx-auto p-6">
        <h1 className="text-2xl font-bold mb-6">Dokumen dengan Status: {formatStatus(status)}</h1>
        <DocumentList documents={documents} userRoles={userRoles} />
      </div>
    );
  }
  
  // Jika bukan status, anggap sebagai ID dokumen
  const documentId = slug[0];
  return <DocumentViewer documentId={documentId} />;
}