import { FakeHasher } from 'test/cryptography/fake-hasher'
import { InMemoryUserRepository } from 'test/repositories/in-memory-user-repository'
import { RegisterUserUseCase } from './register-user'

let inMemoryUserRepository: InMemoryUserRepository
let fakeHasher: FakeHasher
let sut: RegisterUserUseCase

describe('Create User', () => {
  beforeEach(() => {
    inMemoryUserRepository = new InMemoryUserRepository()
    fakeHasher = new FakeHasher()
    sut = new RegisterUserUseCase(inMemoryUserRepository, fakeHasher)
  })

  it('should be able to register a new user', async () => {
    const result = await sut.execute({
      name: 'Acqua Gym',
      phone: '11951615111',
      email: 'acqua@email.com',
      password: '132456',
      planId: null,
      latitude: -23.623352,
      longitude: -46.558612,
    })

    expect(result.isRight()).toBe(true)
    expect(result.value).toEqual({
      user: inMemoryUserRepository.items[0],
    })
  })

  it('password must be encrypted', async () => {
    const result = await sut.execute({
      name: 'Acqua Gym',
      phone: '11951615111',
      email: 'acqua@email.com',
      password: '123456',
      planId: null,
      latitude: -23.623352,
      longitude: -46.558612,
    })

    const hashedPassword = await fakeHasher.hash('123456')

    expect(result.isRight()).toBe(true)
    expect(inMemoryUserRepository.items[0].password).toEqual(hashedPassword)
  })
})
