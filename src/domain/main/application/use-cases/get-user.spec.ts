import { InMemoryUserRepository } from 'test/repositories/in-memory-user-repository'
import { makeUser } from 'test/factories/make-user'
import { GetUserUseCase } from './get-user'

let inMemoryUserRepository: InMemoryUserRepository

let sut: GetUserUseCase

describe('Get User', () => {
  beforeEach(() => {
    inMemoryUserRepository = new InMemoryUserRepository()
    sut = new GetUserUseCase(inMemoryUserRepository)
  })

  it('It must be possible to seek the information from the User', async () => {
    const user = makeUser()

    await inMemoryUserRepository.create(user)

    const result = await sut.execute({
      userId: user.id.toString(),
    })

    expect(result.value).toMatchObject({
      user: {
        id: expect.any(String),
        name: expect.any(String),
        email: expect.any(String),
        phone: expect.any(String),
        plan: expect.any(String),
        latitude: expect.any(Number),
        longitude: expect.any(Number),
        createdAt: expect.any(Date),
      },
    })
  })
})
