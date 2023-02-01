import env from '@/main/config/env'
import { BcryptAdapter, JwtAdapter } from '@/infra/cryptography'
import { type Authentication } from '@/domain/usecases'
import { DbAuthentication } from '@/data/usecases'
import { UserMongoRepository } from '@/infra/db/mongodb/user-mongo-repository'

export const makeDbAuthentication = (): Authentication => {
  const salt = 12
  const bcryptAdapter = new BcryptAdapter(salt)
  const jwtAdapter = new JwtAdapter(env.jwtSecret)
  const userMongoRepository = new UserMongoRepository()
  return new DbAuthentication(userMongoRepository, bcryptAdapter, jwtAdapter, userMongoRepository)
}
