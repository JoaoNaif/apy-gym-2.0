import { InMemoryRegistrationRepository } from 'test/repositories/in-memory-registration-repository'
import { makeRegistration } from 'test/factories/make-registration'
import { GetRegistrationUseCase } from './get-registration'
import { UniqueEntityId } from '@/core/entities/unique-entity-id'

let inMemoryRegistrationRepository: InMemoryRegistrationRepository

let sut: GetRegistrationUseCase

describe('Get Registration', () => {
  beforeEach(() => {
    inMemoryRegistrationRepository = new InMemoryRegistrationRepository()

    sut = new GetRegistrationUseCase(inMemoryRegistrationRepository)
  })

  it('Should be able to get a registration', async () => {
    const registration = makeRegistration()

    await inMemoryRegistrationRepository.create(registration)

    const result = await sut.execute({
      registrationId: registration.id.toString(),
    })

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
