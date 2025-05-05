// components/workflow/document-tabs.tsx
"use client";

import { useRouter, usePathname } from "next/navigation";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { formatStatus } from "@/utils/workflow";
import type { DocumentStatus } from "@/types/workflow";

export function DocumentTabs() {
  const router = useRouter();
  const pathname = usePathname();

  const statuses: DocumentStatus[] = ["draft", "review", "approved", "published", "rejected", "archived"];

  const getCurrentStatus = (): DocumentStatus | null => {
    // Update pola matching untuk path baru
    const match = pathname.match(/\/documents\/status\/([^/]+)/);
    if (match && statuses.includes(match[1] as DocumentStatus)) {
      return match[1] as DocumentStatus;
    }
    return null;
  };

  const currentStatus = getCurrentStatus();

  const handleTabChange = (value: string) => {
    if (value === "all") {
      router.push("/documents");
    } else {
      router.push(`/documents/status/${value}`);
    }
  };

  return (
    <Tabs value={currentStatus || "all"} onValueChange={handleTabChange} className="mb-6">
      <TabsList className="grid grid-cols-7">
        <TabsTrigger value="all">Semua</TabsTrigger>
        {statuses.map((status) => (
          <TabsTrigger key={status} value={status}>
            {formatStatus(status)}
          </TabsTrigger>
        ))}
      </TabsList>
    </Tabs>
  );
}