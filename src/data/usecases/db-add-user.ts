import { type AddUser } from '@/domain/usecases'
import { type Hasher, type AddUserRepository, type CheckUserByEmailRepository } from '@/data/protocols'

export class DbAddUser implements AddUser {
  constructor (
    private readonly hasher: Hasher,
    private readonly addUserRepository: AddUserRepository,
    private readonly checkUserByEmailRepository: CheckUserByEmailRepository
  ) {}

  async add (userData: AddUser.Params): Promise<AddUser.Result> {
    const exists = await this.checkUserByEmailRepository.checkByEmail(userData.email)
    let isValid = false
    if (!exists) {
      const hashedPassword = await this.hasher.hash(userData.password)
      isValid = await this.addUserRepository.add({ ...userData, password: hashedPassword })
    }
    return isValid
  }
}
