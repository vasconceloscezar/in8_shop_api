import { type MemoryCache } from '@/domain/models/memory-cache'
import NodeCache from 'node-cache'

export class CacheService implements MemoryCache {
  private readonly cache: NodeCache
  private readonly ttl: number

  constructor (ttl: number) {
    this.cache = new NodeCache()
    this.ttl = ttl
  }

  async get<T>(key: string): Promise<T | unknown > {
    try {
      const cachedData = await this.cache.get(key)
      return cachedData
    } catch (err) {
      console.error(err.message)
      return []
    }
  }

  async set<T>(key: string, value: T): Promise<boolean> {
    return this.cache.set(key, value, this.ttl)
  }
}
