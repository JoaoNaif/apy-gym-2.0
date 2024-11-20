import { InMemoryUserRepository } from 'test/repositories/in-memory-user-repository'
import { makeUser } from 'test/factories/make-user'
import { InMemoryPlanRepository } from 'test/repositories/in-memory-plan-repository'
import { makePlan } from 'test/factories/make-plan'
import { RenewalPlanGoldUseCase } from './renewal-plan-gold'
import { PlanStatusError } from './errors/plan-status-error'

let inMemoryUserRepository: InMemoryUserRepository
let inMemoryPlanRepository: InMemoryPlanRepository

let sut: RenewalPlanGoldUseCase

describe('Renewal Plan Gold', () => {
  beforeEach(() => {
    inMemoryUserRepository = new InMemoryUserRepository()
    inMemoryPlanRepository = new InMemoryPlanRepository()
    sut = new RenewalPlanGoldUseCase(
      inMemoryUserRepository,
      inMemoryPlanRepository,
    )
  })

  it('Should be able to renewal gold plan (ANUAL)', async () => {
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
    expect(inMemoryPlanRepository.items[0].category).toEqual('GOLD')
    expect(inMemoryPlanRepository.items[0].price).toEqual(1800)
  })

  it('Should be able to renewal gold plan (SEMESTRAL)', async () => {
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
    expect(inMemoryPlanRepository.items[0].category).toEqual('GOLD')
    expect(inMemoryPlanRepository.items[0].price).toEqual(900)
  })

  it('Should be able to renewal gold plan (MENSAL)', async () => {
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
    expect(inMemoryPlanRepository.items[0].category).toEqual('GOLD')
    expect(inMemoryPlanRepository.items[0].price).toEqual(150)
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
