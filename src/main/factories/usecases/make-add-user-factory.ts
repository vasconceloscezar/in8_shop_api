import { DbAddUser } from '@/data/usecases'
import { type AddUser } from '@/domain/usecases'
import { UserMongoRepository } from '@/infra/db'
import { BcryptAdapter } from '@/infra/cryptography'

export const makeDbAddUser = (): AddUser => {
  const salt = 12
  const bcryptAdapter = new BcryptAdapter(salt)
  const userMongoRepository = new UserMongoRepository()
  return new DbAddUser(bcryptAdapter, userMongoRepository, userMongoRepository)
}
