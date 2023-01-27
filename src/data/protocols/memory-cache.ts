export interface MemoryCache {
  get: (cacheKey: string) => Promise<any>
  set: (cacheKey: string, value: any) => Promise<boolean>
}
