import { type MemoryCache } from '@/domain/models/memory-cache'
import { CacheService } from '@/data/usecases/cache-service'

export function makeCacheService (): MemoryCache {
  const cacheService = new CacheService(600)
  return cacheService
}
