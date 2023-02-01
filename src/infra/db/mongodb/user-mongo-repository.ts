import { type LoadUserByEmailRepository, type AddUserRepository, type CheckUserByEmailRepository, type UpdateAccessTokenRepository } from '@/data/protocols'
import { MongoHelper } from '@/infra/db'

export class UserMongoRepository implements AddUserRepository, LoadUserByEmailRepository, CheckUserByEmailRepository, UpdateAccessTokenRepository {
  async add (data: AddUserRepository.Params): Promise<AddUserRepository.Result> {
    const userCollection = MongoHelper.getCollection('users')
    const result = await userCollection.insertOne(data)
    return result.insertedId !== null
  }

  async loadByEmail (email: string): Promise<LoadUserByEmailRepository.Result> {
    const userCollection = MongoHelper.getCollection('users')
    const user = await userCollection.findOne({
      email
    }, {
      projection: {
        _id: 1,
        name: 1,
        password: 1
      }
    })
    return user && MongoHelper.map(user)
  }

  async checkByEmail (email: string): Promise<CheckUserByEmailRepository.Result> {
    const userCollection = MongoHelper.getCollection('users')
    const user = await userCollection.findOne({
      email
    }, {
      projection: {
        _id: 1
      }
    })
    return user !== null
  }

  async updateAccessToken (id: string, token: string): Promise<void> {
    const userCollection = MongoHelper.getCollection('users')
    await userCollection.updateOne({
      _id: id
    }, {
      $set: {
        accessToken: token
      }
    })
  }
}
