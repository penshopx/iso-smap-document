type CacheItem<T> = {
  data: T;
  expiry: number;
}

const cache = new Map<string, CacheItem<any>>();

export function getCache<T>(key: string): T | null {
  const item = cache.get(key);
  if (!item) return null;
  
  if (Date.now() > item.expiry) {
    cache.delete(key);
    return null;
  }
  
  return item.data;
}

export function setCache<T>(key: string, data: T, ttlMs = 60000): void {
  cache.set(key, {
    data,
    expiry: Date.now() + ttlMs
  });
}

export function invalidateCache(key: string): void {
  cache.delete(key);
}

export function invalidateCachePattern(pattern: RegExp): void {
  for (const key of cache.keys()) {
    if (pattern.test(key)) {
      cache.delete(key);
    }
  }
}