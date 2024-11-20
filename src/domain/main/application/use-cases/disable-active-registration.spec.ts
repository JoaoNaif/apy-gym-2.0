import { UniqueEntityId } from '../../../../core/entities/unique-entity-id'
import { InMemoryUserRepository } from 'test/repositories/in-memory-user-repository'
import { InMemoryRegistrationRepository } from 'test/repositories/in-memory-registration-repository'
import { makeUser } from 'test/factories/make-user'
import { InMemoryPlanRepository } from 'test/repositories/in-memory-plan-repository'
import { DisableActiveRegistrationUseCase } from './disable-active-registration'
import { makePlan } from 'test/factories/make-plan'
import { makeRegistration } from 'test/factories/make-registration'

let inMemoryUserRepository: InMemoryUserRepository
let inMemoryPlanRepository: InMemoryPlanRepository
let inMemoryRegistrationRepository: InMemoryRegistrationRepository

let sut: DisableActiveRegistrationUseCase

describe('Disable Active Registration', () => {
  beforeEach(() => {
    inMemoryPlanRepository = new InMemoryPlanRepository()
    inMemoryUserRepository = new InMemoryUserRepository()
    inMemoryRegistrationRepository = new InMemoryRegistrationRepository()

    sut = new DisableActiveRegistrationUseCase(
      inMemoryUserRepository,
      inMemoryPlanRepository,
      inMemoryRegistrationRepository,
    )
  })

  it('Should be able to disable a registration', async () => {
    const plan = makePlan()

    await inMemoryPlanRepository.create(plan)

    const user = makeUser(
      { name: 'John Doe', planId: plan.id },
      new UniqueEntityId('user-1'),
    )

    await inMemoryUserRepository.create(user)

    const registration = makeRegistration({
      userId: user.id,
    })

    await inMemoryRegistrationRepository.create(registration)

    await sut.execute({
      registrationId: registration.id.toString(),
    })

    expect(inMemoryRegistrationRepository.items[0].active).toEqual(false)
    expect(inMemoryPlanRepository.items[0].status).toEqual('SUSPENDED')
  })
})
