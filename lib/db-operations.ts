import { getCache, setCache, invalidateCache, invalidateCachePattern } from './cache'

// Tambahkan caching untuk operasi read
export async function getDocuments() {
  const cacheKey = 'documents:all';
  const cached = getCache<any[]>(cacheKey);
  
  if (cached) return cached;
  
  const documents = await prisma.document.findMany({
    orderBy: { updatedAt: 'desc' }
  });
  
  setCache(cacheKey, documents, 30000); // Cache selama 30 detik
  return documents;
}

// Invalidasi cache saat ada operasi write
export async function createDocument(data: any) {
  return writeWithBackup(async () => {
    const result = await prisma.document.create({ data });
    invalidateCachePattern(/^documents:/);
    return result;
  });
}