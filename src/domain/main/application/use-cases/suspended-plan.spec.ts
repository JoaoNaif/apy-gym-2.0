import { InMemoryUserRepository } from 'test/repositories/in-memory-user-repository'
import { makeUser } from 'test/factories/make-user'
import { InMemoryPlanRepository } from 'test/repositories/in-memory-plan-repository'
import { makePlan } from 'test/factories/make-plan'
import { SuspendedPlanUseCase } from './suspended-plan'

let inMemoryUserRepository: InMemoryUserRepository
let inMemoryPlanRepository: InMemoryPlanRepository

let sut: SuspendedPlanUseCase

describe('Suspended Plan', () => {
  beforeEach(() => {
    inMemoryUserRepository = new InMemoryUserRepository()
    inMemoryPlanRepository = new InMemoryPlanRepository()
    sut = new SuspendedPlanUseCase(
      inMemoryUserRepository,
      inMemoryPlanRepository,
    )
  })

  it('Should be possible to suspended a plan', async () => {
    const plan = makePlan()

    await inMemoryPlanRepository.create(plan)

    const user = makeUser({
      planId: plan.id,
    })

    await inMemoryUserRepository.create(user)

    await sut.execute({
      userId: user.id.toString(),
    })

    expect(inMemoryPlanRepository.items[0].status).toEqual('SUSPENDED')
  })
})
