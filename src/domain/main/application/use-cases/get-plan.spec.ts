import { InMemoryUserRepository } from 'test/repositories/in-memory-user-repository'
import { makeUser } from 'test/factories/make-user'
import { InMemoryPlanRepository } from 'test/repositories/in-memory-plan-repository'
import { GetPlanUseCase } from './get-plan'
import { makePlan } from 'test/factories/make-plan'

let inMemoryUserRepository: InMemoryUserRepository
let inMemoryPlanRepository: InMemoryPlanRepository

let sut: GetPlanUseCase

describe('Get Plan', () => {
  beforeEach(() => {
    inMemoryUserRepository = new InMemoryUserRepository()
    inMemoryPlanRepository = new InMemoryPlanRepository()
    sut = new GetPlanUseCase(inMemoryUserRepository, inMemoryPlanRepository)
  })

  it('Should be able to create a bronze plan annually', async () => {
    const plan = makePlan()

    await inMemoryPlanRepository.create(plan)

    const user = makeUser({
      planId: plan.id,
    })

    await inMemoryUserRepository.create(user)

    const result = await sut.execute({
      userId: user.id.toString(),
    })

    expect(result.value).toMatchObject({
      plan,
    })
  })

  it('Should be possible to verify that the plan is expired', async () => {
    const startDate = new Date()
    startDate.setMonth(startDate.getMonth() - 6)
    const endDate = new Date(startDate)
    endDate.setMonth(startDate.getMonth() + 1)

    const plan = makePlan({
      startDate,
      endDate,
      plan: 'MENSAL',
    })

    await inMemoryPlanRepository.create(plan)

    const user = makeUser({
      planId: plan.id,
    })

    await inMemoryUserRepository.create(user)

    await sut.execute({
      userId: user.id.toString(),
    })

    expect(inMemoryPlanRepository.items[0].status).toEqual('EXPIRED')
  })
})
