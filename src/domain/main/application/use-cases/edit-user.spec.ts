import { InMemoryUserRepository } from 'test/repositories/in-memory-user-repository'
import { makeUser } from 'test/factories/make-user'
import { EditUserUseCase } from './edit-user'
import { Phone } from '../../enterprise/entities/value-objects/phone'

let inMemoryUserRepository: InMemoryUserRepository

let sut: EditUserUseCase

describe('Authenticate User', () => {
  beforeEach(() => {
    inMemoryUserRepository = new InMemoryUserRepository()
    sut = new EditUserUseCase(inMemoryUserRepository)
  })

  it('It must be possible to seek the information from the User', async () => {
    const user = makeUser({
      latitude: 1,
      phone: Phone.createFromText('11543211234'),
    })

    await inMemoryUserRepository.create(user)

    await sut.execute({
      userId: user.id.toString(),
      name: 'Lucas',
      latitude: 2,
    })

    expect(inMemoryUserRepository.items[0]).toMatchObject({
      name: 'Lucas',
      latitude: 2,
    })
  })
})
