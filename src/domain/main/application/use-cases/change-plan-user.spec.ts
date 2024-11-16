import { InMemoryUserRepository } from 'test/repositories/in-memory-user-repository'
import { makeUser } from 'test/factories/make-user'
import { ChangePlanUserUseCase } from './change-plan-user'

let inMemoryUserRepository: InMemoryUserRepository

let sut: ChangePlanUserUseCase

describe('Change Plan User', () => {
  beforeEach(() => {
    inMemoryUserRepository = new InMemoryUserRepository()
    sut = new ChangePlanUserUseCase(inMemoryUserRepository)
  })

  it('Should be able to update a user', async () => {
    const user = makeUser()

    await inMemoryUserRepository.create(user)

    await sut.execute({
      userId: user.id.toString(),
      plan: 'BRONZE',
    })

    expect(inMemoryUserRepository.items[0].plan).toEqual('BRONZE')
  })
})
