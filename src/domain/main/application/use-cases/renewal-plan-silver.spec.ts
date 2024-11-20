import { InMemoryUserRepository } from 'test/repositories/in-memory-user-repository'
import { makeUser } from 'test/factories/make-user'
import { InMemoryPlanRepository } from 'test/repositories/in-memory-plan-repository'
import { makePlan } from 'test/factories/make-plan'
import { PlanStatusError } from './errors/plan-status-error'
import { RenewalPlanSilverUseCase } from './renewal-plan-silver'

let inMemoryUserRepository: InMemoryUserRepository
let inMemoryPlanRepository: InMemoryPlanRepository

let sut: RenewalPlanSilverUseCase

describe('Renewal Plan SILVER', () => {
  beforeEach(() => {
    inMemoryUserRepository = new InMemoryUserRepository()
    inMemoryPlanRepository = new InMemoryPlanRepository()
    sut = new RenewalPlanSilverUseCase(
      inMemoryUserRepository,
      inMemoryPlanRepository,
    )
  })

  it('Should be able to renewal silver plan (ANUAL)', async () => {
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
    expect(inMemoryPlanRepository.items[0].category).toEqual('SILVER')
    expect(inMemoryPlanRepository.items[0].price).toEqual(1500)
  })

  it('Should be able to renewal silver plan (SEMESTRAL)', async () => {
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
    expect(inMemoryPlanRepository.items[0].category).toEqual('SILVER')
    expect(inMemoryPlanRepository.items[0].price).toEqual(750)
  })

  it('Should be able to renewal silver plan (MENSAL)', async () => {
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
    expect(inMemoryPlanRepository.items[0].category).toEqual('SILVER')
    expect(inMemoryPlanRepository.items[0].price).toEqual(125)
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
