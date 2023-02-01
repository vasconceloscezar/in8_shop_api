import { type AddUserRepository, type CheckUserByEmailRepository } from '@/data/protocols'
import { MongoHelper } from '@/infra/db'

export class UserMongoRepository implements AddUserRepository, CheckUserByEmailRepository {
  async add (data: AddUserRepository.Params): Promise<AddUserRepository.Result> {
    const usersCollection = MongoHelper.getCollection('users')
    const result = await usersCollection.insertOne(data)
    return result.insertedId !== null
  }

  async checkByEmail (email: string): Promise<CheckUserByEmailRepository.Result> {
    const usersCollection = MongoHelper.getCollection('users')
    const account = await usersCollection.findOne({
      email
    }, {
      projection: {
        _id: 1
      }
    })
    return account !== null
  }
}
