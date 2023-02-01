import { DbLoadUserByToken } from '@/data/usecases/db-load-user-by-token'
import { type LoadUserByToken } from '@/domain/usecases'
import { JwtAdapter } from '@/infra/cryptography'
import { UserMongoRepository } from '@/infra/db/mongodb/user-mongo-repository'
import env from '@/main/config/env'

export const makeDbLoadUserByToken = (): LoadUserByToken => {
  const jwtAdapter = new JwtAdapter(env.jwtSecret)
  const userMongoRepository = new UserMongoRepository()
  return new DbLoadUserByToken(jwtAdapter, userMongoRepository)
}
