import { InMemoryUserRepository } from 'test/repositories/in-memory-user-repository'
import { makeUser } from 'test/factories/make-user'
import { InMemoryPlanRepository } from 'test/repositories/in-memory-plan-repository'
import { makePlan } from 'test/factories/make-plan'
import { RenewalPlanBronzeUseCase } from './renewal-plan-bronze'
import { PlanStatusError } from './errors/plan-status-error'

let inMemoryUserRepository: InMemoryUserRepository
let inMemoryPlanRepository: InMemoryPlanRepository

let sut: RenewalPlanBronzeUseCase

describe('Renewal Plan Bronze', () => {
  beforeEach(() => {
    inMemoryUserRepository = new InMemoryUserRepository()
    inMemoryPlanRepository = new InMemoryPlanRepository()
    sut = new RenewalPlanBronzeUseCase(
      inMemoryUserRepository,
      inMemoryPlanRepository,
    )
  })

  it('Should be able to renewal bronze plan (ANUAL)', async () => {
    const plan = makePlan({
      status: 'EXPIRED',
    })

    await inMemoryPlanRepository.create(plan)

    const user = makeUser({
      planId: plan.id,
    })

    await inMemoryUserRepository.create(user)

    await sut.execute({
      userId: user.id.toString(),
      planDuration: 'ANUAL',
    })

    expect(inMemoryPlanRepository.items[0].status).toEqual('ACTIVE')
    expect(inMemoryPlanRepository.items[0].category).toEqual('BRONZE')
    expect(inMemoryPlanRepository.items[0].price).toEqual(1200)
  })

  it('Should be able to renewal bronze plan (SEMESTRAL)', async () => {
    const plan = makePlan({
      status: 'EXPIRED',
    })

    await inMemoryPlanRepository.create(plan)

    const user = makeUser({
      planId: plan.id,
    })

    await inMemoryUserRepository.create(user)

    await sut.execute({
      userId: user.id.toString(),
      planDuration: 'SEMESTRAL',
    })

    expect(inMemoryPlanRepository.items[0].status).toEqual('ACTIVE')
    expect(inMemoryPlanRepository.items[0].category).toEqual('BRONZE')
    expect(inMemoryPlanRepository.items[0].price).toEqual(600)
  })

  it('Should be able to renewal bronze plan (MENSAL)', async () => {
    const plan = makePlan({
      status: 'EXPIRED',
    })

    await inMemoryPlanRepository.create(plan)

    const user = makeUser({
      planId: plan.id,
    })

    await inMemoryUserRepository.create(user)

    await sut.execute({
      userId: user.id.toString(),
      planDuration: 'MENSAL',
    })

    expect(inMemoryPlanRepository.items[0].status).toEqual('ACTIVE')
    expect(inMemoryPlanRepository.items[0].category).toEqual('BRONZE')
    expect(inMemoryPlanRepository.items[0].price).toEqual(100)
  })

  it('Should be not able to renewal suspended plan', async () => {
    const plan = makePlan({
      status: 'SUSPENDED',
    })

    await inMemoryPlanRepository.create(plan)

    const user = makeUser({
      planId: plan.id,
    })

    await inMemoryUserRepository.create(user)

    const result = await sut.execute({
      userId: user.id.toString(),
      planDuration: 'ANUAL',
    })

    expect(result.value).toBeInstanceOf(PlanStatusError)
  })

  it('Should be not able to renewal active plan', async () => {
    const plan = makePlan({
      status: 'ACTIVE',
    })

    await inMemoryPlanRepository.create(plan)

    const user = makeUser({
      planId: plan.id,
    })

    await inMemoryUserRepository.create(user)

    const result = await sut.execute({
      userId: user.id.toString(),
      planDuration: 'ANUAL',
    })

    expect(result.value).toBeInstanceOf(PlanStatusError)
  })
})
