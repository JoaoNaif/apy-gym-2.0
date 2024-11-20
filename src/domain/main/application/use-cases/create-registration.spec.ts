import { InMemoryGymRepository } from 'test/repositories/in-memory-gym-repository'
import { makeGym } from 'test/factories/make-gym'
import { UniqueEntityId } from '../../../../core/entities/unique-entity-id'
import { CreateRegistrationUseCase } from './create-registration'
import { InMemoryUserRepository } from 'test/repositories/in-memory-user-repository'
import { InMemoryRegistrationRepository } from 'test/repositories/in-memory-registration-repository'
import { makeUser } from 'test/factories/make-user'

let inMemoryGymRepository: InMemoryGymRepository
let inMemoryUserRepository: InMemoryUserRepository
let inMemoryRegistrationRepository: InMemoryRegistrationRepository

let sut: CreateRegistrationUseCase

describe('Create Registration', () => {
  beforeEach(() => {
    inMemoryGymRepository = new InMemoryGymRepository()
    inMemoryUserRepository = new InMemoryUserRepository()
    inMemoryRegistrationRepository = new InMemoryRegistrationRepository()

    sut = new CreateRegistrationUseCase(
      inMemoryGymRepository,
      inMemoryUserRepository,
      inMemoryRegistrationRepository,
    )
  })

  it('Should be able to create a registration', async () => {
    const gym = makeGym(
      {
        name: 'gym app',
      },
      new UniqueEntityId('gym-1'),
    )

    await inMemoryGymRepository.create(gym)

    const user = makeUser({ name: 'John Doe' }, new UniqueEntityId('user-1'))

    await inMemoryUserRepository.create(user)

    const result = await sut.execute({
      gymId: 'gym-1',
      userId: 'user-1',
    })

    expect(inMemoryRegistrationRepository.items).toHaveLength(1)
    expect(inMemoryRegistrationRepository.items[0].active).toEqual(true)
    expect(result.value).toMatchObject({
      registration: {
        userId: expect.any(UniqueEntityId),
        gymId: expect.any(UniqueEntityId),
        active: expect.any(Boolean),
        createdAt: expect.any(Date),
      },
    })
  })
})
