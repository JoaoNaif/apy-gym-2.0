import { InMemoryUserRepository } from 'test/repositories/in-memory-user-repository'
import { makeUser } from 'test/factories/make-user'
import { DeleteUserUseCase } from './delete-user'

let inMemoryUserRepository: InMemoryUserRepository

let sut: DeleteUserUseCase

describe('Delete User', () => {
  beforeEach(() => {
    inMemoryUserRepository = new InMemoryUserRepository()
    sut = new DeleteUserUseCase(inMemoryUserRepository)
  })

  it('Should be able to delete a user', async () => {
    const user = makeUser()

    await inMemoryUserRepository.create(user)

    await sut.execute({
      userId: user.id.toString(),
    })

    expect(inMemoryUserRepository.items).toHaveLength(0)
  })
})
